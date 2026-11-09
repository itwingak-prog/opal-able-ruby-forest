import type { AcId, Complaint, ComplaintStatus, TimelineEvent } from "./types";
import {
  categoryById,
  complaintCode,
  getAc,
  officerById,
  officerForCategory,
  wardById,
} from "./catalog";
import { uid } from "./utils";

function daysAgo(days: number, hour = 11, minute = 20) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function ev(
  at: string,
  status: TimelineEvent["status"],
  title: string,
  titleTa: string,
  actor: string,
  detail?: string,
  detailTa?: string,
): TimelineEvent {
  return { id: uid("ev"), at, status, title, titleTa, actor, detail, detailTa };
}

function build(partial: {
  seq: number;
  title: string;
  titleTa: string;
  description: string;
  descriptionTa: string;
  categoryId: string;
  wardId: string;
  status: ComplaintStatus;
  channel: Complaint["channel"];
  citizenName: string;
  citizenPhone: string;
  days: number;
  acId?: AcId;
  officerId?: string;
  photo?: string;
  afterPhoto?: string;
  extra?: TimelineEvent[];
}): Complaint {
  const ac = getAc(partial.acId ?? "tcr");
  const cat = categoryById(partial.categoryId)!;
  const ward = wardById(partial.wardId)!;
  const officer =
    (partial.officerId ? officerById(partial.officerId) : undefined) ??
    officerForCategory(partial.categoryId, partial.wardId, ac.id);
  const createdAt = daysAgo(partial.days, 10, 40);
  const updatedAt = daysAgo(Math.max(0, partial.days - 1), 16, 55);
  const registered: TimelineEvent = ev(
    createdAt,
    "registered",
    "Registered",
    "பதிவு செய்யப்பட்டது",
    partial.citizenName,
    "Complaint submitted",
    "புகார் அளிக்கப்பட்டது",
  );
  const assigned: TimelineEvent = ev(
    daysAgo(partial.days, 11, 5),
    "assigned",
    "Auto-assigned",
    "தானியங்கி ஒதுக்கீடு",
    ac.app,
    officer.name,
    officer.nameTa,
  );
  const timeline = [registered, assigned, ...(partial.extra ?? [])];
  return {
    id: complaintCode(partial.seq, ac.code),
    seq: partial.seq,
    title: partial.title,
    titleTa: partial.titleTa,
    description: partial.description,
    descriptionTa: partial.descriptionTa,
    categoryId: partial.categoryId,
    wardId: partial.wardId,
    departmentId: cat.departmentId,
    officerId: officer.id,
    citizenName: partial.citizenName,
    citizenPhone: partial.citizenPhone,
    status: partial.status,
    priority: cat.defaultPriority,
    channel: partial.channel,
    lat: ward.lat,
    lng: ward.lng,
    photo: partial.photo,
    afterPhoto: partial.afterPhoto,
    createdAt,
    updatedAt,
    timeline,
    messages: [],
    acId: ac.id,
  };
}

const RAMESH = { name: "Ramesh Kumar", phone: "9876543210" };

