import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Camera,
  MapPin,
  MessageSquare,
  Mic,
  Plus,
  Search,
  Share2,
  X,
} from "lucide-react";
import {
  CATEGORIES,
  categoryById,
  deptById,
  officerById,
  wardById,
} from "@/lib/catalog";
import { classifyComplaint } from "@/lib/classify";
import { absTime, channelLabel, relTime, slaState } from "@/lib/format";
import { t } from "@/lib/i18n";
import { fileToDataUrl } from "@/lib/media";
import { mine, useApp, useDeskComplaints } from "@/lib/store";
import { useAc } from "@/lib/use-ac";
import type { Complaint, ComplaintStatus } from "@/lib/types";
import { SlaPill, StatusPill } from "@/components/status-pill";
import { LayerLink } from "@/components/layer-link";

const FILTERS: { id: "all" | ComplaintStatus; key: "all" | "pending" | "inProgress" | "resolved" }[] = [
  { id: "all", key: "all" },
  { id: "pending", key: "pending" },
  { id: "in_progress", key: "inProgress" },
  { id: "resolved", key: "resolved" },
];

function matchesFilter(c: Complaint, f: "all" | ComplaintStatus) {
  if (f === "all") return true;
  if (f === "pending") return c.status === "pending" || c.status === "new" || c.status === "escalated";
  return c.status === f;
}

export function ComplaintList() {
  const lang = useApp((s) => s.settings.lang);
  const ta = lang === "ta";
  const session = useApp((s) => s.session);
  const acId = useApp((s) => s.acId);
  const complaints = useDeskComplaints();
  const setScreen = useApp((s) => s.setCitizenScreen);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const list = mine(complaints, session, acId).filter((c) => {
    if (!matchesFilter(c, filter)) return false;
    if (!q.trim()) return true;
    const hay = `${c.title} ${c.titleTa} ${c.description} ${c.id}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  return (
    <div className="flex h-full flex-col bg-cream">
      <header className="flex items-center justify-between px-4 py-4">
        <h1 className="font-display text-2xl tracking-tight">{t(lang, "myComplaints")}</h1>
      </header>
      <div className="px-4">
        <div className="flex items-center gap-2 rounded-full bg-paper px-3 ring-1 ring-line">
          <Search className="size-4 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t(lang, "search")}
            className="h-11 flex-1 bg-transparent text-sm outline-none"
          />
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${filter === f.id ? "bg-ink text-paper" : "bg-paper text-muted ring-1 ring-line"}`}
            >
              {t(lang, f.key)}
            </button>
          ))}
        </div>
      </div>
      <div className="phone-scroll mt-3 flex-1 space-y-2 overflow-y-auto px-4 pb-24">
        {list.length === 0 ? (
          <p className="pt-10 text-center text-sm text-muted">{t(lang, "empty")}</p>
        ) : (
          list.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setScreen("detail", c.id)}
              className="w-full rounded-xl bg-paper p-3 text-left ring-1 ring-line"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{ta ? c.titleTa : c.title}</p>
                <StatusPill status={c.status} ta={ta} />
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-muted">{ta ? c.descriptionTa : c.description}</p>
              <div className="mt-2 flex items-center gap-2 text-[11px] text-muted">
                <MapPin className="size-3" />
                {wardById(c.wardId)?.[ta ? "nameTa" : "name"]}
                <SlaPill state={slaState(c)} ta={ta} />
                <span className="ml-auto">{relTime(c.createdAt)}</span>
              </div>
            </button>
          ))
        )}
      </div>
      <button
        type="button"
        onClick={() => setScreen("submit")}
        className="absolute bottom-20 right-5 flex h-12 items-center gap-2 rounded-full bg-maroon px-4 text-sm font-medium text-paper shadow-lg"
      >
        <Plus className="size-4" /> {t(lang, "submit")}
      </button>
    </div>
  );
}

