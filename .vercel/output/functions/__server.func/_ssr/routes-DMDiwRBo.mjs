import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as Building2, a as UserRound, n as Wrench, w as Landmark } from "../_libs/lucide-react.mjs";
import { i as useApp } from "./router-C-uXpymO.mjs";
import { t } from "./i18n-BWvy1YPa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DMDiwRBo.js
var import_jsx_runtime = require_jsx_runtime();
function Landing() {
	const lang = useApp((s) => s.settings.lang);
	const setLang = useApp((s) => s.setLang);
	const enterDesk = useApp((s) => s.enterDesk);
	const ta = lang === "ta";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-hidden bg-ink text-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "maroon-blob pointer-events-none absolute -top-32 -right-24 size-[420px] rounded-full opacity-90" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "maroon-blob pointer-events-none absolute -bottom-40 -left-28 size-[340px] rounded-full opacity-80" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 flex items-center justify-between px-6 py-5 md:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/brand/logo.svg",
						alt: "",
						className: "size-9 rounded-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium uppercase tracking-[0.28em] text-gold",
						children: ta ? "திருச்செந்தூர் மட்டும்" : "Tiruchendur only"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-sand",
						children: "Namma TCR"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setLang(ta ? "en" : "ta"),
						className: "rounded-full border border-white/15 px-3 py-1.5 text-xs text-sand",
						children: ta ? "English" : "தமிழ்"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative z-10 mx-auto max-w-5xl px-6 pb-16 pt-6 md:px-10 md:pt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.32em] text-gold",
						children: ta ? "ஒரு குரல், உடனடி பதில்" : "A citizen's voice, answered in real time"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-4 max-w-3xl font-display text-[2.4rem] leading-[1.08] tracking-tight md:text-6xl",
						children: [
							"Namma TCR",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							ta ? "திருச்செந்தூர்" : "Tiruchendur"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-xl text-base text-sand/90 md:text-lg",
						children: ta ? "AC-215 திருச்செந்தூர் தொகுதிக்கு மட்டும். பொதுமக்கள், அலுவலர், அலுவலகம் — ஒரே தளம்." : "Only AC-215 Tiruchendur. Citizens, officers and the office share one desk."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 grid gap-4 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleCard, {
								to: "/citizen",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-6" }),
								title: t(lang, "citizen"),
								body: t(lang, "citizenBlurb"),
								cta: t(lang, "enterCitizen"),
								onClick: () => enterDesk("tcr", "citizen")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleCard, {
								to: "/office",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-6" }),
								title: t(lang, "officer"),
								body: t(lang, "officerBlurb"),
								cta: t(lang, "enterOfficer"),
								onClick: () => enterDesk("tcr", "officer")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleCard, {
								to: "/office",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "size-6" }),
								title: t(lang, "office"),
								body: t(lang, "officeBlurb"),
								cta: t(lang, "enterOffice"),
								onClick: () => enterDesk("tcr", "office")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex items-center justify-center rounded-full bg-black px-5 py-3 text-center text-sm text-paper",
						children: t(lang, "flow")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-sand/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3.5" }),
							"AC-215 · ",
							ta ? "திருச்செந்தூர் தொகுதி" : "Tiruchendur Constituency"
						]
					})
				]
			})
		]
	});
}
function RoleCard({ to, icon, title, body, cta, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		onClick,
		className: "group flex flex-col rounded-xl bg-paper p-6 text-left text-fg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-14 items-center justify-center rounded-full bg-maroon text-paper",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-5 font-display text-2xl tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 flex-1 text-sm leading-relaxed text-muted",
				children: body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-6 inline-flex text-sm font-medium text-maroon group-hover:underline",
				children: [cta, " →"]
			})
		]
	});
}
//#endregion
export { Landing as component };
