import type { ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  Cloud,
  Droplets,
  HelpCircle,
  Lock,
  MapPin,
  Shield,
  Wind,
} from "lucide-react";
import { FAQ, wardById } from "@/lib/catalog";
import { relTime } from "@/lib/format";
import { t } from "@/lib/i18n";
import { mine, notesFor, useApp, useDeskComplaints } from "@/lib/store";
import { useAc } from "@/lib/use-ac";
import { StatusPill } from "@/components/status-pill";

export function SettingsScreen() {
  const lang = useApp((s) => s.settings.lang);
  const ta = lang === "ta";
  const settings = useApp((s) => s.settings);
  const setLang = useApp((s) => s.setLang);
  const setDark = useApp((s) => s.setDark);
  const setNotify = useApp((s) => s.setNotify);
  const setScreen = useApp((s) => s.setCitizenScreen);
  const logout = useApp((s) => s.logout);
  const resetDemo = useApp((s) => s.resetDemo);
  const nav = useNavigate();

  return (
    <div className="phone-scroll h-full overflow-y-auto bg-cream pb-10">
      <header className="flex items-center gap-3 px-4 py-4">
        <button type="button" onClick={() => setScreen("home")}>
          <ArrowLeft className="size-4" />
        </button>
        <h1 className="font-display text-2xl tracking-tight">{t(lang, "settings")}</h1>
      </header>
      <div className="px-4 space-y-5">
        <section>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">{t(lang, "language")}</p>
          <div className="mt-2 overflow-hidden rounded-xl bg-paper ring-1 ring-line">
            {(["ta", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                className="flex w-full items-center justify-between px-4 py-3 text-sm"
              >
                {code === "ta" ? "தமிழ் (Tamil)" : "English"}
                {settings.lang === code ? <span className="text-maroon">✓</span> : null}
              </button>
            ))}
          </div>
        </section>
        <section>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">{t(lang, "notifications")}</p>
          <label className="mt-2 flex items-center justify-between rounded-xl bg-paper px-4 py-3 ring-1 ring-line">
            <span>
              <p className="text-sm">{t(lang, "push")}</p>
              <p className="text-xs text-muted">{ta ? "புகார் புதுப்பிப்புகள்" : "Receive complaint updates"}</p>
            </span>
            <input
              type="checkbox"
              checked={settings.notify}
              onChange={(e) => setNotify(e.target.checked)}
              className="size-5 accent-maroon"
            />
          </label>
        </section>
        <section>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">{t(lang, "appearance")}</p>
          <label className="mt-2 flex items-center justify-between rounded-xl bg-paper px-4 py-3 ring-1 ring-line">
            <span>
              <p className="text-sm">{t(lang, "darkMode")}</p>
              <p className="text-xs text-muted">{ta ? "இருண்ட தோற்றம்" : "Use dark theme"}</p>
            </span>
            <input
              type="checkbox"
              checked={settings.dark}
              onChange={(e) => setDark(e.target.checked)}
              className="size-5 accent-maroon"
            />
          </label>
        </section>
        <section>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">{t(lang, "about")}</p>
          <div className="mt-2 overflow-hidden rounded-xl bg-paper ring-1 ring-line">
            <Row icon={<HelpCircle className="size-4" />} label={t(lang, "faq")} onClick={() => setScreen("help")} />
            <Row icon={<Shield className="size-4" />} label={t(lang, "privacy")} onClick={() => setScreen("help")} />
            <div className="flex items-center justify-between px-4 py-3 text-sm">
              <span className="flex items-center gap-2">
                <Lock className="size-4" /> {t(lang, "version")}
              </span>
              0.1.0
            </div>
          </div>
        </section>
        <button
          type="button"
          onClick={() => {
            logout();
            nav({ to: "/" });
          }}
          className="h-12 w-full rounded-xl bg-ink text-paper"
        >
          {t(lang, "logout")}
        </button>
        <button type="button" onClick={() => resetDemo()} className="w-full text-xs text-muted">
          {ta ? "டெமோ தரவை மீட்டமை" : "Reset demo data"}
        </button>
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center justify-between px-4 py-3 text-sm">
      <span className="flex items-center gap-2">
        {icon} {label}
      </span>
      <ChevronRight className="size-4 text-muted" />
    </button>
  );
}