export function ComplaintDetail() {
  const lang = useApp((s) => s.settings.lang);
  const ta = lang === "ta";
  const id = useApp((s) => s.activeComplaintId);
  const complaint = useApp((s) => s.complaints.find((c) => c.id === id));
  const setScreen = useApp((s) => s.setCitizenScreen);
  if (!complaint) {
    return (
      <div className="p-6">
        <button type="button" onClick={() => setScreen("complaints")}>
          <ArrowLeft className="size-4" />
        </button>
      </div>
    );
  }
  const cat = categoryById(complaint.categoryId);
  const ward = wardById(complaint.wardId);
  const dept = deptById(complaint.departmentId);
  const officer = officerById(complaint.officerId);

  return (
    <div className="phone-scroll flex h-full flex-col overflow-y-auto bg-cream pb-8">
      <header className="flex items-center justify-between px-4 py-3">
        <button type="button" onClick={() => setScreen("complaints")} className="flex size-10 items-center justify-center rounded-full">
          <ArrowLeft className="size-4" />
        </button>
        <button type="button" className="flex size-10 items-center justify-center rounded-full" aria-label="Share">
          <Share2 className="size-4" />
        </button>
      </header>
      <div className="px-5">
        <div className="flex items-start justify-between gap-3">
          <h1 className="font-display text-2xl tracking-tight">{ta ? complaint.titleTa : complaint.title}</h1>
          <StatusPill status={complaint.status} ta={ta} />
        </div>
        <p className="mt-1 text-xs text-muted">
          {ward?.[ta ? "nameTa" : "name"]} · {absTime(complaint.createdAt)}
        </p>

        <section className="mt-5 rounded-xl bg-paper p-4 ring-1 ring-line">
          <p className="text-xs font-medium text-muted">{t(lang, "description")}</p>
          <p className="mt-1 text-sm leading-relaxed">{ta ? complaint.descriptionTa : complaint.description}</p>
          {complaint.photo ? (
            <img src={complaint.photo} alt="" className="mt-3 h-36 w-full rounded-lg object-cover" />
          ) : null}
          {complaint.afterPhoto ? (
            <>
              <p className="mt-3 text-xs font-medium text-muted">{t(lang, "proof")}</p>
              <img src={complaint.afterPhoto} alt="" className="mt-1 h-36 w-full rounded-lg object-cover" />
            </>
          ) : null}
        </section>

        <section className="mt-3 rounded-xl bg-paper p-4 ring-1 ring-line">
          <p className="text-xs font-medium text-muted">{t(lang, "details")}</p>
          <dl className="mt-2 space-y-1.5 text-sm">
            <Row k={ta ? "புகார் எண்" : "Complaint #"} v={complaint.id} />
            <Row k={t(lang, "category")} v={ta ? cat?.nameTa : cat?.name} />
            <Row k={ta ? "துறை" : "Department"} v={ta ? dept?.nameTa : dept?.name} />
            <Row k={t(lang, "ward")} v={ta ? ward?.nameTa : ward?.name} />
            <Row k={ta ? "வழி" : "Channel"} v={channelLabel(complaint.channel, ta)} />
          </dl>
        </section>

        {officer ? (
          <div className="mt-3 flex items-center justify-between rounded-xl bg-paper p-4 ring-1 ring-line">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-maroon text-sm text-paper">
                {officer.initials}
              </span>
              <div>
                <p className="text-xs text-muted">{t(lang, "assigned")}</p>
                <p className="text-sm font-medium">{ta ? officer.nameTa : officer.name}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setScreen("chat", complaint.id)}
              className="flex items-center gap-1 rounded-full bg-maroon-soft px-3 py-1.5 text-xs font-medium text-maroon"
            >
              <MessageSquare className="size-3.5" /> {t(lang, "chat")}
            </button>
          </div>
        ) : null}

        <section className="mt-4">
          <p className="text-sm font-semibold">{t(lang, "timeline")}</p>
          <ol className="mt-3 space-y-4 border-l border-line pl-4">
            {complaint.timeline.map((ev) => (
              <li key={ev.id} className="relative">
                <span className="absolute -left-[21px] top-1 size-2.5 rounded-full bg-ok" />
                <p className="text-sm font-medium">{ta ? ev.titleTa : ev.title}</p>
                <p className="text-[11px] text-muted">{absTime(ev.at)}</p>
                {ev.detail ? <p className="text-xs text-muted">{ta ? ev.detailTa : ev.detail}</p> : null}
                <p className="text-[11px] text-muted">— {ev.actor}</p>
              </li>
            ))}
          </ol>
        </section>
        <LayerLink complaintId={complaint.id} />
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v?: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{k}</dt>
      <dd className="text-right font-medium">{v ?? "—"}</dd>
    </div>
  );
}

