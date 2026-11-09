export type Role = "citizen" | "officer" | "office";
export type AcId = "tcr";
export type Lang = "en" | "ta";
export type ComplaintStatus =
  | "new"
  | "pending"
  | "in_progress"
  | "resolved"
  | "escalated";
export type Priority = "low" | "medium" | "high" | "critical";
export type Channel = "web" | "app" | "whatsapp" | "walkin";

export interface Session {
  role: Role;
  name: string;
  phone: string;
  officerId?: string;
}

export interface Settings {
  lang: Lang;
  dark: boolean;
  notify: boolean;
}

export interface Ward {
  id: string;
  name: string;
  nameTa: string;
  lat: number;
  lng: number;
  mx: number;
  my: number;
}

export interface Department {
  id: string;
  name: string;
  nameTa: string;
}

export interface Category {
  id: string;
  name: string;
  nameTa: string;
  departmentId: string;
  slaHours: number;
  defaultPriority: Priority;
}

export interface Officer {
  id: string;
  name: string;
  nameTa: string;
  phone: string;
  departmentId: string;
  wardIds: string[];
  initials: string;
}

export interface TimelineEvent {
  id: string;
  at: string;
  status: ComplaintStatus | "registered" | "assigned" | "note";
  title: string;
  titleTa: string;
  detail?: string;
  detailTa?: string;
  actor: string;
}

export interface ChatMessage {
  id: string;
  at: string;
  from: "citizen" | "officer" | "office";
  author: string;
  text: string;
}

export interface Complaint {
  id: string;
  seq: number;
  title: string;
  titleTa: string;
  description: string;
  descriptionTa: string;
  categoryId: string;
  wardId: string;
  departmentId: string;
  officerId: string | null;
  citizenName: string;
  citizenPhone: string;
  status: ComplaintStatus;
  priority: Priority;
  channel: Channel;
  lat: number;
  lng: number;
  photo?: string;
  afterPhoto?: string;
  createdAt: string;
  updatedAt: string;
  timeline: TimelineEvent[];
  messages: ChatMessage[];
  acId: AcId;
}

export interface AppNotification {
  id: string;
  at: string;
  title: string;
  titleTa: string;
  body: string;
  bodyTa: string;
  complaintId?: string;
  audience?: Role;
  forOfficerId?: string;
  forPhone?: string;
  acId?: AcId;
  read: boolean;
}

export interface AiAnalysis {
  at: string;
  text: string;
}
