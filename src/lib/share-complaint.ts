import type { Complaint, Session } from "@/lib/types";

/** Desk identity stays on this phone. No account sign-in. */
export function shareRole(_session: Session) {}

/** Complaints stay on this phone. No account sign-in. */
export function shareComplaint(_complaint: Complaint) {}
