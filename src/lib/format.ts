import { formatDistanceToNow, format, differenceInHours, parseISO } from "date-fns";
import { ta as taLocale } from "date-fns/locale";
import type { Complaint, ComplaintStatus, Priority } from "./types";
import { categoryById } from "./catalog";

export function relTime(iso: string, ta = false) {
  try {
    return formatDistanceToNow(parseISO(iso), {
      addSuffix: true,
      locale: ta ? taLocale : undefined,
    });
  } catch {
    return iso;
  }
}

export function absTime(iso: string) {
  try {
    return format(parseISO(iso), "d/M/yyyy HH:mm");
  } catch {
    return iso;
  }
}

export function slaDeadline(c: Complaint) {
  const hours = categoryById(c.categoryId)?.slaHours ?? 48;
  return new Date(parseISO(c.createdAt).getTime() + hours * 3600 * 1000);
}

export function slaState(c: Complaint): "ok" | "due" | "overdue" {
  if (c.status === "resolved") return "ok";
  const left = differenceInHours(slaDeadline(c), new Date());
  if (left < 0) return "overdue";
  if (left <= 6) return "due";
  return "ok";
}

export function slaLabel(state: "ok" | "due" | "overdue", ta: boolean) {
  if (state === "overdue") return ta ? "காலந்தவறியது" : "Overdue";
  if (state === "due") return ta ? "காலக்கெடு அருகில்" : "Due soon";
  return ta ? "பாதையில்" : "On track";
}

export function statusLabel(s: ComplaintStatus, ta: boolean) {
  const map: Record<ComplaintStatus, [string, string]> = {
    new: ["New", "புதியது"],
    pending: ["Pending", "நிலுவை"],
    in_progress: ["In Progress", "செயல்பாட்டில்"],
    resolved: ["Resolved", "தீர்க்கப்பட்டது"],
    escalated: ["Escalated", "மேல்முறையீடு"],
  };
  return ta ? map[s][1] : map[s][0];
}

export function priorityLabel(p: Priority, ta: boolean) {
  const map: Record<Priority, [string, string]> = {
    low: ["Low", "குறைவு"],
    medium: ["Medium", "நடுத்தரம்"],
    high: ["High", "உயர்"],
    critical: ["Critical", "அவசரம்"],
  };
  return ta ? map[p][1] : map[p][0];
}

export function channelLabel(ch: Complaint["channel"], ta: boolean) {
  const map = {
    web: ["WEB", "வலை"],
    app: ["APP", "செயலி"],
    whatsapp: ["WhatsApp", "வாட்ஸ்அப்"],
    walkin: ["Walk-in", "நேரில்"],
  };
  return ta ? map[ch][1] : map[ch][0];
}

export function avgResolutionDays(list: Complaint[]) {
  const done = list.filter((c) => c.status === "resolved");
  if (!done.length) return 0;
  const hours =
    done.reduce(
      (acc, c) =>
        acc + (parseISO(c.updatedAt).getTime() - parseISO(c.createdAt).getTime()) / 36e5,
      0,
    ) / done.length;
  return hours / 24;
}
