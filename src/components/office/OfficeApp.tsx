import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  Bell,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  Plus,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  CATEGORIES,
  DEPARTMENTS,
  categoryById,
  deptById,
  officerById,
  wardById,
} from "@/lib/catalog";
import { avgResolutionDays, channelLabel, relTime, slaLabel, slaState } from "@/lib/format";
import { generateBriefing } from "@/lib/ai";
import { fileToDataUrl } from "@/lib/media";
import { t, type CopyKey } from "@/lib/i18n";
import { notesFor, useApp, useDeskComplaints, type OfficeView } from "@/lib/store";
import { useAc } from "@/lib/use-ac";
import type { Complaint, ComplaintStatus } from "@/lib/types";
import { LayerLink } from "@/components/layer-link";
import { PriorityDot, StatusPill } from "@/components/status-pill";

const NAV: { id: OfficeView; label: CopyKey; icon: typeof LayoutDashboard; group: CopyKey }[] = [
  { id: "dashboard", label: "navDashboard", icon: LayoutDashboard, group: "navOverview" },
  { id: "heatmap", label: "navHeatmap", icon: Map, group: "navOverview" },
  { id: "ai", label: "navAi", icon: Sparkles, group: "navOverview" },
  { id: "all", label: "navAll", icon: ClipboardList, group: "navComplaints" },
  { id: "queue", label: "navQueue", icon: Clock, group: "navComplaints" },
  { id: "pending", label: "navPending", icon: Clock, group: "navComplaints" },
  { id: "escalated", label: "navEscalated", icon: AlertTriangle, group: "navComplaints" },
  { id: "resolved", label: "navResolved", icon: CheckCircle2, group: "navComplaints" },
  { id: "walkin", label: "navWalkin", icon: Plus, group: "navComplaints" },
  { id: "officers", label: "navOfficers", icon: Users, group: "navPeople" },
  { id: "wards", label: "navWards", icon: Map, group: "navMaster" },
  { id: "departments", label: "navDepts", icon: Building2, group: "navMaster" },
];

const GROUPS: CopyKey[] = ["navOverview", "navComplaints", "navPeople", "navMaster"];

