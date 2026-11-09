import type { AcId, Category, Department, Officer, Ward } from "./types";

export const MLA = {
  name: "Anitha R. Radhakrishnan",
  title: "Hon'ble MLA",
  titleTa: "மாண்புமிகு சட்டமன்ற உறுப்பினர்",
  constituency: "Tiruchendur Constituency",
  constituencyTa: "திருச்செந்தூர் தொகுதி",
  ac: "AC-215",
  district: "Thoothukudi",
  districtTa: "தூத்துக்குடி",
  elected: "2021",
  office: "MLA Office, Sea Shore Road, Tiruchendur — 628215",
  officeTa: "சட்டமன்ற உறுப்பினர் அலுவலகம், கடற்கரை சாலை, திருச்செந்தூர் — 628215",
  hours: "Mon – Sat, 10:00 AM – 5:00 PM",
  hoursTa: "திங்கள் – சனி, காலை 10:00 – மாலை 5:00",
  photo: "/brand/logo.svg",
};

export const DEPARTMENTS: Department[] = [
  { id: "roads", name: "Roads & Transport", nameTa: "சாலைகள் மற்றும் போக்குவரத்து" },
  { id: "lighting", name: "Street Lighting", nameTa: "தெரு விளக்கு" },
  { id: "water", name: "Water Supply", nameTa: "குடிநீர் வழங்கல்" },
  { id: "waste", name: "Solid Waste", nameTa: "திடக்கழிவு" },
  { id: "power", name: "Electricity", nameTa: "மின்சாரம்" },
  { id: "drain", name: "Drainage", nameTa: "வடிகால்" },
  { id: "health", name: "Health", nameTa: "சுகாதாரம்" },
  { id: "edu", name: "Education", nameTa: "கல்வி" },
];

export const CATEGORIES: Category[] = [
  {
    id: "pothole",
    name: "Pothole / Road Damage",
    nameTa: "சாலைக் குழி / சேதம்",
    departmentId: "roads",
    slaHours: 48,
    defaultPriority: "high",
  },
  {
    id: "streetlight",
    name: "Streetlight Not Working",
    nameTa: "தெரு விளக்கு எரிவதில்லை",
    departmentId: "lighting",
    slaHours: 24,
    defaultPriority: "medium",
  },
  {
    id: "water",
    name: "Water Supply Disruption",
    nameTa: "குடிநீர் பாதிப்பு",
    departmentId: "water",
    slaHours: 24,
    defaultPriority: "high",
  },
  {
    id: "garbage",
    name: "Garbage Not Collected",
    nameTa: "குப்பை அகற்றப்படவில்லை",
    departmentId: "waste",
    slaHours: 48,
    defaultPriority: "medium",
  },
  {
    id: "power",
    name: "Power Outage",
    nameTa: "மின்சாரம் தடை",
    departmentId: "power",
    slaHours: 12,
    defaultPriority: "critical",
  },
  {
    id: "drainage",
    name: "Drainage Blockage",
    nameTa: "வடிகால் அடைப்பு",
    departmentId: "drain",
    slaHours: 24,
    defaultPriority: "high",
  },
  {
    id: "hospital",
    name: "Hospital Service Issue",
    nameTa: "மருத்துவமனை சேவை பிரச்சினை",
    departmentId: "health",
    slaHours: 24,
    defaultPriority: "high",
  },
  {
    id: "school",
    name: "School Infrastructure",
    nameTa: "பள்ளி உள்கட்டமைப்பு",
    departmentId: "edu",
    slaHours: 72,
    defaultPriority: "medium",
  },
];

