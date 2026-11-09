import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  Lock,
  Megaphone,
  TrendingUp,
} from "lucide-react";
import { LEADERS } from "@/lib/catalog";
import { t } from "@/lib/i18n";
import { notesFor, useApp } from "@/lib/store";
import { useAc } from "@/lib/use-ac";

export function Splash() {
  const lang = useApp((s) => s.settings.lang);
  const setScreen = useApp((s) => s.setCitizenScreen);
  const onboarded = useApp((s) => s.onboarded);
  const session = useApp((s) => s.session);
  const ac = useAc();
  const goRef = useRef(onboarded);

  goRef.current = onboarded;

  const advance = () => {
    const live = useApp.getState();
    if (live.session?.role === "citizen") {
      setScreen("home");
      return;
    }
    if (live.onboarded || goRef.current) {
      const phone = live.pendingPhone.length === 10 ? live.pendingPhone : "9876543210";
      live.loginCitizen(phone);
      return;
    }
    setScreen("onboard");
  };

  useEffect(() => {
    const tmr = window.setTimeout(advance, 1400);
    return () => window.clearTimeout(tmr);
    // Run once. A changing session during rehydrate must not cancel this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={advance}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          advance();
        }
      }}
      className="flex h-full w-full cursor-pointer flex-col bg-cream text-left text-fg"
    >
      <div className="relative flex flex-1 flex-col items-center justify-end bg-maroon-soft pb-10">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-maroon/15 to-transparent" />
        <img src="/brand/logo.svg" alt="" className="relative z-[1] size-28" />
      </div>
      <div className="flex flex-[1.1] flex-col items-center px-8 pb-8 pt-6">
        <img src="/brand/logo.svg" alt="" className="size-10" />
        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
          {t(lang, "splashHonor")}
        </p>
        <h1 className="mt-2 text-center font-display text-[1.7rem] leading-tight tracking-tight">
          {ac.mla.name}
        </h1>
        <p className="mt-1 text-center text-sm text-muted">
          {ac.mla.constituency} · {ac.mla.ac}
        </p>
        <div className="mt-auto w-full pt-8 text-center">
          <p className="text-sm font-semibold tracking-wide">{ac.app}</p>
          <p className="mt-1 text-xs text-muted">
            {lang === "ta" ? "உங்கள் குரல். எங்கள் பொறுப்பு" : "Your voice. Our duty."}
          </p>
          <span className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-ink text-sm font-medium text-paper">
            {t(lang, "continue")}
          </span>
          <div className="mt-4 flex justify-center gap-1.5">
            <span className="size-1.5 rounded-full bg-maroon" />
            <span className="size-1.5 rounded-full bg-line" />
            <span className="size-1.5 rounded-full bg-line" />
          </div>
        </div>
      </div>
    </div>
  );
}

const slides = [
  {
    icon: Megaphone,
    ring: "bg-maroon-soft text-maroon",
    tKey: "onboard1t" as const,
    dKey: "onboard1d" as const,
    enKicker: "YOUR VOICE MATTERS",
  },
  {
    icon: TrendingUp,
    ring: "bg-warn-soft text-warn",
    tKey: "onboard2t" as const,
    dKey: "onboard2d" as const,
    enKicker: "TRACK PROGRESS",
  },
  {
    icon: Check,
    ring: "bg-ok-soft text-ok",
    tKey: "onboard3t" as const,
    dKey: "onboard3d" as const,
    enKicker: "INSTANT NOTIFICATIONS",
  },
];

