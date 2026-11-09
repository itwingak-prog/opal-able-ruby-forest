import { S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as UserRound, n as Wrench, w as Landmark } from "../_libs/lucide-react.mjs";
import { d as categoryById, i as useApp, m as officerById, o as cn, p as getAc } from "./router-C-uXpymO.mjs";
import { t } from "./i18n-BWvy1YPa.mjs";
import { a as differenceInHours, i as format, n as parseISO, r as formatDistanceToNow, t as ta } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/layer-link-CpDUGQ46.js
var import_jsx_runtime = require_jsx_runtime();
function useAc() {
	const id = useApp((s) => s.acId);
	return getAc(id);
}
function relTime(iso, ta$1 = false) {
	try {
		return formatDistanceToNow(parseISO(iso), {
			addSuffix: true,
			locale: ta$1 ? ta : void 0
		});
	} catch {
		return iso;
	}
}
function absTime(iso) {
	try {
		return format(parseISO(iso), "d/M/yyyy HH:mm");
	} catch {
		return iso;
	}
}
function slaDeadline(c) {
	const hours = categoryById(c.categoryId)?.slaHours ?? 48;
	return new Date(parseISO(c.createdAt).getTime() + hours * 3600 * 1e3);
}
function slaState(c) {
	if (c.status === "resolved") return "ok";
	const left = differenceInHours(slaDeadline(c), /* @__PURE__ */ new Date());
	if (left < 0) return "overdue";
	if (left <= 6) return "due";
	return "ok";
}
function slaLabel(state, ta) {
	if (state === "overdue") return ta ? "காலந்தவறியது" : "Overdue";
	if (state === "due") return ta ? "காலக்கெடு அருகில்" : "Due soon";
	return ta ? "பாதையில்" : "On track";
}
function statusLabel(s, ta) {
	const map = {
		new: ["New", "புதியது"],
		pending: ["Pending", "நிலுவை"],
		in_progress: ["In Progress", "செயல்பாட்டில்"],
		resolved: ["Resolved", "தீர்க்கப்பட்டது"],
		escalated: ["Escalated", "மேல்முறையீடு"]
	};
	return ta ? map[s][1] : map[s][0];
}
function priorityLabel(p, ta) {
	const map = {
		low: ["Low", "குறைவு"],
		medium: ["Medium", "நடுத்தரம்"],
		high: ["High", "உயர்"],
		critical: ["Critical", "அவசரம்"]
	};
	return ta ? map[p][1] : map[p][0];
}
function channelLabel(ch, ta) {
	const map = {
		web: ["WEB", "வலை"],
		app: ["APP", "செயலி"],
		whatsapp: ["WhatsApp", "வாட்ஸ்அப்"],
		walkin: ["Walk-in", "நேரில்"]
	};
	return ta ? map[ch][1] : map[ch][0];
}
function avgResolutionDays(list) {
	const done = list.filter((c) => c.status === "resolved");
	if (!done.length) return 0;
	return done.reduce((acc, c) => acc + (parseISO(c.updatedAt).getTime() - parseISO(c.createdAt).getTime()) / 36e5, 0) / done.length / 24;
}
function fileToDataUrl(file, max = 960, quality = .72) {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			const canvas = document.createElement("canvas");
			let { width, height } = img;
			if (width > max) {
				height = Math.round(height * max / width);
				width = max;
			}
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				URL.revokeObjectURL(url);
				reject(/* @__PURE__ */ new Error("canvas"));
				return;
			}
			ctx.drawImage(img, 0, 0, width, height);
			URL.revokeObjectURL(url);
			resolve(canvas.toDataURL("image/jpeg", quality));
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("image"));
		};
		img.src = url;
	});
}
var statusClass = {
	new: "bg-warn-soft text-warn",
	pending: "bg-paper-2 text-muted",
	in_progress: "bg-info-soft text-info",
	resolved: "bg-ok-soft text-ok",
	escalated: "bg-danger-soft text-danger"
};
var priClass = {
	low: "text-muted",
	medium: "text-warn",
	high: "text-maroon",
	critical: "text-danger"
};
function StatusPill({ status, ta, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide", statusClass[status], className),
		children: statusLabel(status, ta)
	});
}
function PriorityDot({ priority, ta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("text-[11px] font-medium", priClass[priority]),
		children: priorityLabel(priority, ta)
	});
}
function SlaPill({ state, ta }) {
	if (state === "overdue") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "rounded-full bg-danger-soft px-2 py-0.5 text-[10px] font-medium text-danger",
		children: ta ? "காலந்தவறியது" : "Overdue"
	});
	if (state === "due") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "rounded-full bg-warn-soft px-2 py-0.5 text-[10px] font-medium text-warn",
		children: ta ? "காலக்கெடு அருகில்" : "Due soon"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "rounded-full bg-ok-soft px-2 py-0.5 text-[10px] font-medium text-ok",
		children: ta ? "பாதையில்" : "On Track"
	});
}
function LayerLink({ complaintId, tone = "light" }) {
	const nav = useNavigate();
	const lang = useApp((s) => s.settings.lang);
	const openLayer = useApp((s) => s.openLayer);
	const complaint = useApp((s) => s.complaints.find((c) => c.id === complaintId));
	const role = useApp((s) => s.session?.role);
	const ta = lang === "ta";
	const officer = officerById(complaint?.officerId ?? null);
	const dark = tone === "dark";
	function go(next) {
		openLayer(next, complaintId);
		nav({ to: next === "citizen" ? "/citizen" : "/office" });
	}
	const btn = dark ? "bg-office-3 text-office-fg ring-1 ring-office-line" : "bg-paper text-fg ring-1 ring-line";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `mt-4 rounded-xl p-3 ${dark ? "bg-office-2 ring-1 ring-office-line" : "bg-ink text-paper"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `text-sm font-medium ${dark ? "" : "text-paper"}`,
				children: t(lang, "linkTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: `mt-1 text-xs ${dark ? "text-office-muted" : "text-sand"}`,
				children: [t(lang, "linkHint"), officer ? ` · ${t(lang, "sentTo")} ${ta ? officer.nameTa : officer.name}` : ""]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Jump, {
						label: t(lang, "citizen"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-3.5" }),
						active: role === "citizen",
						className: btn,
						onClick: () => go("citizen")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Jump, {
						label: t(lang, "officer"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-3.5" }),
						active: role === "officer",
						className: btn,
						onClick: () => go("officer")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Jump, {
						label: t(lang, "office"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "size-3.5" }),
						active: role === "office",
						className: btn,
						onClick: () => go("office")
					})
				]
			})
		]
	});
}
function Jump({ label, icon, active, className, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: `flex min-h-11 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[11px] ${className} ${active ? "ring-maroon" : ""}`,
		children: [icon, label]
	});
}
//#endregion
export { absTime as a, fileToDataUrl as c, slaState as d, useAc as f, StatusPill as i, relTime as l, PriorityDot as n, avgResolutionDays as o, SlaPill as r, channelLabel as s, LayerLink as t, slaLabel as u };