export const WARDS: Ward[] = [
  { id: "town", name: "Tiruchendur Town", nameTa: "திருச்செந்தூர் நகரம்", lat: 8.496, lng: 78.12, mx: 58, my: 62 },
  { id: "meigna", name: "Meignanapuram", nameTa: "மெய்ஞானபுரம்", lat: 8.512, lng: 78.063, mx: 36, my: 54 },
  { id: "kayal", name: "Kayalpattinam", nameTa: "காயல்பட்டினம்", lat: 8.568, lng: 78.12, mx: 58, my: 38 },
  { id: "udangudi", name: "Udangudi", nameTa: "உடன்குடி", lat: 8.429, lng: 78.03, mx: 28, my: 74 },
  { id: "arumuganeri", name: "Arumuganeri", nameTa: "ஆறுமுகனேரி", lat: 8.568, lng: 78.092, mx: 48, my: 40 },
  { id: "manapad", name: "Manapad", nameTa: "மணப்பாடு", lat: 8.374, lng: 78.065, mx: 34, my: 86 },
  { id: "kula", name: "Kulasekarapatnam", nameTa: "குலசேகரப்பட்டினம்", lat: 8.4, lng: 78.053, mx: 30, my: 80 },
  { id: "author", name: "Author", nameTa: "ஆத்தூர்", lat: 8.62, lng: 78.075, mx: 42, my: 24 },
  { id: "vira", name: "Virapandianpattinam", nameTa: "வீரபாண்டியன்பட்டினம்", lat: 8.535, lng: 78.115, mx: 54, my: 48 },
  { id: "amali", name: "Amalinagar", nameTa: "அமலிநகர்", lat: 8.482, lng: 78.108, mx: 52, my: 68 },
];

export const OFFICERS: Officer[] = [
  { id: "antony", name: "Antony Raj", nameTa: "ஆண்டனி ராஜ்", phone: "9443311201", departmentId: "roads", wardIds: ["town", "meigna", "vira"], initials: "AR" },
  { id: "meena", name: "Meena Selvam", nameTa: "மீனா செல்வம்", phone: "9443311202", departmentId: "water", wardIds: ["town", "kayal", "amali"], initials: "MS" },
  { id: "karthik", name: "Karthik Pandian", nameTa: "கார்த்திக் பாண்டியன்", phone: "9443311203", departmentId: "lighting", wardIds: ["town", "meigna", "arumuganeri"], initials: "KP" },
  { id: "lakshmi", name: "Lakshmi Bai", nameTa: "லட்சுமி பாய்", phone: "9443311204", departmentId: "waste", wardIds: ["manapad", "kula", "kayal"], initials: "LB" },
  { id: "ismail", name: "Mohamed Ismail", nameTa: "முகமது இஸ்மாயில்", phone: "9443311205", departmentId: "drain", wardIds: ["kayal", "udangudi", "vira"], initials: "MI" },
  { id: "priya", name: "Priya Natarajan", nameTa: "பிரியா நடராஜன்", phone: "9443311206", departmentId: "health", wardIds: ["town", "author", "udangudi"], initials: "PN" },
  { id: "suresh", name: "Suresh Kumar", nameTa: "சுரேஷ் குமார்", phone: "9443311207", departmentId: "edu", wardIds: ["town", "meigna", "author"], initials: "SK" },
  { id: "ramesh", name: "Ramesh Kumar", nameTa: "ரமேஷ் குமார்", phone: "9443311208", departmentId: "power", wardIds: ["udangudi", "kula", "amali"], initials: "RK" },
];

export const DEMO_ACCOUNTS = [
  { role: "citizen" as const, name: "Ramesh Kumar", phone: "9876543210", hint: "Any 6-digit OTP" },
  { role: "officer" as const, name: "Antony Raj", phone: "9443311201", officerId: "antony", hint: "Field officer" },
  { role: "office" as const, name: "MLA Desk", phone: "04639123456", hint: "Office / MLA team" },
];

export const ANNOUNCEMENTS = [
  {
    id: "grievance",
    title: "Grievance meeting",
    titleTa: "குறைதீர் கூட்டம்",
    detail: "MLA office, Sea Shore Road · 10 AM",
    detailTa: "கடற்கரை சாலை அலுவலகம் · காலை 10",
    when: "From 6/9",
    tone: "sky" as const,
  },
  {
    id: "fish",
    title: "Fishing advisory",
    titleTa: "மீன் பிடி எச்சரிக்கை",
    detail: "Manapad & Kayalpattinam coast · stay ashore today",
    detailTa: "மணப்பாடு · காயல்பட்டினம் கரை · இன்று கரைசேரவும்",
    when: "From 8/9",
    tone: "amber" as const,
  },
  {
    id: "camp",
    title: "Health camp",
    titleTa: "மருத்துவ முகாம்",
    detail: "GH Tiruchendur · free checkup",
    detailTa: "அரசு மருத்துவமனை திருச்செந்தூர் · இலவச பரிசோதனை",
    when: "From 12/9",
    tone: "rose" as const,
  },
];