export function Onboard() {
  const lang = useApp((s) => s.settings.lang);
  const step = useApp((s) => s.onboardStep);
  const setStep = useApp((s) => s.setOnboardStep);
  const slide = slides[step] ?? slides[0];
  const Icon = slide.icon;
  const last = step === slides.length - 1;

  return (
    <div className="flex h-full flex-col bg-cream px-6 pb-8 pt-5">
      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-muted"
          onClick={() => {
            const live = useApp.getState();
            const phone = live.pendingPhone.length === 10 ? live.pendingPhone : "9876543210";
            live.loginCitizen(phone);
          }}
        >
          {t(lang, "skip")}
        </button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className={`flex size-36 items-center justify-center rounded-full ${slide.ring}`}>
          <Icon className="size-12" strokeWidth={1.5} />
        </div>
        <h2 className="mt-10 font-display text-3xl tracking-tight">{t(lang, slide.tKey)}</h2>
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
          {slide.enKicker}
        </p>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{t(lang, slide.dKey)}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep(Math.max(0, step - 1))}
          className="flex size-12 items-center justify-center rounded-xl border border-line disabled:opacity-30"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            if (!last) {
              setStep(step + 1);
              return;
            }
            const live = useApp.getState();
            const phone = live.pendingPhone.length === 10 ? live.pendingPhone : "9876543210";
            live.loginCitizen(phone);
          }}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-ink text-paper"
        >
          {last ? t(lang, "start") : t(lang, "next")}
          <ArrowRight className="size-4" />
        </button>
      </div>
      <div className="mt-4 flex justify-center gap-1.5">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full ${i === step ? "w-6 bg-maroon" : "w-1.5 bg-line"} ${i === 1 && step !== 1 ? "bg-gold/40" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

export function Login() {
  const lang = useApp((s) => s.settings.lang);
  const ac = useAc();
  const phone = useApp((s) => s.pendingPhone);
  const setPhone = useApp((s) => s.setPendingPhone);
  const setScreen = useApp((s) => s.setCitizenScreen);

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-cream">
      <div className="flex items-center justify-between px-5 pt-5">
        <img src="/brand/logo.svg" alt="" className="size-8" />
        <span className="rounded-full bg-maroon px-3 py-1 text-[11px] font-medium text-paper">
          {ac.app}
        </span>
      </div>
      <div className="flex items-center gap-3 px-6 pt-10">
        <div className="flex -space-x-2">
          {LEADERS.map((l) => (
            <img
              key={l.photo}
              src={l.photo}
              alt=""
              className="size-9 rounded-full object-cover ring-2 ring-cream"
            />
          ))}
        </div>
        <p className="text-xs text-muted">{t(lang, "partyLeadership")}</p>
      </div>
      <div className="px-6 pt-8">
        <p className="text-sm font-medium text-maroon">{t(lang, "hello")}</p>
        <h1 className="mt-1 font-display text-4xl tracking-tight">{t(lang, "signIn")}</h1>
        <p className="mt-2 text-sm text-muted">{t(lang, "signInHint")}</p>
        <form
          className="mt-8 flex items-center gap-2 rounded-full bg-paper-2 p-1.5"
          onSubmit={(e) => {
            e.preventDefault();
            if (phone.length === 10) setScreen("otp");
          }}
        >
          <span className="pl-4 text-sm text-muted">+91</span>
          <input
            inputMode="numeric"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="98765 43210"
            className="h-12 flex-1 bg-transparent text-base outline-none"
            aria-label="Mobile number"
          />
          <button
            type="submit"
            disabled={phone.length !== 10}
            className="flex size-12 items-center justify-center rounded-full bg-ink text-paper disabled:opacity-30"
          >
            <ArrowRight className="size-4" />
          </button>
        </form>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
          <Lock className="size-3" /> {t(lang, "secure")}
        </p>
        <p className="mt-2 text-xs text-gold">{t(lang, "demoOtp")}</p>
      </div>
      <div className="mt-auto">
        <div className="h-24 w-full bg-maroon [clip-path:polygon(0_100%,100%_32%,100%_100%)]" />
      </div>
    </div>
  );
}

export function Otp() {
  const lang = useApp((s) => s.settings.lang);
  const phone = useApp((s) => s.pendingPhone);
  const login = useApp((s) => s.loginCitizen);
  const setScreen = useApp((s) => s.setCitizenScreen);
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [left, setLeft] = useState(29);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const tmr = window.setInterval(() => setLeft((n) => (n > 0 ? n - 1 : 0)), 1000);
    return () => window.clearInterval(tmr);
  }, []);

  const value = digits.join("");
  const ready = value.length === 6;

  function setAt(i: number, ch: string) {
    const d = ch.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = d;
    setDigits(next);
    if (d && i < 5) refs.current[i + 1]?.focus();
  }

  return (
    <div className="flex h-full flex-col bg-cream px-6 pb-8 pt-5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setScreen("login")}
          className="flex size-10 items-center justify-center rounded-full border border-line"
        >
          <ArrowLeft className="size-4" />
        </button>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Step 2/2</p>
      </div>
      <p className="mt-10 text-sm font-medium text-maroon">OTP சரிபார்ப்பு</p>
      <h1 className="mt-1 font-display text-3xl tracking-tight">{t(lang, "otpTitle")}</h1>
      <p className="mt-2 text-sm text-muted">
        {t(lang, "otpHint")} +91 {phone}
      </p>
      <div className="mt-8 flex justify-between gap-2">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => setAt(i, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
            }}
            onPaste={(e) => {
              const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
              if (!txt) return;
              e.preventDefault();
              const next = ["", "", "", "", "", ""];
              txt.split("").forEach((c, idx) => {
                next[idx] = c;
              });
              setDigits(next);
            }}
            className="h-14 w-11 rounded-xl border border-line bg-paper text-center text-lg font-medium outline-none focus:border-maroon"
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-muted">
        {left > 0 ? `Resend in ${left}s` : t(lang, "resend")}
      </p>
      <button
        type="button"
        disabled={!ready}
        onClick={() => login(phone)}
        className="mt-auto flex h-12 items-center justify-center gap-2 rounded-xl bg-maroon text-paper disabled:opacity-40"
      >
        {t(lang, "verify")}
        <ArrowRight className="size-4" />
      </button>
    </div>
  );
}

export function BellDot() {
  const unread = useApp((s) =>
    notesFor(s.notifications, s.session, s.acId, s.complaints).filter((n) => !n.read).length,
  );
  const setScreen = useApp((s) => s.setCitizenScreen);
  return (
    <button
      type="button"
      onClick={() => setScreen("notifs")}
      className="relative flex size-9 items-center justify-center rounded-full bg-white/10"
      aria-label="Notifications"
    >
      <Bell className="size-4" />
      {unread > 0 ? (
        <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-maroon" />
      ) : null}
    </button>
  );
}
