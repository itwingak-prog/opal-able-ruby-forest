import type { ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Landmark, UserRound, Wrench } from "lucide-react";
import { officerById } from "@/lib/catalog";
import { t } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import type { Role } from "@/lib/types";

export function LayerLink({ complaintId, tone = "light" }: { complaintId: string; tone?: "light" | "dark" }) {
  const nav = useNavigate();
  const lang = useApp((s) => s.settings.lang);
  const openLayer = useApp((s) => s.openLayer);
  const complaint = useApp((s) => s.complaints.find((c) => c.id === complaintId));
  const role = useApp((s) => s.session?.role);
  const ta = lang === "ta";
  const officer = officerById(complaint?.officerId ?? null);
  const dark = tone === "dark";

  function go(next: Role) {
    openLayer(next, complaintId);
    nav({ to: next === "citizen" ? "/citizen" : "/office" });
  }

  const btn = dark
    ? "bg-office-3 text-office-fg ring-1 ring-office-line"
    : "bg-paper text-fg ring-1 ring-line";

  return (
    <div className={`mt-4 rounded-xl p-3 ${dark ? "bg-office-2 ring-1 ring-office-line" : "bg-ink text-paper"}`}>
      <p className={`text-sm font-medium ${dark ? "" : "text-paper"}`}>{t(lang, "linkTitle")}</p>
      <p className={`mt-1 text-xs ${dark ? "text-office-muted" : "text-sand"}`}>
        {t(lang, "linkHint")}
        {officer ? ` · ${t(lang, "sentTo")} ${ta ? officer.nameTa : officer.name}` : ""}
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Jump label={t(lang, "citizen")} icon={<UserRound className="size-3.5" />} active={role === "citizen"} className={btn} onClick={() => go("citizen")} />
        <Jump label={t(lang, "officer")} icon={<Wrench className="size-3.5" />} active={role === "officer"} className={btn} onClick={() => go("officer")} />
        <Jump label={t(lang, "office")} icon={<Landmark className="size-3.5" />} active={role === "office"} className={btn} onClick={() => go("office")} />
      </div>
    </div>
  );
}

function Jump({
  label,
  icon,
  active,
  className,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  active: boolean;
  className: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-11 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[11px] ${className} ${active ? "ring-maroon" : ""}`}
    >
      {icon}
      {label}
    </button>
  );
}
