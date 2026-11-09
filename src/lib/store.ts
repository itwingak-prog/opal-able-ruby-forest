import { useMemo } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  AiAnalysis,
  AppNotification,
  Channel,
  Complaint,
  ComplaintStatus,
  Lang,
  Role,
  Session,
  Settings,
  AcId,
} from "./types";
import {
  categoryById,
  complaintCode,
  getAc,
  officerById,
  officerForCategory,
  wardById,
} from "./catalog";
import { classifyComplaint } from "./classify";
import { buildSeed } from "./seed";
import { shareComplaint, shareRole } from "./share-complaint";
import { uid } from "./utils";

export type CitizenScreen =
  | "splash"
  | "onboard"
  | "login"
  | "otp"
  | "home"
  | "complaints"
  | "detail"
  | "submit"
  | "voice"
  | "mla"
  | "settings"
  | "weather"
  | "map"
  | "help"
  | "analytics"
  | "chat"
  | "profile"
  | "notifs";

export type OfficeView =
  | "dashboard"
  | "heatmap"
  | "ai"
  | "all"
  | "queue"
  | "pending"
  | "escalated"
  | "resolved"
  | "walkin"
  | "officers"
  | "wards"
  | "departments"
  | "detail";

type SubmitInput = {
  description: string;
  categoryId: string;
  wardId: string;
  photo?: string;
  channel?: Channel;
  citizenName?: string;
  citizenPhone?: string;
};

type State = {
  hydrated: boolean;
  session: Session | null;
  settings: Settings;
  complaints: Complaint[];
  notifications: AppNotification[];
  nextSeq: { tcr: number };
  ai: AiAnalysis | null;
  onboarded: boolean;
  pendingPhone: string;
  citizenScreen: CitizenScreen;
  onboardStep: number;
  activeComplaintId: string | null;
  officeView: OfficeView;
  seats: { citizen: { name: string; phone: string } | null; officerId: string };
  acId: AcId;
  setAc: (id: AcId) => void;
  enterDesk: (id: AcId, role: Role) => void;
  markHydrated: () => void;
  setLang: (lang: Lang) => void;
  setDark: (dark: boolean) => void;
  setNotify: (notify: boolean) => void;
  setCitizenScreen: (s: CitizenScreen, complaintId?: string) => void;
  setOfficeView: (v: OfficeView, complaintId?: string) => void;
  setOnboardStep: (n: number) => void;
  setPendingPhone: (phone: string) => void;
  loginCitizen: (phone: string, name?: string) => void;
  loginOfficer: (officerId: string) => void;
  loginOffice: () => void;
  openLayer: (role: Role, complaintId?: string) => void;
  logout: () => void;
  submitComplaint: (input: SubmitInput) => Complaint;
  updateStatus: (
    id: string,
    status: ComplaintStatus,
    actor: string,
    note?: string,
    afterPhoto?: string,
  ) => void;
  assignOfficer: (id: string, officerId: string, actor: string) => void;
  addMessage: (id: string, from: "citizen" | "officer" | "office", author: string, text: string) => void;
  markNotifsRead: () => void;
  setAi: (text: string) => void;
  resetDemo: () => void;
  applyRemote: (complaints: Complaint[]) => void;
};

const seed = buildSeed();

function pushNote(
  list: AppNotification[],
  title: string,
  titleTa: string,
  body: string,
  bodyTa: string,
  complaintId?: string,
  extra?: Pick<AppNotification, "audience" | "forOfficerId" | "forPhone" | "acId">,
): AppNotification[] {
  return [
    {
      id: uid("n"),
      at: new Date().toISOString(),
      title,
      titleTa,
      body,
      bodyTa,
      complaintId,
      read: false,
      ...extra,
    },
    ...list,
  ].slice(0, 40);
}