export const FAQ = [
  {
    q: "How do I track my complaint?",
    qTa: "புகாரை எப்படி கண்காணிப்பது?",
    a: "Open My Complaints, tap the item, and follow the live status timeline. You also get a message at every step.",
    aTa: "என் புகார்கள் என்பதை திறந்து புகாரை தொட்டு நேரலை காலவரிசையை பாருங்கள். ஒவ்வொரு படியிலும் செய்தி வரும்.",
  },
  {
    q: "Do I need an account?",
    qTa: "கணக்கு தேவையா?",
    a: "Just your mobile number. An OTP signs you in. WhatsApp intake does not need the app at all.",
    aTa: "அலைபேசி எண் போதும். OTP மூலம் உள்நுழையலாம். வாட்ஸ்அப் வழியில் செயலி தேவையில்லை.",
  },
  {
    q: "What is an SLA?",
    qTa: "SLA என்றால் என்ன?",
    a: "Each category has a deadline (12–72 hours). If work slips, the office can escalate it.",
    aTa: "ஒவ்வொரு வகைக்கும் காலக்கெடு உண்டு (12–72 மணி). தாமதமானால் அலுவலகம் மேல்முறையீடு செய்யும்.",
  },
  {
    q: "Can I send a photo?",
    qTa: "புகைப்படம் அனுப்பலாமா?",
    a: "Yes — a photo and your location help the officer reach the exact spot.",
    aTa: "ஆம் — புகைப்படமும் இருப்பிடமும் அலுவலர் சரியான இடத்தை அடைய உதவும்.",
  },
];

export const LEADERS = [
  { name: "Desk", photo: "/brand/logo.svg" },
  { name: "Coast", photo: "/brand/weather-sun.jpg" },
  { name: "Mark", photo: "/brand/logo.svg" },
];

export type Desk = {
  id: AcId;
  app: string;
  appTa: string;
  code: string;
  place: string;
  placeTa: string;
  deskPhone: string;
  mla: typeof MLA;
  wards: Ward[];
  officers: Officer[];
  announcements: typeof ANNOUNCEMENTS;
};

export const CONSTITUENCIES: Record<AcId, Desk> = {
  tcr: {
    id: "tcr",
    app: "Namma TCR",
    appTa: "நம்ம TCR",
    code: "TCR",
    place: "Tiruchendur",
    placeTa: "திருச்செந்தூர்",
    deskPhone: "04639123456",
    mla: MLA,
    wards: WARDS,
    officers: OFFICERS,
    announcements: ANNOUNCEMENTS,
  },
};

export function getAc(id: AcId = "tcr"): Desk {
  return CONSTITUENCIES[id];
}

export function categoryById(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}
export function wardById(id: string) {
  return WARDS.find((w) => w.id === id);
}
export function deptById(id: string) {
  return DEPARTMENTS.find((d) => d.id === id);
}
export function officerById(id: string | null) {
  return OFFICERS.find((o) => o.id === id);
}
export function officerForCategory(categoryId: string, wardId: string, acId: AcId = "tcr") {
  const officers = getAc(acId).officers;
  const cat = categoryById(categoryId);
  if (!cat) return officers[0];
  const match = officers.find(
    (o) => o.departmentId === cat.departmentId && o.wardIds.includes(wardId),
  );
  return match ?? officers.find((o) => o.departmentId === cat.departmentId) ?? officers[0];
}

export function complaintCode(seq: number, code = "TCR") {
  return `CMP-2026-${code}-${String(seq).padStart(3, "0")}`;
}