export function buildSeed(): Complaint[] {
  const c8 = build({
    seq: 8,
    title: "Drainage Blockage",
    titleTa: "வடிகால் அடைப்பு",
    description: "Market drain beside the bus stand is overflowing. Stench and stagnant water.",
    descriptionTa: "பேருந்து நிலையம் அருகில் சந்தை வடிகால் வழிகிறது. துர்நாற்றம் மற்றும் தேங்கும் நீர்.",
    categoryId: "drainage",
    wardId: "kayal",
    status: "pending",
    channel: "whatsapp",
    citizenName: "Fathima Beevi",
    citizenPhone: "9843211098",
    days: 1,
    photo: "/brand/drain-before.jpg",
  });

  const c7 = build({
    seq: 7,
    title: "School Infrastructure",
    titleTa: "பள்ளி உள்கட்டமைப்பு",
    description: "Classroom lights failed and the courtyard concrete has cracked after the rains.",
    descriptionTa: "மின்சாரம் சரியாக இல்லை. மழைக்கு பிறகு முற்ற கான்கிரீட் வெடித்துள்ளது.",
    categoryId: "school",
    wardId: "town",
    status: "in_progress",
    channel: "app",
    citizenName: RAMESH.name,
    citizenPhone: RAMESH.phone,
    days: 2,
    extra: [
      ev(
        daysAgo(1, 16, 55),
        "in_progress",
        "Work order issued",
        "பணி ஆணை வழங்கப்பட்டது",
        "Suresh Kumar",
      ),
    ],
  });
  c7.priority = "critical";

  const c6 = build({
    seq: 6,
    title: "Pothole / Road Damage",
    titleTa: "சாலைக் குழி / சேதம்",
    description: "Deep pothole on the temple-car street. Two-wheelers are skidding after dusk.",
    descriptionTa: "தேர் வீதியில் பெரிய குழி உள்ளது. மாலைக்கு பிறகு வாகனங்கள் சரியவில்லை.",
    categoryId: "pothole",
    wardId: "town",
    status: "in_progress",
    channel: "web",
    citizenName: RAMESH.name,
    citizenPhone: RAMESH.phone,
    days: 3,
    extra: [
      ev(
        daysAgo(1, 9, 10),
        "in_progress",
        "Inspection started",
        "ஆய்வு தொடங்கியது",
        "Antony Raj",
      ),
    ],
  });

  const c5 = build({
    seq: 5,
    title: "Streetlight Not Working",
    titleTa: "தெரு விளக்கு எரிவதில்லை",
    description: "Bus-stand approach is dark after rain. The pole beside the drain is dead.",
    descriptionTa: "பேருந்து நிலையம் அருகில் சாலை இருட்டாக உள்ளது. மழைக்காலத்தில் தண்ணீர் தேங்குகிறது.",
    categoryId: "streetlight",
    wardId: "meigna",
    status: "resolved",
    channel: "web",
    citizenName: RAMESH.name,
    citizenPhone: RAMESH.phone,
    days: 6,
    officerId: "antony",
    extra: [
      ev(daysAgo(4, 11, 0), "in_progress", "Work order issued", "பணி ஆணை வழங்கப்பட்டது", "Antony Raj"),
      ev(
        daysAgo(3, 16, 55),
        "resolved",
        "Resolved",
        "தீர்க்கப்பட்டது",
        "Antony Raj",
        "Light replaced and junction lit.",
        "விளக்கு மாற்றப்பட்டு சந்திப்பு வெளிச்சமானது.",
      ),
    ],
  });

  const c4 = build({
    seq: 4,
    title: "Water Supply Disruption",
    titleTa: "குடிநீர் பாதிப்பு",
    description: "No municipal water for three days. Tanker did not arrive this morning.",
    descriptionTa: "கடந்த மூன்று நாட்களாக குடிநீர் வரவில்லை. இன்று காலை டேங்கர் வரவில்லை.",
    categoryId: "water",
    wardId: "town",
    status: "new",
    channel: "app",
    citizenName: RAMESH.name,
    citizenPhone: RAMESH.phone,
    days: 0,
  });

  const c3 = build({
    seq: 3,
    title: "Garbage Not Collected",
    titleTa: "குப்பை அகற்றப்படவில்லை",
    description: "Bins overflowed near the Manapad fish landing. Stray cattle are tearing bags.",
    descriptionTa: "மணப்பாடு மீன் இறங்குதளம் அருகில் குப்பை தொட்டி நிரம்பி வழிகிறது.",
    categoryId: "garbage",
    wardId: "manapad",
    status: "pending",
    channel: "whatsapp",
    citizenName: "Selvi Murugan",
    citizenPhone: "9092011455",
    days: 2,
  });

  const c2 = build({
    seq: 2,
    title: "Hospital Service Issue",
    titleTa: "மருத்துவமனை சேவை பிரச்சினை",
    description: "Government hospital closed during posted hours. Patients turned away at noon.",
    descriptionTa: "அரசு மருத்துவமனை அறிவிக்கப்பட்ட நேரத்தில் மூடப்பட்டிருந்தது.",
    categoryId: "hospital",
    wardId: "kayal",
    status: "escalated",
    channel: "walkin",
    citizenName: "John Britto",
    citizenPhone: "9488011220",
    days: 5,
    extra: [
      ev(daysAgo(4, 14, 0), "pending", "Acknowledged", "பெறப்பட்டது", "Priya Natarajan"),
      ev(
        daysAgo(1, 10, 0),
        "escalated",
        "Escalated to MLA desk",
        "எம்.எல்.ஏ மேசைக்கு மேல்முறையீடு",
        "MLA Desk",
      ),
    ],
  });

  const c1 = build({
    seq: 1,
    title: "Power Outage",
    titleTa: "மின்சாரம் தடை",
    description: "Udangudi feeder down since dawn. Shops cannot open freezers.",
    descriptionTa: "உடன்குடி மின் இணைப்பு அதிகாலை முதல் துண்டிக்கப்பட்டுள்ளது.",
    categoryId: "power",
    wardId: "udangudi",
    status: "pending",
    channel: "app",
    citizenName: "Kannan Selvam",
    citizenPhone: "9715012399",
    days: 1,
  });
  c1.priority = "critical";

  return [c8, c7, c6, c5, c4, c3, c2, c1];
}