export const useApp = create<State>()(
  persist(
    (set, get) => ({
      hydrated: false,
      session: null,
      settings: { lang: "en", dark: false, notify: true },
      complaints: seed,
      notifications: [],
      nextSeq: { tcr: 9 },
      acId: "tcr",
      ai: null,
      onboarded: false,
      pendingPhone: "9876543210",
      citizenScreen: "splash",
      onboardStep: 0,
      activeComplaintId: null,
      officeView: "dashboard",
      seats: { citizen: null, officerId: "antony" },
      setAc: (id) => {
        const st = get();
        if (st.acId === id) return;
        const ac = getAc(id);
        const officerOk =
          !!st.session?.officerId && ac.officers.some((o) => o.id === st.session?.officerId);
        set({
          acId: id,
          activeComplaintId: null,
          seats: {
            citizen: st.seats?.citizen ?? null,
            officerId: officerOk ? st.session!.officerId! : ac.officers[0].id,
          },
          session:
            st.session?.role === "officer" && !officerOk
              ? {
                  role: "officer",
                  name: ac.officers[0].name,
                  phone: ac.officers[0].phone,
                  officerId: ac.officers[0].id,
                }
              : st.session?.role === "office"
                ? { role: "office", name: `${ac.app} Desk`, phone: ac.deskPhone }
                : st.session,
          officeView: st.session?.role === "officer" ? "queue" : st.officeView,
        });
      },
      enterDesk: (id, role) => {
        const st = get();
        const ac = getAc(id);
        if (role === "citizen") {
          const keep = st.session?.role === "citizen" ? st.session : null;
          set({
            acId: id,
            session: keep,
            citizenScreen: keep ? "home" : "splash",
            onboarded: keep ? st.onboarded : false,
            activeComplaintId: null,
          });
          if (keep) shareRole(keep);
          return;
        }
        if (role === "officer") {
          const o = ac.officers[0];
          const session = { role: "officer" as const, name: o.name, phone: o.phone, officerId: o.id };
          set({
            acId: id,
            session,
            seats: { ...(st.seats ?? { citizen: null, officerId: o.id }), officerId: o.id },
            officeView: "queue",
            activeComplaintId: null,
          });
          shareRole(session);
          return;
        }
        const office = { role: "office" as const, name: `${ac.app} Desk`, phone: ac.deskPhone };
        set({
          acId: id,
          session: office,
          officeView: "dashboard",
          activeComplaintId: null,
        });
        shareRole(office);
      },
      markHydrated: () => set({ hydrated: true }),
      setLang: (lang) => set({ settings: { ...get().settings, lang } }),
      setDark: (dark) => set({ settings: { ...get().settings, dark } }),
      setNotify: (notify) => set({ settings: { ...get().settings, notify } }),
      setCitizenScreen: (s, complaintId) =>
        set({
          citizenScreen: s,
          activeComplaintId: complaintId ?? get().activeComplaintId,
        }),
      setOfficeView: (v, complaintId) =>
        set({
          officeView: v,
          activeComplaintId: complaintId ?? get().activeComplaintId,
        }),
      setOnboardStep: (n) => set({ onboardStep: n }),
      setPendingPhone: (phone) => set({ pendingPhone: phone.replace(/\D/g, "").slice(0, 10) }),
      loginCitizen: (phone, name) => {
        const phoneDigits = phone.replace(/\D/g, "");
        const known = phoneDigits === "9876543210";
        const who = {
          name: name || (known ? "Ramesh Kumar" : "Citizen"),
          phone: phoneDigits,
        };
        set({
          session: { role: "citizen", name: who.name, phone: who.phone },
          seats: { ...(get().seats ?? { citizen: null, officerId: "antony" }), citizen: who },
          citizenScreen: "home",
          onboarded: true,
        });
        shareRole({ role: "citizen", name: who.name, phone: who.phone });
      },
      loginOfficer: (officerId) => {
        const o = officerById(officerId);
        const session = {
          role: "officer" as const,
          name: o?.name ?? "Officer",
          phone: o?.phone ?? "",
          officerId,
        };
        set({
          session,
          officeView: "queue",
          seats: { ...(get().seats ?? { citizen: null, officerId: "antony" }), officerId },
        });
        shareRole(session);
      },
      loginOffice: () => {
        const session = { role: "office" as const, name: "MLA Desk", phone: "04639123456" };
        set({
          session,
          officeView: "dashboard",
        });
        shareRole(session);
      },
      openLayer: (role, complaintId) => {
        const st = get();
        const complaint = complaintId
          ? st.complaints.find((c) => c.id === complaintId)
          : undefined;
        const seats = st.seats ?? { citizen: null, officerId: "antony" };
        if (role === "citizen") {
          const who =
            (complaint
              ? { name: complaint.citizenName, phone: complaint.citizenPhone }
              : null) ??
            seats.citizen ?? { name: "Ramesh Kumar", phone: "9876543210" };
          set({
            seats: { ...seats, citizen: who },
            session: { role: "citizen", name: who.name, phone: who.phone },
            citizenScreen: complaintId ? "detail" : "home",
            activeComplaintId: complaintId ?? st.activeComplaintId,
            onboarded: true,
          });
          shareRole({ role: "citizen", name: who.name, phone: who.phone });
          return;
        }
        if (role === "officer") {
          const officerId =
            complaint?.officerId ||
            (getAc(st.acId).officers.some((o) => o.id === seats.officerId)
              ? seats.officerId
              : getAc(st.acId).officers[0].id);
          const o = officerById(officerId);
          const session = {
            role: "officer" as const,
            name: o?.name ?? "Officer",
            phone: o?.phone ?? "",
            officerId,
          };
          set({
            seats: { ...seats, officerId },
            session,
            officeView: complaintId ? "detail" : "queue",
            activeComplaintId: complaintId ?? st.activeComplaintId,
          });
          shareRole(session);
          return;
        }
        const office = {
          role: "office" as const,
          name: `${getAc(st.acId).app} Desk`,
          phone: getAc(st.acId).deskPhone,
        };
        set({
          session: office,
          officeView: complaintId ? "detail" : "dashboard",
          activeComplaintId: complaintId ?? st.activeComplaintId,
        });
        shareRole(office);
      },
      logout: () =>
        set({
          session: null,
          citizenScreen: "splash",
          officeView: "dashboard",
        }),
      submitComplaint: (input) => {
        const st = get();
        const ac = getAc(st.acId);
        const classified = input.categoryId || classifyComplaint(input.description).categoryId;
        const cat = categoryById(classified)!;
        const ward = wardById(input.wardId)!;
        const officer = officerForCategory(classified, input.wardId, ac.id);
        const seq = st.nextSeq[ac.id];
        const now = new Date().toISOString();
        const name = input.citizenName || st.session?.name || "Citizen";
        const phone = input.citizenPhone || st.session?.phone || "";
        const complaint: Complaint = {
          id: `${complaintCode(seq, ac.code)}-${Date.now().toString(36)}`,
          seq,
          title: cat.name,
          titleTa: cat.nameTa,
          description: input.description,
          descriptionTa: input.description,
          categoryId: classified,
          wardId: input.wardId,
          departmentId: cat.departmentId,
          officerId: officer.id,
          citizenName: name,
          citizenPhone: phone,
          status: "new",
          priority: cat.defaultPriority,
          channel: input.channel ?? "app",
          lat: ward.lat,
          lng: ward.lng,
          photo: input.photo,
          createdAt: now,
          updatedAt: now,
          timeline: [
            {
              id: uid("ev"),
              at: now,
              status: "registered",
              title: "Registered",
              titleTa: "பதிவு செய்யப்பட்டது",
              actor: name,
            },
            {
              id: uid("ev"),
              at: now,
              status: "assigned",
              title: "Auto-assigned",
              titleTa: "தானியங்கி ஒதுக்கீடு",
              actor: ac.app,
              detail: officer.name,
              detailTa: officer.nameTa,
            },
          ],
          messages: [],
          acId: ac.id,
        };
        set({
          complaints: [complaint, ...st.complaints],
          nextSeq: { ...st.nextSeq, [ac.id]: seq + 1 },
          notifications: [
            ...pushNote(
              [],
              "New assignment",
              "புதிய ஒதுக்கீடு",
              `${complaint.id} · ${name}`,
              `${complaint.id} · ${name}`,
              complaint.id,
              { audience: "officer", forOfficerId: officer.id },
            ),
            ...pushNote(
              [],
              "New complaint",
              "புதிய புகார்",
              `${complaint.id} → ${officer.name}`,
              `${complaint.id} → ${officer.nameTa}`,
              complaint.id,
              { audience: "office" },
            ),
            ...pushNote(
              st.notifications,
              "Complaint registered",
              "புகார் பதிவு",
              `${complaint.id} assigned to ${officer.name}`,
              `${complaint.id} — ${officer.nameTa} பொறுப்பு`,
              complaint.id,
              { audience: "citizen", forPhone: phone },
            ),
          ],
          activeComplaintId: complaint.id,
        });
        if (st.session) shareRole(st.session);
        shareComplaint(complaint);
        return complaint;
      },
      updateStatus: (id, status, actor, note, afterPhoto) => {
        const st = get();
        const now = new Date().toISOString();
        const titleMap: Record<ComplaintStatus, [string, string]> = {
          new: ["New", "புதியது"],
          pending: ["Pending", "நிலுவை"],
          in_progress: ["In Progress", "செயல்பாட்டில்"],
          resolved: ["Resolved", "தீர்க்கப்பட்டது"],
          escalated: ["Escalated", "மேல்முறையீடு"],
        };
        const target = st.complaints.find((c) => c.id === id);
        const en = note || `${id} is now ${titleMap[status][0].toLowerCase()}`;
        const ta = note || `${id} இப்போது ${titleMap[status][1]}`;
        set({
          complaints: st.complaints.map((c) =>
            c.id !== id
              ? c
              : {
                  ...c,
                  status,
                  updatedAt: now,
                  afterPhoto: afterPhoto ?? c.afterPhoto,
                  timeline: [
                    ...c.timeline,
                    {
                      id: uid("ev"),
                      at: now,
                      status,
                      title: titleMap[status][0],
                      titleTa: titleMap[status][1],
                      actor,
                      detail: note,
                      detailTa: note,
                    },
                  ],
                },
          ),
          notifications: [
            ...pushNote(
              [],
              titleMap[status][0],
              titleMap[status][1],
              en,
              ta,
              id,
              { audience: "officer", forOfficerId: target?.officerId ?? undefined },
            ),
            ...pushNote(
              [],
              titleMap[status][0],
              titleMap[status][1],
              en,
              ta,
              id,
              { audience: "office" },
            ),
            ...pushNote(
              st.notifications,
              titleMap[status][0],
              titleMap[status][1],
              en,
              ta,
              id,
              { audience: "citizen", forPhone: target?.citizenPhone },
            ),
          ],
        });
        const savedStatus = get().complaints.find((c) => c.id === id);
        if (savedStatus) shareComplaint(savedStatus);
      },
      assignOfficer: (id, officerId, actor) => {
        const st = get();
        const o = officerById(officerId);
        const now = new Date().toISOString();
        const target = st.complaints.find((c) => c.id === id);
        set({
          complaints: st.complaints.map((c) =>
            c.id !== id
              ? c
              : {
                  ...c,
                  officerId,
                  updatedAt: now,
                  timeline: [
                    ...c.timeline,
                    {
                      id: uid("ev"),
                      at: now,
                      status: "assigned",
                      title: "Reassigned",
                      titleTa: "மறு ஒதுக்கீடு",
                      actor,
                      detail: o?.name,
                      detailTa: o?.nameTa,
                    },
                  ],
                },
          ),
          notifications: [
            ...pushNote(
              [],
              "Reassigned",
              "மறு ஒதுக்கீடு",
              `${id} → ${o?.name ?? officerId}`,
              `${id} → ${o?.nameTa ?? officerId}`,
              id,
              { audience: "officer", forOfficerId: officerId },
            ),
            ...pushNote(
              [],
              "Reassigned",
              "மறு ஒதுக்கீடு",
              `${id} → ${o?.name ?? officerId}`,
              `${id} → ${o?.nameTa ?? officerId}`,
              id,
              { audience: "office" },
            ),
            ...pushNote(
              st.notifications,
              "Officer changed",
              "அலுவலர் மாற்றம்",
              `${id} is now with ${o?.name ?? "an officer"}`,
              `${id} இப்போது ${o?.nameTa ?? "அலுவலர்"} பொறுப்பு`,
              id,
              { audience: "citizen", forPhone: target?.citizenPhone },
            ),
          ],
        });
        const savedAssign = get().complaints.find((c) => c.id === id);
        if (savedAssign) shareComplaint(savedAssign);
      },
      addMessage: (id, from, author, text) => {
        const now = new Date().toISOString();
        const st = get();
        const target = st.complaints.find((c) => c.id === id);
        const note = pushNote(
          st.notifications,
          from === "citizen" ? "Citizen message" : "Desk reply",
          from === "citizen" ? "குடிமகன் செய்தி" : "மேசை பதில்",
          text,
          text,
          id,
          from === "citizen"
            ? { audience: "officer", forOfficerId: target?.officerId ?? undefined }
            : { audience: "citizen", forPhone: target?.citizenPhone },
        );
        const also =
          from === "citizen"
            ? pushNote(
                [],
                "Citizen message",
                "குடிமகன் செய்தி",
                text,
                text,
                id,
                { audience: "office" },
              )
            : [];
        set({
          complaints: st.complaints.map((c) =>
            c.id !== id
              ? c
              : {
                  ...c,
                  updatedAt: now,
                  messages: [...c.messages, { id: uid("m"), at: now, from, author, text }],
                },
          ),
          notifications: [...also, ...note],
        });
        const savedMessage = get().complaints.find((c) => c.id === id);
        if (savedMessage) shareComplaint(savedMessage);
      },
      markNotifsRead: () =>
        set({
          notifications: get().notifications.map((n) => ({ ...n, read: true })),
        }),
      setAi: (text) => set({ ai: { at: new Date().toISOString(), text } }),
      resetDemo: () =>
        set({
          complaints: buildSeed(),
          nextSeq: { tcr: 9 },
          notifications: [],
          ai: null,
          session: null,
          citizenScreen: "splash",
          onboarded: false,
          onboardStep: 0,
        }),
      applyRemote: (incoming) => {
        const local = get().complaints;
        const map = new Map(local.map((c) => [c.id, c]));
        for (const row of incoming) {
          const current = map.get(row.id);
          if (!current || row.updatedAt >= current.updatedAt) map.set(row.id, row);
        }
        const complaints = [...map.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        const top = complaints.reduce((max, c) => Math.max(max, c.seq), get().nextSeq.tcr);
        set({ complaints, nextSeq: { tcr: top + 1 } });
      },
    }),
    {
      name: "namma-tcr-v2",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({
        session: s.session,
        settings: s.settings,
        complaints: s.complaints,
        notifications: s.notifications,
        nextSeq: s.nextSeq,
        ai: s.ai,
        onboarded: s.onboarded,
        seats: s.seats,
        acId: s.acId,
      }),
    },
  ),
);

export function notesFor(
  notes: AppNotification[],
  session: Session | null,
  acId: AcId = "tcr",
  complaints: Complaint[] = [],
): AppNotification[] {
  const scoped = notes.filter((n) => {
    if (n.acId && n.acId !== acId) return false;
    if (n.complaintId) {
      const c = complaints.find((x) => x.id === n.complaintId);
      if (c && (c.acId ?? "tcr") !== acId) return false;
    }
    return true;
  });
  if (!session) return scoped;
  return scoped.filter((n) => {
    if (!n.audience) return session.role === "citizen";
    if (n.audience !== session.role) return false;
    if (session.role === "officer" && n.forOfficerId && n.forOfficerId !== session.officerId) {
      return false;
    }
    if (session.role === "citizen" && n.forPhone && n.forPhone !== session.phone) return false;
    return true;
  });
}

export function mine(complaints: Complaint[], session: Session | null, acId?: AcId) {
  const scoped = acId
    ? complaints.filter((c) => (c.acId ?? "tcr") === acId)
    : complaints;
  if (!session) return [];
  if (session.role === "citizen") {
    return scoped.filter((c) => c.citizenPhone === session.phone);
  }
  if (session.role === "officer" && session.officerId) {
    return scoped.filter((c) => c.officerId === session.officerId);
  }
  return scoped;
}

export function useDeskComplaints() {
  const acId = useApp((s) => s.acId);
  const complaints = useApp((s) => s.complaints);
  return useMemo(
    () => complaints.filter((c) => (c.acId ?? "tcr") === acId),
    [complaints, acId],
  );
}