export function MlaProfile() {
  const lang = useApp((s) => s.settings.lang);
  const ta = lang === "ta";
  const setScreen = useApp((s) => s.setCitizenScreen);
  const ac = useAc();
  const initials = ac.mla.name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");
  const rows = [
    [ta ? "தொகுதி" : "Constituency", ta ? ac.mla.constituencyTa : ac.mla.constituency],
    [ta ? "தேர்வு" : "Elected", ac.mla.elected],
    [ta ? "மாவட்டம்" : "District", ta ? ac.mla.districtTa : ac.mla.district],
    [ta ? "அலுவலகம்" : "Office", ta ? ac.mla.officeTa : ac.mla.office],
    [ta ? "நேரம்" : "Hours", ta ? ac.mla.hoursTa : ac.mla.hours],
  ];
  return (
    <div className="phone-scroll h-full overflow-y-auto bg-cream pb-8">
      <div className="bg-maroon px-4 pb-10 pt-4 text-paper">
        <button type="button" onClick={() => setScreen("home")} className="text-paper">
          <ArrowLeft className="size-4" />
        </button>
        <div className="mt-4 flex flex-col items-center text-center">
          <p className="text-sm">{t(lang, "ourMla")}</p>
          <div className="mt-3 flex size-24 items-center justify-center rounded-full bg-paper font-display text-3xl text-maroon ring-4 ring-white/30">
            {initials}
          </div>
          <h1 className="mt-3 font-display text-2xl">{ac.mla.name}</h1>
          <p className="text-sm text-sand">
            MLA, {ta ? ac.placeTa : ac.place} · {ac.mla.ac}
          </p>
        </div>
      </div>
      <div className="-mt-4 rounded-t-2xl bg-cream px-4 pt-4">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-start justify-between gap-4 border-b border-line py-3 text-sm">
            <span className="text-muted">{k}</span>
            <span className="max-w-[60%] text-right font-medium">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WeatherScreen() {
  const lang = useApp((s) => s.settings.lang);
  const setScreen = useApp((s) => s.setCitizenScreen);
  const ac = useAc();
  return (
    <div className="flex h-full flex-col bg-cream">
      <header className="flex items-center justify-between bg-ink px-4 py-3 text-paper">
        <p className="text-xs font-semibold tracking-[0.18em]">{ac.app.toUpperCase()}</p>
        <button type="button" onClick={() => setScreen("home")}>
          <ArrowLeft className="size-4" />
        </button>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <Cloud className="size-16 text-muted" />
        <p className="mt-4 font-display text-5xl tabular-nums">30°C</p>
        <p className="mt-1 text-muted">{lang === "ta" ? `மேகமூட்டம் · ${ac.placeTa}` : `Clouds · ${ac.place}`}</p>
        <div className="mt-8 grid w-full grid-cols-3 gap-2">
          <Wchip icon={<Droplets className="size-4" />} label={lang === "ta" ? "உணர்வு" : "Feels like"} v="32°C" />
          <Wchip icon={<Droplets className="size-4" />} label={lang === "ta" ? "ஈரப்பதம்" : "Humidity"} v="56%" />
          <Wchip icon={<Wind className="size-4" />} label={lang === "ta" ? "காற்று" : "Wind"} v="6 km/h" />
        </div>
        <p className="mt-6 max-w-xs text-xs text-muted">{t(lang, "weatherHint")}</p>
      </div>
    </div>
  );
}

function Wchip({ icon, label, v }: { icon: ReactNode; label: string; v: string }) {
  return (
    <div className="rounded-xl bg-paper px-2 py-3 ring-1 ring-line">
      <div className="flex justify-center text-muted">{icon}</div>
      <p className="mt-1 text-sm font-semibold tabular-nums">{v}</p>
      <p className="text-[10px] text-muted">{label}</p>
    </div>
  );
}

export function LiveMap() {
  const lang = useApp((s) => s.settings.lang);
  const ta = lang === "ta";
  const session = useApp((s) => s.session);
  const acId = useApp((s) => s.acId);
  const complaints = useDeskComplaints();
  const setScreen = useApp((s) => s.setCitizenScreen);
  const pins = mine(complaints, session, acId);
  return (
    <div className="flex h-full flex-col bg-cream">
      <header className="flex items-center gap-3 px-4 py-3">
        <button type="button" onClick={() => setScreen("home")}>
          <ArrowLeft className="size-4" />
        </button>
        <h1 className="font-medium">{t(lang, "liveMap")}</h1>
      </header>
      <div className="relative mx-4 flex-1 overflow-hidden rounded-xl bg-paper ring-1 ring-line">
        <img src="/brand/coast-map.jpg" alt="" className="h-full w-full object-cover" />
        {pins.map((c) => {
          const w = wardById(c.wardId);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setScreen("detail", c.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${w?.mx ?? 50}%`, top: `${w?.my ?? 50}%` }}
              title={c.id}
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-maroon text-[9px] text-paper">
                <MapPin className="size-3" />
              </span>
            </button>
          );
        })}
      </div>
      <p className="px-4 py-3 text-xs text-muted">
        {ta ? "உங்கள் புகார்கள் வார்டு அளவில் காட்டப்படும்." : "Your complaints plotted by ward."}
      </p>
    </div>
  );
}

export function HelpScreen() {
  const lang = useApp((s) => s.settings.lang);
  const ta = lang === "ta";
  const setScreen = useApp((s) => s.setCitizenScreen);
  return (
    <div className="phone-scroll h-full overflow-y-auto bg-cream px-4 pb-10">
      <header className="flex items-center gap-3 py-4">
        <button type="button" onClick={() => setScreen("home")}>
          <ArrowLeft className="size-4" />
        </button>
        <h1 className="font-display text-2xl">{t(lang, "faq")}</h1>
      </header>
      <div className="space-y-3">
        {FAQ.map((f) => (
          <details key={f.q} className="rounded-xl bg-paper p-4 ring-1 ring-line">
            <summary className="cursor-pointer text-sm font-medium">{ta ? f.qTa : f.q}</summary>
            <p className="mt-2 text-sm leading-relaxed text-muted">{ta ? f.aTa : f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function AnalyticsScreen() {
  const lang = useApp((s) => s.settings.lang);
  const ta = lang === "ta";
  const session = useApp((s) => s.session);
  const ac = useAc();
  const acId = useApp((s) => s.acId);
  const complaints = useDeskComplaints();
  const setScreen = useApp((s) => s.setCitizenScreen);
  const list = mine(complaints, session, acId);
  const resolved = list.filter((c) => c.status === "resolved").length;
  return (
    <div className="h-full bg-cream px-4">
      <header className="flex items-center gap-3 py-4">
        <button type="button" onClick={() => setScreen("home")}>
          <ArrowLeft className="size-4" />
        </button>
        <h1 className="font-display text-2xl">{t(lang, "analytics")}</h1>
      </header>
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-paper p-3 ring-1 ring-line">
          <p className="text-2xl font-semibold tabular-nums">{list.length}</p>
          <p className="text-xs text-muted">{t(lang, "total")}</p>
        </div>
        <div className="rounded-xl bg-paper p-3 ring-1 ring-line">
          <p className="text-2xl font-semibold tabular-nums text-maroon">{list.length - resolved}</p>
          <p className="text-xs text-muted">{t(lang, "active")}</p>
        </div>
        <div className="rounded-xl bg-paper p-3 ring-1 ring-line">
          <p className="text-2xl font-semibold tabular-nums text-ok">{resolved}</p>
          <p className="text-xs text-muted">{t(lang, "resolved")}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {ac.wards.slice(0, 6).map((w) => {
          const n = list.filter((c) => c.wardId === w.id).length;
          return (
            <div key={w.id} className="flex items-center justify-between text-sm">
              <span>{ta ? w.nameTa : w.name}</span>
              <span className="tabular-nums text-muted">{n}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function NotifsScreen() {
  const lang = useApp((s) => s.settings.lang);
  const ta = lang === "ta";
  const notes = useApp((s) => notesFor(s.notifications, s.session, s.acId, s.complaints));
  const mark = useApp((s) => s.markNotifsRead);
  const setScreen = useApp((s) => s.setCitizenScreen);
  return (
    <div className="h-full bg-cream px-4">
      <header className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setScreen("home")}>
            <ArrowLeft className="size-4" />
          </button>
          <h1 className="font-display text-2xl">{t(lang, "notifications")}</h1>
        </div>
        <button type="button" onClick={mark} className="text-xs text-maroon">
          {ta ? "படித்ததாக குறி" : "Mark read"}
        </button>
      </header>
      <div className="space-y-2">
        {notes.length === 0 ? <p className="text-sm text-muted">{t(lang, "empty")}</p> : null}
        {notes.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => n.complaintId && setScreen("detail", n.complaintId)}
            className="w-full rounded-xl bg-paper p-3 text-left ring-1 ring-line"
          >
            <div className="flex items-center gap-2">
              <Bell className="size-4 text-maroon" />
              <p className="text-sm font-medium">{ta ? n.titleTa : n.title}</p>
              {!n.read ? <span className="ml-auto size-2 rounded-full bg-maroon" /> : null}
            </div>
            <p className="mt-1 text-xs text-muted">{ta ? n.bodyTa : n.body}</p>
            <p className="mt-1 text-[10px] text-muted">{relTime(n.at)}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProfileScreen() {
  const session = useApp((s) => s.session);
  const setScreen = useApp((s) => s.setCitizenScreen);
  const lang = useApp((s) => s.settings.lang);
  return (
    <div className="bg-cream px-4 pt-4">
      <button type="button" onClick={() => setScreen("home")}>
        <ArrowLeft className="size-4" />
      </button>
      <div className="mt-8 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-maroon text-xl text-paper">
          {(session?.name ?? "C").slice(0, 1)}
        </div>
        <h1 className="mt-3 font-display text-2xl">{session?.name}</h1>
        <p className="text-sm text-muted">+91 {session?.phone}</p>
        <button
          type="button"
          onClick={() => setScreen("settings")}
          className="mt-6 h-11 rounded-xl bg-ink px-6 text-sm text-paper"
        >
          {t(lang, "settings")}
        </button>
      </div>
    </div>
  );
}