export function SubmitComplaint({ voiceSeed = "" }: { voiceSeed?: string }) {
  const lang = useApp((s) => s.settings.lang);
  const setScreen = useApp((s) => s.setCitizenScreen);
  const submit = useApp((s) => s.submitComplaint);
  const ac = useAc();
  const [desc, setDesc] = useState(voiceSeed);
  const guess = useMemo(() => classifyComplaint(desc), [desc]);
  const [categoryId, setCategoryId] = useState(guess.categoryId);
  const [wardId, setWardId] = useState(ac.wards[0]?.id ?? "town");
  const wardValue = ac.wards.some((w) => w.id === wardId) ? wardId : ac.wards[0].id;
  const [photo, setPhoto] = useState<string>();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  function onDesc(v: string) {
    setDesc(v);
    const g = classifyComplaint(v);
    if (g.confidence >= 0.7) setCategoryId(g.categoryId);
  }

  async function onPhoto(file?: File) {
    if (!file) return;
    setPhoto(await fileToDataUrl(file));
  }

  function onSubmit() {
    if (!desc.trim()) return;
    setBusy(true);
    window.setTimeout(() => {
      const c = submit({ description: desc.trim(), categoryId, wardId: wardValue, photo, channel: "app" });
      setBusy(false);
      setDone(c.id);
    }, 900);
  }

  if (done) {
    const filed = useApp.getState().complaints.find((c) => c.id === done);
    const officer = officerById(filed?.officerId ?? null);
    return (
      <div className="phone-scroll flex h-full flex-col overflow-y-auto bg-cream px-6 py-10 text-center">
        <p className="text-sm text-muted">{t(lang, "gotNumber")}</p>
        <p className="mt-2 font-display text-3xl tracking-tight">{done}</p>
        <p className="mt-2 text-sm text-muted">{t(lang, "trackAlways")}</p>
        {officer ? (
          <p className="mt-3 text-sm font-medium">
            {t(lang, "sentTo")} {lang === "ta" ? officer.nameTa : officer.name}
          </p>
        ) : null}
        <p className="mt-1 text-xs text-muted">{t(lang, "deskWatching")}</p>
        <LayerLink complaintId={done} />
        <button
          type="button"
          onClick={() => setScreen("detail", done)}
          className="mt-6 h-12 w-full rounded-xl bg-maroon text-paper"
        >
          {t(lang, "myComplaints")}
        </button>
      </div>
    );
  }

  if (busy) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-cream px-8 text-center">
        <div className="size-12 animate-spin rounded-full border-2 border-line border-t-maroon" />
        <p className="mt-6 font-medium">{t(lang, "processing")}</p>
        <p className="mt-1 text-sm text-muted">{t(lang, "sorted")}</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-cream">
      <header className="flex items-center gap-3 px-4 py-3">
        <button type="button" onClick={() => setScreen("home")} className="flex size-10 items-center justify-center">
          <X className="size-4" />
        </button>
        <h1 className="font-medium">{t(lang, "submit")}</h1>
      </header>
      <div className="phone-scroll flex-1 overflow-y-auto px-5 pb-8">
        <label className="text-xs font-medium">{t(lang, "description")}</label>
        <textarea
          value={desc}
          onChange={(e) => onDesc(e.target.value)}
          maxLength={500}
          placeholder={t(lang, "descPh")}
          className="mt-2 h-28 w-full resize-none rounded-xl bg-paper p-3 text-sm outline-none ring-1 ring-line"
        />
        <p className="mt-1 text-right text-[11px] text-muted">{desc.length}/500</p>

        <p className="mt-4 text-xs font-medium">{t(lang, "category")} & {t(lang, "ward")}</p>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="mt-2 h-12 w-full rounded-xl bg-paper px-3 text-sm ring-1 ring-line"
        >
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {lang === "ta" ? c.nameTa : c.name}
            </option>
          ))}
        </select>
        <select
          value={wardValue}
          onChange={(e) => setWardId(e.target.value)}
          className="mt-2 h-12 w-full rounded-xl bg-paper px-3 text-sm ring-1 ring-line"
        >
          {ac.wards.map((w) => (
            <option key={w.id} value={w.id}>
              {lang === "ta" ? w.nameTa : w.name}
            </option>
          ))}
        </select>

        <p className="mt-4 text-xs font-medium">{t(lang, "photo")}</p>
        <label className="mt-2 flex h-28 cursor-pointer flex-col items-center justify-center rounded-xl bg-paper text-sm text-muted ring-1 ring-line">
          {photo ? (
            <img src={photo} alt="" className="h-full w-full rounded-xl object-cover" />
          ) : (
            <>
              <Camera className="size-6" />
              <span className="mt-1">{t(lang, "addPhoto")}</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => void onPhoto(e.target.files?.[0])}
          />
        </label>
        <p className="mt-3 flex items-center gap-2 rounded-xl bg-ok-soft px-3 py-2 text-xs text-ok">
          <MapPin className="size-3.5" /> {t(lang, "locationOk")} · 8.631, 77.912
        </p>
        <button
          type="button"
          disabled={!desc.trim()}
          onClick={onSubmit}
          className="mt-6 h-12 w-full rounded-xl bg-maroon text-paper disabled:opacity-40"
        >
          {t(lang, "submit")}
        </button>
      </div>
    </div>
  );
}

