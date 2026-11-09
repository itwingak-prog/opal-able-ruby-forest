import type { ReactNode } from "react";
import {
  BarChart3,
  ChevronRight,
  Droplets,
  HelpCircle,
  MapPin,
  MessageSquare,
  Mic,
  PenLine,
  Settings,
  Wind,
} from "lucide-react";
import { wardById } from "@/lib/catalog";
import { relTime } from "@/lib/format";
import { t } from "@/lib/i18n";
import { mine, useApp, useDeskComplaints } from "@/lib/store";
import { useAc } from "@/lib/use-ac";
import { StatusPill } from "@/components/status-pill";
import { BellDot } from "./auth-flow";

export function Home() {
  const lang = useApp((s) => s.settings.lang);
  const ta = lang === "ta";
  const session = useApp((s) => s.session);
  const acId = useApp((s) => s.acId);
  const ac = useAc();
  const complaints = useDeskComplaints();
  const setScreen = useApp((s) => s.setCitizenScreen);
  const mineList = mine(complaints, session, acId);
  const total = mineList.length;
  const active = mineList.filter((c) => c.status !== "resolved").length;
  const resolved = mineList.filter((c) => c.status === "resolved").length;
  const rate = total ? Math.round((resolved / total) * 100) : 0;
  const hour = new Date().getHours();
  const greet =
    hour < 12 ? (ta ? "காலை வணக்கம்" : "Good morning") : hour < 17 ? (ta ? "மதிய வணக்கம்" : "Good afternoon") : ta ? "மாலை வணக்கம்" : "Good evening";

  return (
    <div className="phone-scroll flex h-full flex-col overflow-y-auto bg-cream pb-24">
      <header className="flex items-center justify-between bg-ink px-4 py-3 text-paper">
        <p className="text-xs font-semibold tracking-[0.18em]">{ac.app.toUpperCase()}</p>
        <div className="flex items-center gap-2">
          <BellDot />
          <button
            type="button"
            onClick={() => setScreen("profile")}
            className="flex size-9 items-center justify-center rounded-full bg-white/10 text-sm font-medium"
          >
            {(session?.name ?? "C").slice(0, 1)}
          </button>
        </div>
      </header>

      <section className="sunburst relative overflow-hidden px-5 pb-8 pt-6 text-paper">
        <SunRays />
        <p className="relative text-xs text-sand">
          {greet}
          {session?.name ? ` · ${session.name}` : ""}
        </p>
        <h1 className="relative mt-2 max-w-[16ch] font-display text-[1.85rem] leading-tight tracking-tight">
          {t(lang, "greeting")}
        </h1>
      </section>

      <div className="px-4">
        <button
          type="button"
          onClick={() => setScreen("weather")}
          className="mt-4 flex w-full items-center justify-between rounded-xl bg-[#d7eef7] px-4 py-3 text-left"
        >
          <div>
            <p className="text-2xl font-semibold tabular-nums text-fg">30°C</p>
            <p className="text-xs text-muted">
              {ta ? "மேகமூட்டம்" : "Clouds"} · {ta ? ac.placeTa : ac.place}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="flex items-center gap-1">
              <Droplets className="size-3.5" /> 56%
            </span>
            <span className="flex items-center gap-1">
              <Wind className="size-3.5" /> 6 km/h
            </span>
          </div>
        </button>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">{t(lang, "announcements")}</h2>
            <span className="rounded-full bg-maroon px-2 py-0.5 text-[10px] text-paper">
              {ac.announcements.length}
            </span>
          </div>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            {ac.announcements.map((a) => (
              <div
                key={a.id}
                className="min-w-[180px] rounded-xl bg-paper-2 p-3"
              >
                <p className="text-sm font-medium">{ta ? a.titleTa : a.title}</p>
                <p className="mt-1 text-xs text-muted">{ta ? a.detailTa : a.detail}</p>
                <p className="mt-2 text-[10px] text-muted">{a.when}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setScreen("submit")}
          className="mt-4 flex w-full items-center justify-between rounded-xl bg-paper px-4 py-4 text-left shadow-sm ring-1 ring-line"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-maroon-soft text-maroon">
              <PenLine className="size-4" />
            </span>
            <div>
              <p className="font-medium">{t(lang, "report")}</p>
              <p className="text-xs text-muted">{t(lang, "reportVoice")}</p>
            </div>
          </div>
          <ChevronRight className="size-4 text-muted" />
        </button>

        <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-xl bg-paper ring-1 ring-line">
          <Stat n={total} label={t(lang, "total")} />
          <Stat n={active} label={t(lang, "active")} accent />
          <Stat n={resolved} label={t(lang, "resolved")} ok />
        </div>

        <button
          type="button"
          onClick={() => setScreen("mla")}
          className="mt-3 flex w-full items-center gap-3 rounded-xl bg-paper p-3 text-left ring-1 ring-line"
        >
          <img src="/brand/logo.svg" alt="" className="size-12 rounded-full" />
          <div className="flex-1">
            <p className="text-[11px] font-medium text-maroon">{t(lang, "yourMla")}</p>
            <p className="text-sm font-semibold">{ta ? ac.mla.constituencyTa : ac.mla.constituency}</p>
            <p className="text-xs text-muted">
              {ac.mla.ac} · {ta ? ac.mla.districtTa : ac.mla.district}
            </p>
          </div>
          <ChevronRight className="size-4 text-muted" />
        </button>

        <div className="mt-3 rounded-xl bg-paper p-4 ring-1 ring-line">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{t(lang, "resolutionRate")}</p>
            <span className="rounded-full bg-ok-soft px-2 py-0.5 text-[10px] text-ok">
              {t(lang, "active")}
            </span>
          </div>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{rate}%</p>
          <p className="text-xs text-muted">
            {resolved} {ta ? "இல்" : "of"} {total} {ta ? "புகார்கள் தீர்ந்தன" : "complaints resolved"}
          </p>
        </div>

        <h2 className="mt-6 text-sm font-semibold">{t(lang, "services")}</h2>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Service
            title={t(lang, "myComplaints")}
            sub={t(lang, "trackAll")}
            className="bg-maroon text-paper"
            icon={<PenLine className="size-4" />}
            onClick={() => setScreen("complaints")}
          />
          <Service
            title={t(lang, "voiceReport")}
            sub={t(lang, "speakTa")}
            className="bg-ink text-paper"
            icon={<Mic className="size-4" />}
            onClick={() => setScreen("voice")}
          />
        </div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          <Mini icon={<MapPin className="size-4" />} label={t(lang, "liveMap")} onClick={() => setScreen("map")} />
          <Mini icon={<HelpCircle className="size-4" />} label={t(lang, "help")} onClick={() => setScreen("help")} />
          <Mini icon={<BarChart3 className="size-4" />} label={t(lang, "analytics")} onClick={() => setScreen("analytics")} />
          <Mini icon={<MessageSquare className="size-4" />} label={t(lang, "chat")} onClick={() => setScreen("chat")} />
        </div>
        <button
          type="button"
          onClick={() => setScreen("settings")}
          className="mt-2 flex w-full items-center gap-2 rounded-xl bg-paper px-3 py-3 text-sm ring-1 ring-line"
        >
          <Settings className="size-4" /> {t(lang, "settings")}
        </button>

        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold">{t(lang, "recent")}</h2>
          <button type="button" className="text-xs text-maroon" onClick={() => setScreen("complaints")}>
            {t(lang, "viewAll")}
          </button>
        </div>
        <div className="mt-2 space-y-2">
          {mineList.slice(0, 3).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setScreen("detail", c.id)}
              className="flex w-full items-center justify-between rounded-xl bg-paper px-3 py-3 text-left ring-1 ring-line"
            >
              <div>
                <p className="text-sm font-medium">{ta ? c.titleTa : c.title}</p>
                <p className="text-xs text-muted">
                  {wardById(c.wardId)?.[ta ? "nameTa" : "name"]} · {relTime(c.createdAt)}
                </p>
              </div>
              <StatusPill status={c.status} ta={ta} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ n, label, accent, ok }: { n: number; label: string; accent?: boolean; ok?: boolean }) {
  return (
    <div className="px-3 py-3 text-center">
      <p className={`text-lg font-semibold tabular-nums ${accent ? "text-maroon" : ok ? "text-ok" : ""}`}>
        {n}
      </p>
      <p className="text-[11px] text-muted">{label}</p>
    </div>
  );
}

function Service({
  title,
  sub,
  className,
  icon,
  onClick,
}: {
  title: string;
  sub: string;
  className: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className={`rounded-xl p-4 text-left ${className}`}>
      <span className="flex size-8 items-center justify-center rounded-lg bg-white/15">{icon}</span>
      <p className="mt-3 text-sm font-semibold">{title}</p>
      <p className="text-[11px] opacity-80">{sub}</p>
    </button>
  );
}

function Mini({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1 rounded-xl bg-paper px-1 py-3 text-[11px] ring-1 ring-line"
    >
      <span className="text-fg">{icon}</span>
      {label}
    </button>
  );
}

function SunRays() {
  return (
    <svg className="pointer-events-none absolute -right-8 -top-10 size-56 opacity-90" viewBox="0 0 200 200" aria-hidden>
      <circle cx="120" cy="70" r="28" fill="#f3c15b" />
      {Array.from({ length: 18 }).map((_, i) => {
        const a = (i / 18) * Math.PI * 2;
        const x1 = 120 + Math.cos(a) * 34;
        const y1 = 70 + Math.sin(a) * 34;
        const x2 = 120 + Math.cos(a) * 88;
        const y2 = 70 + Math.sin(a) * 88;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e8a63a" strokeWidth="3" />;
      })}
    </svg>
  );
}
