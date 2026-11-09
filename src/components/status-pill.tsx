import { cn } from "@/lib/utils";
import type { ComplaintStatus, Priority } from "@/lib/types";
import { statusLabel, priorityLabel } from "@/lib/format";

const statusClass: Record<ComplaintStatus, string> = {
  new: "bg-warn-soft text-warn",
  pending: "bg-paper-2 text-muted",
  in_progress: "bg-info-soft text-info",
  resolved: "bg-ok-soft text-ok",
  escalated: "bg-danger-soft text-danger",
};

const priClass: Record<Priority, string> = {
  low: "text-muted",
  medium: "text-warn",
  high: "text-maroon",
  critical: "text-danger",
};

export function StatusPill({
  status,
  ta,
  className,
}: {
  status: ComplaintStatus;
  ta: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide",
        statusClass[status],
        className,
      )}
    >
      {statusLabel(status, ta)}
    </span>
  );
}

export function PriorityDot({ priority, ta }: { priority: Priority; ta: boolean }) {
  return (
    <span className={cn("text-[11px] font-medium", priClass[priority])}>
      {priorityLabel(priority, ta)}
    </span>
  );
}

export function SlaPill({ state, ta }: { state: "ok" | "due" | "overdue"; ta: boolean }) {
  if (state === "overdue") {
    return (
      <span className="rounded-full bg-danger-soft px-2 py-0.5 text-[10px] font-medium text-danger">
        {ta ? "காலந்தவறியது" : "Overdue"}
      </span>
    );
  }
  if (state === "due") {
    return (
      <span className="rounded-full bg-warn-soft px-2 py-0.5 text-[10px] font-medium text-warn">
        {ta ? "காலக்கெடு அருகில்" : "Due soon"}
      </span>
    );
  }
  return (
    <span className="rounded-full bg-ok-soft px-2 py-0.5 text-[10px] font-medium text-ok">
      {ta ? "பாதையில்" : "On Track"}
    </span>
  );
}