export function VoiceReport() {
  const lang = useApp((s) => s.settings.lang);
  const setScreen = useApp((s) => s.setCitizenScreen);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const sample = "திருச்செந்தூர் பேருந்து நிலையம் அருகில் தெருவிளக்கு எரியவில்லை";

  function listen() {
    const SR = (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition
      ?? (window as unknown as { SpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition;
    if (!SR) {
      setText(sample);
      return;
    }
    const rec = new SR();
    rec.lang = "ta-IN";
    rec.onresult = (e: SpeechRecognitionEvent) => {
      setText(e.results[0]?.[0]?.transcript ?? sample);
      setListening(false);
    };
    rec.onerror = () => {
      setText(sample);
      setListening(false);
    };
    setListening(true);
    rec.start();
  }

  if (text) return <SubmitComplaint voiceSeed={text} />;

  return (
    <div className="flex h-full flex-col bg-cream px-6 pt-5">
      <button type="button" onClick={() => setScreen("home")} className="size-10">
        <ArrowLeft className="size-4" />
      </button>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <button
          type="button"
          onClick={listen}
          className={`flex size-28 items-center justify-center rounded-full ${listening ? "bg-maroon text-paper" : "bg-maroon-soft text-maroon"}`}
        >
          <Mic className="size-10" />
        </button>
        <h1 className="mt-6 font-display text-2xl">{t(lang, "voiceReport")}</h1>
        <p className="mt-2 max-w-xs text-sm text-muted">{t(lang, "speakTa")}</p>
        <button
          type="button"
          onClick={() => setText(sample)}
          className="mt-8 text-sm text-maroon underline-offset-4 hover:underline"
        >
          {lang === "ta" ? "மாதிரி தமிழ் புகார் பயன்படுத்து" : "Use a sample Tamil report"}
        </button>
      </div>
    </div>
  );
}

export function ChatScreen() {
  const lang = useApp((s) => s.settings.lang);
  const session = useApp((s) => s.session);
  const id = useApp((s) => s.activeComplaintId);
  const acId = useApp((s) => s.acId);
  const complaints = useDeskComplaints();
  const addMessage = useApp((s) => s.addMessage);
  const setScreen = useApp((s) => s.setCitizenScreen);
  const mineList = mine(complaints, session, acId);
  const complaint = complaints.find((c) => c.id === id) ?? mineList[0];
  const [text, setText] = useState("");
  if (!complaint) {
    return (
      <div className="p-6 text-sm text-muted">
        <button type="button" onClick={() => setScreen("home")}>
          <ArrowLeft className="size-4" />
        </button>
        <p className="mt-6">{t(lang, "empty")}</p>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col bg-cream">
      <header className="flex items-center gap-3 border-b border-line px-4 py-3">
        <button type="button" onClick={() => setScreen("detail", complaint.id)}>
          <ArrowLeft className="size-4" />
        </button>
        <div>
          <p className="text-sm font-medium">{complaint.id}</p>
          <p className="text-xs text-muted">{t(lang, "chatHint")}</p>
        </div>
      </header>
      <div className="phone-scroll flex-1 space-y-2 overflow-y-auto px-4 py-4">
        {complaint.messages.length === 0 ? (
          <p className="text-center text-sm text-muted">{t(lang, "chatHint")}</p>
        ) : null}
        {complaint.messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${m.from === "citizen" ? "ml-auto bg-maroon text-paper" : "bg-paper ring-1 ring-line"}`}
          >
            <p>{m.text}</p>
            <p className="mt-1 text-[10px] opacity-70">{m.author}</p>
          </div>
        ))}
      </div>
      <form
        className="flex gap-2 border-t border-line p-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          addMessage(complaint.id, "citizen", session?.name ?? "Citizen", text.trim());
          setText("");
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-11 flex-1 rounded-full bg-paper px-4 text-sm ring-1 ring-line"
          placeholder={t(lang, "send")}
        />
        <button type="submit" className="h-11 rounded-full bg-ink px-4 text-sm text-paper">
          {t(lang, "send")}
        </button>
      </form>
    </div>
  );
}

type SpeechRecognition = {
  lang: string;
  start: () => void;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
};
type SpeechRecognitionEvent = { results: ArrayLike<ArrayLike<{ transcript: string }>> };