export function OfficeApp() {
  const nav = useNavigate();
  const session = useApp((s) => s.session);
  const view = useApp((s) => s.officeView);
  const setView = useApp((s) => s.setOfficeView);
  const logout = useApp((s) => s.logout);
  const complaints = useDeskComplaints();
  const ac = useAc();
  const lang = useApp((s) => s.settings.lang);
  const setLang = useApp((s) => s.setLang);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const loginOffice = useApp((s) => s.loginOffice);
  const unread = useApp((s) =>
    notesFor(s.notifications, s.session, s.acId, s.complaints).filter((n) => !n.read).length,
  );
  const isOfficer = session?.role === "officer";
  const ta = lang === "ta";

  useEffect(() => {
    if (session?.role !== "officer" && session?.role !== "office") {
      loginOffice();
    }
  }, [session, loginOffice]);

  const filtered = useMemo(() => {
    let list = complaints;
    if (view === "queue" && session?.officerId) list = list.filter((c) => c.officerId === session.officerId);
    if (view === "pending") list = list.filter((c) => c.status === "pending" || c.status === "new");
    if (view === "escalated") list = list.filter((c) => c.status === "escalated");
    if (view === "resolved") list = list.filter((c) => c.status === "resolved");
    if (q.trim()) {
      const hay = q.toLowerCase();
      list = list.filter((c) =>
        `${c.id} ${c.title} ${c.titleTa} ${c.description} ${c.descriptionTa}`.toLowerCase().includes(hay),
      );
    }
    return list;
  }, [complaints, view, session, q]);

  return (
    <div className="flex min-h-dvh bg-office text-office-fg" lang={lang}>
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-office-line bg-office-2 transition md:static ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center gap-3 px-4 py-4">
          <img src="/brand/logo.svg" alt="" className="size-9 rounded-full" />
          <div>
            <p className="text-sm font-semibold">{ac.app}</p>
            <p className="text-[11px] text-office-muted">
              {ta ? ac.mla.constituencyTa : ac.mla.constituency.replace(" Constituency", "")} · {ac.mla.ac}
            </p>
          </div>
          <button type="button" className="ml-auto md:hidden" onClick={() => setOpen(false)}>
            <X className="size-4" />
          </button>
        </div>
        <nav className="px-2 pb-8">
          {GROUPS.map((g) => (
            <div key={g} className="mt-4">
              <p className="px-3 text-[10px] font-medium uppercase tracking-[0.18em] text-office-muted">
                {t(lang, g)}
              </p>
              {NAV.filter((n) => n.group === g).map((n) => {
                const Icon = n.icon;
                const active = view === n.id;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => {
                      setView(n.id);
                      setOpen(false);
                    }}
                    className={`mt-0.5 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm ${active ? "bg-office-3 text-paper" : "text-office-muted hover:bg-office-3/60 hover:text-paper"}`}
                  >
                    <Icon className="size-4 shrink-0" />
                    {t(lang, n.label)}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-2 border-b border-office-line px-4 py-3 md:gap-3">
          <button type="button" className="md:hidden" onClick={() => setOpen(true)}>
            <Menu className="size-5" />
          </button>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              {ta ? ac.mla.constituencyTa : ac.place} ({ac.mla.ac})
            </p>
            <p className="text-[11px] text-office-muted">
              {isOfficer ? (ta ? officerById(session?.officerId ?? null)?.nameTa ?? session?.name : session?.name) : t(lang, "mlaDesk")}{" "}
              · {t(lang, "live")}
            </p>
          </div>
          <div className="ml-auto hidden items-center gap-2 rounded-full bg-office-3 px-3 lg:flex">
            <Search className="size-3.5 text-office-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t(lang, "searchOffice")}
              className="h-9 w-52 bg-transparent text-sm outline-none"
            />
          </div>
          <LangToggle lang={lang} onChange={setLang} />
          <span className="hidden rounded-full bg-ok/20 px-2 py-0.5 text-[10px] text-ok sm:inline">
            {t(lang, "live")}
          </span>
          <span className="relative hidden sm:block">
            <Bell className="size-4 text-office-muted" />
            {unread > 0 ? (
              <span className="absolute -right-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-maroon text-[9px] text-paper">
                {unread > 9 ? "9" : unread}
              </span>
            ) : null}
          </span>
          <span className="flex size-8 items-center justify-center rounded-full bg-maroon text-xs text-paper">
            {(session?.name ?? "U").slice(0, 1)}
          </span>
          <Link
            to="/"
            className="hidden rounded-full border border-office-line px-3 py-1.5 text-xs text-office-muted md:inline"
          >
            {t(lang, "roles")}
          </Link>
          <button
            type="button"
            onClick={() => {
              logout();
              nav({ to: "/" });
            }}
            className="rounded-full border border-office-line px-3 py-1.5 text-xs"
          >
            <LogOut className="mr-1 inline size-3" /> {t(lang, "logout")}
          </button>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
          {view === "dashboard" ? <Dashboard /> : null}
          {view === "heatmap" ? <Heatmap /> : null}
          {view === "ai" ? <AiPanel /> : null}
          {["all", "queue", "pending", "escalated", "resolved"].includes(view) ? (
            <ComplaintTable
              title={t(lang, NAV.find((n) => n.id === view)?.label ?? "navComplaints")}
              rows={filtered}
            />
          ) : null}
          {view === "walkin" ? <WalkIn /> : null}
          {view === "officers" ? <Officers /> : null}
          {view === "wards" ? <Wards /> : null}
          {view === "departments" ? <Depts /> : null}
          {view === "detail" ? <OfficeDetail /> : null}
        </main>
      </div>
    </div>
  );
}

function LangToggle({ lang, onChange }: { lang: "en" | "ta"; onChange: (l: "en" | "ta") => void }) {
  return (
    <div className="flex overflow-hidden rounded-full border border-office-line text-[11px] font-medium">
      <button
        type="button"
        onClick={() => onChange("en")}
        className={`px-2.5 py-1.5 ${lang === "en" ? "bg-maroon text-paper" : "text-office-muted hover:text-paper"}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onChange("ta")}
        className={`px-2.5 py-1.5 ${lang === "ta" ? "bg-maroon text-paper" : "text-office-muted hover:text-paper"}`}
      >
        தமிழ்
      </button>
    </div>
  );
}

function Dashboard() {
  const lang = useApp((s) => s.settings.lang);
  const ta = lang === "ta";
  const complaints = useDeskComplaints();
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "pending" || c.status === "new").length;
  const progress = complaints.filter((c) => c.status === "in_progress").length;
  const resolved = complaints.filter((c) => c.status === "resolved").length;
  const avg = avgResolutionDays(complaints);
  const pie = [
    { name: t(lang, "pending"), value: pending, color: "#c4a35a" },
    { name: t(lang, "inProgress"), value: progress, color: "#3b82f6" },
    { name: t(lang, "resolved"), value: resolved, color: "#22c55e" },
    { name: t(lang, "navEscalated"), value: complaints.filter((c) => c.status === "escalated").length, color: "#ef4444" },
  ];
  const setView = useApp((s) => s.setOfficeView);
  const week = complaints.filter((c) => Date.now() - new Date(c.createdAt).getTime() < 7 * 864e5).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl tracking-tight">{t(lang, "dash")}</h1>
          <p className="text-sm text-office-muted">{t(lang, "dashSub")}</p>
        </div>
        <span className="rounded-full bg-office-3 px-3 py-1 text-xs text-ok">{t(lang, "liveData")}</span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Kpi label={t(lang, "kpiTotal")} value={total} hint={`+${week} ${t(lang, "thisWeek")}`} />
        <Kpi label={t(lang, "pending")} value={pending} hint={`${pct(pending, total)} ${t(lang, "ofTotal")}`} />
        <Kpi label={t(lang, "inProgress")} value={progress} hint={`${pct(progress, total)} ${t(lang, "ofTotal")}`} />
        <Kpi label={t(lang, "resolved")} value={resolved} hint={`${pct(resolved, total)} ${t(lang, "resRate")}`} />
        <Kpi label={t(lang, "kpiAvg")} value={`${avg.toFixed(1)} ${t(lang, "days")}`} hint={t(lang, "trend")} />
      </div>

      <div className="mt-5 rounded-xl bg-office-2 p-4 ring-1 ring-office-line">
        <p className="text-sm font-medium">{t(lang, "flowTitle")}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          {(
            [
              ["flowCitizen", total],
              ["flowAi", total],
              ["flowAssign", complaints.filter((c) => c.officerId).length],
              ["flowOfficer", progress + resolved],
              ["flowNotify", resolved],
              ["flowMla", total],
            ] as const
          ).map(([key, n], i) => (
            <div key={key} className="flex min-w-[88px] flex-col items-center">
              <span className="flex size-10 items-center justify-center rounded-full bg-office-3 text-xs tabular-nums">
                {n}
              </span>
              <p className="mt-2 text-center text-[11px] text-office-muted">{t(lang, key)}</p>
              {i < 5 ? <span className="hidden h-px w-8 bg-office-line lg:block" /> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl bg-office-2 p-4 ring-1 ring-office-line lg:col-span-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{t(lang, "recentComplaints")}</p>
            <span className="text-[11px] text-ok">{t(lang, "liveFeed")}</span>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-[11px] uppercase tracking-wide text-office-muted">
                <tr>
                  <th className="py-2">ID</th>
                  <th>{t(lang, "colComplaint")}</th>
                  <th>{t(lang, "colChannel")}</th>
                  <th>{t(lang, "colWard")}</th>
                  <th>{t(lang, "colPriority")}</th>
                  <th>{t(lang, "colStatus")}</th>
                </tr>
              </thead>
              <tbody>
                {complaints.slice(0, 6).map((c) => (
                  <tr
                    key={c.id}
                    className="cursor-pointer border-t border-office-line/80 hover:bg-office-3/40"
                    onClick={() => setView("detail", c.id)}
                  >
                    <td className="py-2.5 font-mono text-xs">{c.id}</td>
                    <td>
                      <p>{ta ? c.titleTa : c.title}</p>
                      <p className="text-[11px] text-office-muted">
                        {(ta ? c.descriptionTa : c.description).slice(0, 42)}…
                      </p>
                    </td>
                    <td className="text-xs">{channelLabel(c.channel, ta)}</td>
                    <td className="text-xs">{wardById(c.wardId)?.[ta ? "nameTa" : "name"]}</td>
                    <td>
                      <PriorityDot priority={c.priority} ta={ta} />
                    </td>
                    <td>
                      <StatusPill status={c.status} ta={ta} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-xl bg-office-2 p-4 ring-1 ring-office-line">
          <p className="text-sm font-medium">{t(lang, "statusBreakdown")}</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pie} dataKey="value" innerRadius={48} outerRadius={74} strokeWidth={0}>
                  {pie.map((p) => (
                    <Cell key={p.name} fill={p.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-1 text-xs text-office-muted">
            {pie.map((p) => (
              <li key={p.name} className="flex justify-between">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full" style={{ background: p.color }} />
                  {p.name}
                </span>
                <span className="tabular-nums">{p.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string | number; hint: string }) {
  return (
    <div className="rounded-xl bg-office-2 p-4 ring-1 ring-office-line">
      <p className="text-[11px] uppercase tracking-wide text-office-muted">{label}</p>
      <p className="mt-2 font-display text-3xl tabular-nums tracking-tight">{value}</p>
      <p className="mt-1 text-[11px] text-office-muted">{hint}</p>
    </div>
  );
}

function pct(n: number, d: number) {
  if (!d) return "0%";
  return `${Math.round((n / d) * 100)}%`;
}

function ComplaintTable({ title, rows }: { title: string; rows: Complaint[] }) {
  const lang = useApp((s) => s.settings.lang);
  const ta = lang === "ta";
  const setView = useApp((s) => s.setOfficeView);
  return (
    <div>
      <h1 className="font-display text-3xl tracking-tight">{title}</h1>
      <p className="text-sm text-office-muted">
        {rows.length} {t(lang, "records")}
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl bg-office-2 ring-1 ring-office-line">
        <table className="w-full text-left text-sm">
          <thead className="text-[11px] uppercase tracking-wide text-office-muted">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th>{t(lang, "colTitle")}</th>
              <th>{t(lang, "colWard")}</th>
              <th>{t(lang, "colOfficer")}</th>
              <th>{t(lang, "colSla")}</th>
              <th>{t(lang, "colStatus")}</th>
              <th>{t(lang, "colAge")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr
                key={c.id}
                className="cursor-pointer border-t border-office-line hover:bg-office-3/40"
                onClick={() => setView("detail", c.id)}
              >
                <td className="px-4 py-3 font-mono text-xs">{c.id}</td>
                <td>{ta ? c.titleTa : c.title}</td>
                <td>{wardById(c.wardId)?.[ta ? "nameTa" : "name"]}</td>
                <td>{(ta ? officerById(c.officerId)?.nameTa : officerById(c.officerId)?.name) ?? "—"}</td>
                <td className="text-xs">{slaLabel(slaState(c), ta)}</td>
                <td>
                  <StatusPill status={c.status} ta={ta} />
                </td>
                <td className="text-xs text-office-muted">{relTime(c.createdAt, ta)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OfficeDetail() {
  const lang = useApp((s) => s.settings.lang);
  const ta = lang === "ta";
  const id = useApp((s) => s.activeComplaintId);
  const c = useApp((s) => s.complaints.find((x) => x.id === id));
  const session = useApp((s) => s.session);
  const updateStatus = useApp((s) => s.updateStatus);
  const assignOfficer = useApp((s) => s.assignOfficer);
  const addMessage = useApp((s) => s.addMessage);
  const setView = useApp((s) => s.setOfficeView);
  const [note, setNote] = useState("");
  const [reply, setReply] = useState("");
  const [proof, setProof] = useState<string>();
  const ac = useAc();
  if (!c) return <p>{t(lang, "selectComplaint")}</p>;
  const actor = session?.name ?? t(lang, "office");
  const marks: { s: ComplaintStatus; key: CopyKey }[] = [
    { s: "pending", key: "markPending" },
    { s: "in_progress", key: "markProgress" },
    { s: "resolved", key: "markResolved" },
    { s: "escalated", key: "markEscalated" },
  ];
  return (
    <div className="mx-auto max-w-3xl">
      <button type="button" onClick={() => setView("all")} className="text-sm text-office-muted">
        ← {t(lang, "back")}
      </button>
      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-office-muted">{c.id}</p>
          <h1 className="font-display text-3xl tracking-tight">{ta ? c.titleTa : c.title}</h1>
          <p className="mt-1 text-sm text-office-muted">{ta ? c.descriptionTa : c.description}</p>
        </div>
        <StatusPill status={c.status} ta={ta} />
      </div>
      {c.photo ? <img src={c.photo} alt="" className="mt-4 h-48 w-full rounded-xl object-cover" /> : null}
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Info k={t(lang, "citizenLabel")} v={`${c.citizenName} · ${c.citizenPhone}`} />
        <Info k={t(lang, "ward")} v={wardById(c.wardId)?.[ta ? "nameTa" : "name"]} />
        <Info k={t(lang, "category")} v={categoryById(c.categoryId)?.[ta ? "nameTa" : "name"]} />
        <Info k={t(lang, "department")} v={deptById(c.departmentId)?.[ta ? "nameTa" : "name"]} />
      </dl>
      <label className="mt-4 block text-xs text-office-muted">{t(lang, "assignOfficer")}</label>
      <select
        value={c.officerId ?? ""}
        onChange={(e) => assignOfficer(c.id, e.target.value, actor)}
        className="mt-1 h-11 w-full rounded-lg bg-office-3 px-3 text-sm"
      >
        {ac.officers.map((o) => (
          <option key={o.id} value={o.id}>
            {ta ? o.nameTa : o.name} · {deptById(o.departmentId)?.[ta ? "nameTa" : "name"]}
          </option>
        ))}
      </select>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder={t(lang, "fieldNote")}
        className="mt-3 h-20 w-full rounded-lg bg-office-3 p-3 text-sm"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {marks.map((m) => (
          <button
            key={m.s}
            type="button"
            onClick={() => {
              updateStatus(c.id, m.s, actor, note || undefined, proof);
              setNote("");
            }}
            className="rounded-full bg-office-3 px-3 py-2 text-xs"
          >
            {t(lang, m.key)}
          </button>
        ))}
        <label className="cursor-pointer rounded-full bg-office-3 px-3 py-2 text-xs">
          {proof ? t(lang, "proof") : t(lang, "proofAdd")}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void fileToDataUrl(file).then(setProof);
            }}
          />
        </label>
      </div>
      {c.afterPhoto ? <img src={c.afterPhoto} alt="" className="mt-3 h-40 w-full rounded-xl object-cover" /> : null}
      <div className="mt-6">
        <p className="text-sm font-medium">{t(lang, "thread")}</p>
        <div className="mt-2 space-y-2">
          {c.messages.length === 0 ? <p className="text-xs text-office-muted">{t(lang, "chatHint")}</p> : null}
          {c.messages.map((m) => (
            <div key={m.id} className="rounded-lg bg-office-3 px-3 py-2 text-sm">
              <p>{m.text}</p>
              <p className="mt-1 text-[10px] text-office-muted">{m.author}</p>
            </div>
          ))}
        </div>
        <form
          className="mt-2 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!reply.trim() || !session) return;
            addMessage(c.id, session.role === "citizen" ? "citizen" : session.role, actor, reply.trim());
            setReply("");
          }}
        >
          <input
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder={t(lang, "replyPh")}
            className="h-11 flex-1 rounded-lg bg-office-3 px-3 text-sm"
          />
          <button type="submit" className="h-11 rounded-lg bg-maroon px-4 text-sm text-paper">
            {t(lang, "send")}
          </button>
        </form>
      </div>
      <LayerLink complaintId={c.id} tone="dark" />
      <ol className="mt-6 space-y-3 border-l border-office-line pl-4">
        {c.timeline.map((ev) => (
          <li key={ev.id}>
            <p className="text-sm">{ta ? ev.titleTa : ev.title}</p>
            <p className="text-[11px] text-office-muted">
              {ev.actor} · {relTime(ev.at, ta)}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Info({ k, v }: { k: string; v?: string }) {
  return (
    <div className="rounded-lg bg-office-2 p-3 ring-1 ring-office-line">
      <p className="text-[11px] text-office-muted">{k}</p>
      <p className="text-sm">{v ?? "—"}</p>
    </div>
  );
}

function Heatmap() {
  const lang = useApp((s) => s.settings.lang);
  const ta = lang === "ta";
  const complaints = useDeskComplaints();
  const ac = useAc();
  return (
    <div>
      <h1 className="font-display text-3xl tracking-tight">{t(lang, "navHeatmap")}</h1>
      <p className="text-sm text-office-muted">{t(lang, "heatmapSub")}</p>
      <div className="relative mt-4 h-[480px] overflow-hidden rounded-xl ring-1 ring-office-line">
        <img src="/brand/coast-map.jpg" alt={t(lang, "mapAlt")} className="h-full w-full object-cover opacity-80" />
        {ac.wards.map((w) => {
          const n = complaints.filter((c) => c.wardId === w.id).length;
          const size = 18 + n * 10;
          const color = n >= 3 ? "#ef4444" : n === 2 ? "#f59e0b" : n === 1 ? "#22c55e" : "#64748b";
          return (
            <div
              key={w.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80"
              style={{ left: `${w.mx}%`, top: `${w.my}%`, width: size, height: size, background: color }}
              title={`${ta ? w.nameTa : w.name}: ${n}`}
            />
          );
        })}
      </div>
      <p className="mt-3 text-xs text-office-muted">{t(lang, "heatmapLegend")}</p>
    </div>
  );
}

function AiPanel() {
  const lang = useApp((s) => s.settings.lang);
  const ta = lang === "ta";
  const complaints = useDeskComplaints();
  const ac = useAc();
  const ai = useApp((s) => s.ai);
  const setAi = useApp((s) => s.setAi);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const topCat = CATEGORIES.map((cat) => ({
    cat,
    n: complaints.filter((c) => c.categoryId === cat.id).length,
  })).sort((a, b) => b.n - a.n)[0];
  const overdue = complaints.filter((c) => slaState(c) === "overdue");
  const open = complaints.filter((c) => c.status !== "resolved").length;
  const wa = complaints.filter((c) => c.channel === "whatsapp").length;
  const focus = ac.wards[0];
  const local = [
    `${t(lang, "aiTop")}: ${topCat ? (ta ? topCat.cat.nameTa : topCat.cat.name) : "—"} (${topCat?.n ?? 0})`,
    `${t(lang, "aiOpen")}: ${open} / ${complaints.length}`,
    `${t(lang, "aiSla")}: ${overdue.length} ${t(lang, "overdue")}`,
    `${t(lang, "aiWa")}: ${wa}`,
    `${t(lang, "aiAction")}: ${overdue[0]?.id ?? "—"} · ${ta ? focus?.nameTa : focus?.name}`,
  ];

  async function run() {
    setBusy(true);
    setErr("");
    const summary = complaints
      .map((c) => `${c.id}|${c.categoryId}|${c.status}|${c.wardId}|${c.channel}`)
      .join("\n");
    const langHint = ta ? "Reply in Tamil (தமிழ்)." : "Reply in English.";
    const res = await generateBriefing({
      data: {
        summary: `${ac.app} · ${ac.mla.ac} ${ac.place}\n${langHint}\nCounts ${complaints.length}\n${summary}`,
        lang,
      },
    });
    setBusy(false);
    if (!res.ok) setErr(res.error);
    else setAi(res.text);
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl tracking-tight">{t(lang, "navAi")}</h1>
      <p className="text-sm text-office-muted">{t(lang, "aiSub")}</p>
      <ul className="mt-5 space-y-2">
        {local.map((l) => (
          <li key={l} className="rounded-xl bg-office-2 px-4 py-3 text-sm ring-1 ring-office-line">
            {l}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => void run()}
        disabled={busy}
        className="mt-5 flex h-11 items-center gap-2 rounded-xl bg-maroon px-4 text-sm text-paper"
      >
        <Sparkles className="size-4" />
        {busy ? t(lang, "asking") : t(lang, "genBrief")}
      </button>
      {err ? <p className="mt-2 text-sm text-danger">{err}</p> : null}
      {ai ? (
        <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-office-2 p-4 text-sm leading-relaxed ring-1 ring-office-line">
          {ai.text}
        </pre>
      ) : null}
    </div>
  );
}

function WalkIn() {
  const lang = useApp((s) => s.settings.lang);
  const ta = lang === "ta";
  const submit = useApp((s) => s.submitComplaint);
  const setView = useApp((s) => s.setOfficeView);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [desc, setDesc] = useState("");
  const [categoryId, setCategoryId] = useState("pothole");
  const ac = useAc();
  const [wardId, setWardId] = useState(ac.wards[0]?.id ?? "town");
  const wardValue = ac.wards.some((w) => w.id === wardId) ? wardId : ac.wards[0].id;
  return (
    <div className="max-w-xl">
      <h1 className="font-display text-3xl tracking-tight">{t(lang, "navWalkin")}</h1>
      <p className="text-sm text-office-muted">{t(lang, "walkinSub")}</p>
      <form
        className="mt-5 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          const c = submit({
            description: desc,
            categoryId,
            wardId: wardValue,
            channel: "walkin",
            citizenName: name || t(lang, "walkinCitizen"),
            citizenPhone: phone,
          });
          setView("detail", c.id);
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t(lang, "citizenName")}
          className="h-11 w-full rounded-lg bg-office-3 px-3 text-sm"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t(lang, "mobile")}
          className="h-11 w-full rounded-lg bg-office-3 px-3 text-sm"
        />
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder={t(lang, "issuePh")}
          className="h-28 w-full rounded-lg bg-office-3 p-3 text-sm"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="h-11 w-full rounded-lg bg-office-3 px-3 text-sm"
        >
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {ta ? c.nameTa : c.name}
            </option>
          ))}
        </select>
        <select
          value={wardValue}
          onChange={(e) => setWardId(e.target.value)}
          className="h-11 w-full rounded-lg bg-office-3 px-3 text-sm"
        >
          {ac.wards.map((w) => (
            <option key={w.id} value={w.id}>
              {ta ? w.nameTa : w.name}
            </option>
          ))}
        </select>
        <button type="submit" disabled={!desc.trim()} className="h-11 rounded-xl bg-maroon px-5 text-sm text-paper">
          {t(lang, "register")}
        </button>
      </form>
    </div>
  );
}

function Officers() {
  const lang = useApp((s) => s.settings.lang);
  const ta = lang === "ta";
  const complaints = useDeskComplaints();
  const ac = useAc();
  const loginOfficer = useApp((s) => s.loginOfficer);
  const setView = useApp((s) => s.setOfficeView);
  return (
    <div>
      <h1 className="font-display text-3xl tracking-tight">{t(lang, "navOfficers")}</h1>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ac.officers.map((o) => {
          const n = complaints.filter((c) => c.officerId === o.id && c.status !== "resolved").length;
          return (
            <div key={o.id} className="rounded-xl bg-office-2 p-4 ring-1 ring-office-line">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-maroon text-sm text-paper">
                  {o.initials}
                </span>
                <div>
                  <p className="font-medium">{ta ? o.nameTa : o.name}</p>
                  <p className="text-xs text-office-muted">{deptById(o.departmentId)?.[ta ? "nameTa" : "name"]}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-office-muted">
                {n} {t(lang, "openCount")} · {o.phone}
              </p>
              <button
                type="button"
                onClick={() => {
                  loginOfficer(o.id);
                  setView("queue");
                }}
                className="mt-3 text-xs text-gold"
              >
                {t(lang, "openAsOfficer")}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Wards() {
  const lang = useApp((s) => s.settings.lang);
  const ta = lang === "ta";
  const complaints = useDeskComplaints();
  const ac = useAc();
  return (
    <div>
      <h1 className="font-display text-3xl tracking-tight">{t(lang, "navWards")}</h1>
      <div className="mt-4 overflow-hidden rounded-xl bg-office-2 ring-1 ring-office-line">
        {ac.wards.map((w) => (
          <div key={w.id} className="flex items-center justify-between border-b border-office-line px-4 py-3 text-sm">
            <span>{ta ? w.nameTa : w.name}</span>
            <span className="tabular-nums text-office-muted">{complaints.filter((c) => c.wardId === w.id).length}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Depts() {
  const lang = useApp((s) => s.settings.lang);
  const ta = lang === "ta";
  const complaints = useDeskComplaints();
  return (
    <div>
      <h1 className="font-display text-3xl tracking-tight">{t(lang, "navDepts")}</h1>
      <div className="mt-4 overflow-hidden rounded-xl bg-office-2 ring-1 ring-office-line">
        {DEPARTMENTS.map((d) => (
          <div key={d.id} className="flex items-center justify-between border-b border-office-line px-4 py-3 text-sm">
            <span>{ta ? d.nameTa : d.name}</span>
            <span className="tabular-nums text-office-muted">
              {complaints.filter((c) => c.departmentId === d.id).length}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
