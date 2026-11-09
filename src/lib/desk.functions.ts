import { createServerFn } from "@tanstack/react-start";
import type { Complaint, Role } from "@/lib/types";

/** Complaints stay on the phone. There is no account sign-in. */
export const loadDesk = createServerFn({ method: "GET" }).handler(async () => {
  return { role: null as Role | null, complaints: [] as Complaint[] };
});

export const setDeskRole = createServerFn({ method: "POST" })
  .validator((input: { role: Role }) => input)
  .handler(async () => ({ ok: true as const }));

export const upsertComplaint = createServerFn({ method: "POST" })
  .validator((input: Complaint) => input)
  .handler(async () => ({ ok: true as const }));
