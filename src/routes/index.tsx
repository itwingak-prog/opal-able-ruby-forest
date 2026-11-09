import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Landmark, UserRound, Wrench } from "lucide-react";
import { t } from "@/lib/i18n";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  const lang = useApp((s) => s.settings.lang);
  const setLang = useApp((s) => s.setLang);
  const enterDesk = useApp((s) => s.enterDesk);
  const ta = lang === "ta";

  return (
    <div className="relative min-h-dvh overflow-hidden bg-ink text-paper">
      <div className="maroon-blob pointer-events-none absolute -top-32 -right-24 size-[420px] rounded-full opacity-90" />
      <div className="maroon-blob pointer-events-none absolute -bottom-40 -left-28 size-[340px] rounded-full opacity-80" />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-3">
          <img src="/brand/logo.svg" alt="" className="size-9 rounded-full" />
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              {ta ? "திருச்செந்தூர் மட்டும்" : "Tiruchendur only"}
            </p>
            <p className="text-sm text-sand">Namma TCR</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLang(ta ? "en" : "ta")}
            className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-sand"
          >
            {ta ? "English" : "தமிழ்"}
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-16 pt-6 md:px-10 md:pt-10">
        <p className="text-xs uppercase tracking-[0.32em] text-gold">
          {ta ? "ஒரு குரல், உடனடி பதில்" : "A citizen's voice, answered in real time"}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-[2.4rem] leading-[1.08] tracking-tight md:text-6xl">
          Namma TCR
          <br />
          {ta ? "திருச்செந்தூர்" : "Tiruchendur"}
        </h1>
        <p className="mt-5 max-w-xl text-base text-sand/90 md:text-lg">
          {ta
            ? "AC-215 திருச்செந்தூர் தொகுதிக்கு மட்டும். பொதுமக்கள், அலுவலர், அலுவலகம் — ஒரே தளம்."
            : "Only AC-215 Tiruchendur. Citizens, officers and the office share one desk."}
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <RoleCard
            to="/citizen"
            icon={<UserRound className="size-6" />}
            title={t(lang, "citizen")}
            body={t(lang, "citizenBlurb")}
            cta={t(lang, "enterCitizen")}
            onClick={() => enterDesk("tcr", "citizen")}
          />
          <RoleCard
            to="/office"
            icon={<Wrench className="size-6" />}
            title={t(lang, "officer")}
            body={t(lang, "officerBlurb")}
            cta={t(lang, "enterOfficer")}
            onClick={() => enterDesk("tcr", "officer")}
          />
          <RoleCard
            to="/office"
            icon={<Landmark className="size-6" />}
            title={t(lang, "office")}
            body={t(lang, "officeBlurb")}
            cta={t(lang, "enterOffice")}
            onClick={() => enterDesk("tcr", "office")}
          />
        </div>

        <div className="mt-8 flex items-center justify-center rounded-full bg-black px-5 py-3 text-center text-sm text-paper">
          {t(lang, "flow")}
        </div>

        <p className="mt-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-sand/60">
          <Building2 className="size-3.5" />
          AC-215 · {ta ? "திருச்செந்தூர் தொகுதி" : "Tiruchendur Constituency"}
        </p>
      </main>
    </div>
  );
}

function RoleCard({
  to,
  icon,
  title,
  body,
  cta,
  onClick,
}: {
  to: "/citizen" | "/office";
  icon: ReactNode;
  title: string;
  body: string;
  cta: string;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="group flex flex-col rounded-xl bg-paper p-6 text-left text-fg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl"
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-maroon text-paper">
        {icon}
      </span>
      <h2 className="mt-5 font-display text-2xl tracking-tight">{title}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{body}</p>
      <span className="mt-6 inline-flex text-sm font-medium text-maroon group-hover:underline">
        {cta} →
      </span>
    </Link>
  );
}