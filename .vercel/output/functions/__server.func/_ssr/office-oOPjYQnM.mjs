import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, X as require_react, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as getServerFnById, n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { C as LayoutDashboard, I as Building2, L as Bell, O as Clock, _ as Menu, c as Sparkles, f as Search, i as Users, j as CircleCheck, k as ClipboardList, o as TriangleAlert, p as Plus, t as X, x as LogOut, y as Map } from "../_libs/lucide-react.mjs";
import { a as useDeskComplaints, c as CATEGORIES, d as categoryById, f as deptById, h as wardById, i as useApp, l as DEPARTMENTS, m as officerById, r as notesFor } from "./router-C-uXpymO.mjs";
import { t } from "./i18n-BWvy1YPa.mjs";
import { c as fileToDataUrl, d as slaState, f as useAc, i as StatusPill, l as relTime, n as PriorityDot, o as avgResolutionDays, s as channelLabel, t as LayerLink, u as slaLabel } from "./layer-link-CpDUGQ46.mjs";
import { i as ResponsiveContainer, n as Pie, r as Cell, t as PieChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/office-oOPjYQnM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var generateBriefing = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("deecbb1c32efa8ded871434a9c4c14b99c35d95f57badb0fd45d6cfb117eb32a"));
var NAV = [
	{
		id: "dashboard",
		label: "navDashboard",
		icon: LayoutDashboard,
		group: "navOverview"
	},
	{
		id: "heatmap",
		label: "navHeatmap",
		icon: Map,
		group: "navOverview"
	},
	{
		id: "ai",
		label: "navAi",
		icon: Sparkles,
		group: "navOverview"
	},
	{
		id: "all",
		label: "navAll",
		icon: ClipboardList,
		group: "navComplaints"
	},
	{
		id: "queue",
		label: "navQueue",
		icon: Clock,
		group: "navComplaints"
	},
	{
		id: "pending",
		label: "navPending",
		icon: Clock,
		group: "navComplaints"
	},
	{
		id: "escalated",
		label: "navEscalated",
		icon: TriangleAlert,
		group: "navComplaints"
	},
	{
		id: "resolved",
		label: "navResolved",
		icon: CircleCheck,
		group: "navComplaints"
	},
	{
		id: "walkin",
		label: "navWalkin",
		icon: Plus,
		group: "navComplaints"
	},
	{
		id: "officers",
		label: "navOfficers",
		icon: Users,
		group: "navPeople"
	},
	{
		id: "wards",
		label: "navWards",
		icon: Map,
		group: "navMaster"
	},
	{
		id: "departments",
		label: "navDepts",
		icon: Building2,
		group: "navMaster"
	}
];
var GROUPS = [
	"navOverview",
	"navComplaints",
	"navPeople",
	"navMaster"
];
function OfficeApp() {
	const nav = useNavigate();
	const session = useApp((s) => s.session);
	const view = useApp((s) => s.officeView);
	const setView = useApp((s) => s.setOfficeView);
	const logout = useApp((s) => s.logout);
	const complaints = useDeskComplaints();
	const ac = useAc();
	const lang = useApp((s) => s.settings.lang);
	const setLang = useApp((s) => s.setLang);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const loginOffice = useApp((s) => s.loginOffice);
	const unread = useApp((s) => notesFor(s.notifications, s.session, s.acId, s.complaints).filter((n) => !n.read).length);
	const isOfficer = session?.role === "officer";
	const ta = lang === "ta";
	(0, import_react.useEffect)(() => {
		if (session?.role !== "officer" && session?.role !== "office") loginOffice();
	}, [session, loginOffice]);
	const filtered = (0, import_react.useMemo)(() => {
		let list = complaints;
		if (view === "queue" && session?.officerId) list = list.filter((c) => c.officerId === session.officerId);
		if (view === "pending") list = list.filter((c) => c.status === "pending" || c.status === "new");
		if (view === "escalated") list = list.filter((c) => c.status === "escalated");
		if (view === "resolved") list = list.filter((c) => c.status === "resolved");
		if (q.trim()) {
			const hay = q.toLowerCase();
			list = list.filter((c) => `${c.id} ${c.title} ${c.titleTa} ${c.description} ${c.descriptionTa}`.toLowerCase().includes(hay));
		}
		return list;
	}, [
		complaints,
		view,
		session,
		q
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh bg-office text-office-fg",
		lang,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: `fixed inset-y-0 left-0 z-30 w-64 border-r border-office-line bg-office-2 transition md:static ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 px-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/brand/logo.svg",
						alt: "",
						className: "size-9 rounded-full"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: ac.app
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-office-muted",
						children: [
							ta ? ac.mla.constituencyTa : ac.mla.constituency.replace(" Constituency", ""),
							" · ",
							ac.mla.ac
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ml-auto md:hidden",
						onClick: () => setOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "px-2 pb-8",
				children: GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-3 text-[10px] font-medium uppercase tracking-[0.18em] text-office-muted",
						children: t(lang, g)
					}), NAV.filter((n) => n.group === g).map((n) => {
						const Icon = n.icon;
						const active = view === n.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setView(n.id);
								setOpen(false);
							},
							className: `mt-0.5 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm ${active ? "bg-office-3 text-paper" : "text-office-muted hover:bg-office-3/60 hover:text-paper"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), t(lang, n.label)]
						}, n.id);
					})]
				}, g))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-2 border-b border-office-line px-4 py-3 md:gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "md:hidden",
						onClick: () => setOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-sm font-medium",
							children: [
								ta ? ac.mla.constituencyTa : ac.place,
								" (",
								ac.mla.ac,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-office-muted",
							children: [
								isOfficer ? ta ? officerById(session?.officerId ?? null)?.nameTa ?? session?.name : session?.name : t(lang, "mlaDesk"),
								" ",
								"· ",
								t(lang, "live")
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto hidden items-center gap-2 rounded-full bg-office-3 px-3 lg:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5 text-office-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: t(lang, "searchOffice"),
							className: "h-9 w-52 bg-transparent text-sm outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, {
						lang,
						onChange: setLang
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden rounded-full bg-ok/20 px-2 py-0.5 text-[10px] text-ok sm:inline",
						children: t(lang, "live")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative hidden sm:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4 text-office-muted" }), unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -right-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-maroon text-[9px] text-paper",
							children: unread > 9 ? "9" : unread
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-8 items-center justify-center rounded-full bg-maroon text-xs text-paper",
						children: (session?.name ?? "U").slice(0, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hidden rounded-full border border-office-line px-3 py-1.5 text-xs text-office-muted md:inline",
						children: t(lang, "roles")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							logout();
							nav({ to: "/" });
						},
						className: "rounded-full border border-office-line px-3 py-1.5 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-1 inline size-3" }),
							" ",
							t(lang, "logout")
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "min-h-0 flex-1 overflow-y-auto p-4 md:p-6",
				children: [
					view === "dashboard" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {}) : null,
					view === "heatmap" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heatmap, {}) : null,
					view === "ai" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiPanel, {}) : null,
					[
						"all",
						"queue",
						"pending",
						"escalated",
						"resolved"
					].includes(view) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintTable, {
						title: t(lang, NAV.find((n) => n.id === view)?.label ?? "navComplaints"),
						rows: filtered
					}) : null,
					view === "walkin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalkIn, {}) : null,
					view === "officers" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Officers, {}) : null,
					view === "wards" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wards, {}) : null,
					view === "departments" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Depts, {}) : null,
					view === "detail" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficeDetail, {}) : null
				]
			})]
		})]
	});
}
function LangToggle({ lang, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex overflow-hidden rounded-full border border-office-line text-[11px] font-medium",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange("en"),
			className: `px-2.5 py-1.5 ${lang === "en" ? "bg-maroon text-paper" : "text-office-muted hover:text-paper"}`,
			children: "EN"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange("ta"),
			className: `px-2.5 py-1.5 ${lang === "ta" ? "bg-maroon text-paper" : "text-office-muted hover:text-paper"}`,
			children: "தமிழ்"
		})]
	});
}
function Dashboard() {
	const lang = useApp((s) => s.settings.lang);
	const ta = lang === "ta";
	const complaints = useDeskComplaints();
	const total = complaints.length;
	const pending = complaints.filter((c) => c.status === "pending" || c.status === "new").length;
	const progress = complaints.filter((c) => c.status === "in_progress").length;
	const resolved = complaints.filter((c) => c.status === "resolved").length;
	const avg = avgResolutionDays(complaints);
	const pie = [
		{
			name: t(lang, "pending"),
			value: pending,
			color: "#c4a35a"
		},
		{
			name: t(lang, "inProgress"),
			value: progress,
			color: "#3b82f6"
		},
		{
			name: t(lang, "resolved"),
			value: resolved,
			color: "#22c55e"
		},
		{
			name: t(lang, "navEscalated"),
			value: complaints.filter((c) => c.status === "escalated").length,
			color: "#ef4444"
		}
	];
	const setView = useApp((s) => s.setOfficeView);
	const week = complaints.filter((c) => Date.now() - new Date(c.createdAt).getTime() < 6048e5).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: t(lang, "dash")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-office-muted",
				children: t(lang, "dashSub")
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full bg-office-3 px-3 py-1 text-xs text-ok",
				children: t(lang, "liveData")
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: t(lang, "kpiTotal"),
					value: total,
					hint: `+${week} ${t(lang, "thisWeek")}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: t(lang, "pending"),
					value: pending,
					hint: `${pct(pending, total)} ${t(lang, "ofTotal")}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: t(lang, "inProgress"),
					value: progress,
					hint: `${pct(progress, total)} ${t(lang, "ofTotal")}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: t(lang, "resolved"),
					value: resolved,
					hint: `${pct(resolved, total)} ${t(lang, "resRate")}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: t(lang, "kpiAvg"),
					value: `${avg.toFixed(1)} ${t(lang, "days")}`,
					hint: t(lang, "trend")
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 rounded-xl bg-office-2 p-4 ring-1 ring-office-line",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: t(lang, "flowTitle")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap items-center justify-between gap-3",
				children: [
					["flowCitizen", total],
					["flowAi", total],
					["flowAssign", complaints.filter((c) => c.officerId).length],
					["flowOfficer", progress + resolved],
					["flowNotify", resolved],
					["flowMla", total]
				].map(([key, n], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-[88px] flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-10 items-center justify-center rounded-full bg-office-3 text-xs tabular-nums",
							children: n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-center text-[11px] text-office-muted",
							children: t(lang, key)
						}),
						i < 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hidden h-px w-8 bg-office-line lg:block" }) : null
					]
				}, key))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-4 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-office-2 p-4 ring-1 ring-office-line lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: t(lang, "recentComplaints")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] text-ok",
						children: t(lang, "liveFeed")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-[11px] uppercase tracking-wide text-office-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2",
									children: "ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t(lang, "colComplaint") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t(lang, "colChannel") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t(lang, "colWard") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t(lang, "colPriority") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t(lang, "colStatus") })
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: complaints.slice(0, 6).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "cursor-pointer border-t border-office-line/80 hover:bg-office-3/40",
							onClick: () => setView("detail", c.id),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 font-mono text-xs",
									children: c.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: ta ? c.titleTa : c.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-office-muted",
									children: [(ta ? c.descriptionTa : c.description).slice(0, 42), "…"]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "text-xs",
									children: channelLabel(c.channel, ta)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "text-xs",
									children: wardById(c.wardId)?.[ta ? "nameTa" : "name"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityDot, {
									priority: c.priority,
									ta
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
									status: c.status,
									ta
								}) })
							]
						}, c.id)) })]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-office-2 p-4 ring-1 ring-office-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: t(lang, "statusBreakdown")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-52",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: pie,
								dataKey: "value",
								innerRadius: 48,
								outerRadius: 74,
								strokeWidth: 0,
								children: pie.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: p.color }, p.name))
							}) })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1 text-xs text-office-muted",
						children: pie.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-2 rounded-full",
									style: { background: p.color }
								}), p.name]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: p.value
							})]
						}, p.name))
					})
				]
			})]
		})
	] });
}
function Kpi({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-office-2 p-4 ring-1 ring-office-line",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-wide text-office-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-3xl tabular-nums tracking-tight",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] text-office-muted",
				children: hint
			})
		]
	});
}
function pct(n, d) {
	if (!d) return "0%";
	return `${Math.round(n / d * 100)}%`;
}
function ComplaintTable({ title, rows }) {
	const lang = useApp((s) => s.settings.lang);
	const ta = lang === "ta";
	const setView = useApp((s) => s.setOfficeView);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl tracking-tight",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-office-muted",
			children: [
				rows.length,
				" ",
				t(lang, "records")
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 overflow-x-auto rounded-xl bg-office-2 ring-1 ring-office-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "text-[11px] uppercase tracking-wide text-office-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: "ID"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t(lang, "colTitle") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t(lang, "colWard") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t(lang, "colOfficer") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t(lang, "colSla") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t(lang, "colStatus") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t(lang, "colAge") })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "cursor-pointer border-t border-office-line hover:bg-office-3/40",
					onClick: () => setView("detail", c.id),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-mono text-xs",
							children: c.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: ta ? c.titleTa : c.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: wardById(c.wardId)?.[ta ? "nameTa" : "name"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: (ta ? officerById(c.officerId)?.nameTa : officerById(c.officerId)?.name) ?? "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "text-xs",
							children: slaLabel(slaState(c), ta)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
							status: c.status,
							ta
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "text-xs text-office-muted",
							children: relTime(c.createdAt, ta)
						})
					]
				}, c.id)) })]
			})
		})
	] });
}
function OfficeDetail() {
	const lang = useApp((s) => s.settings.lang);
	const ta = lang === "ta";
	const id = useApp((s) => s.activeComplaintId);
	const c = useApp((s) => s.complaints.find((x) => x.id === id));
	const session = useApp((s) => s.session);
	const updateStatus = useApp((s) => s.updateStatus);
	const assignOfficer = useApp((s) => s.assignOfficer);
	const addMessage = useApp((s) => s.addMessage);
	const setView = useApp((s) => s.setOfficeView);
	const [note, setNote] = (0, import_react.useState)("");
	const [reply, setReply] = (0, import_react.useState)("");
	const [proof, setProof] = (0, import_react.useState)();
	const ac = useAc();
	if (!c) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t(lang, "selectComplaint") });
	const actor = session?.name ?? t(lang, "office");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setView("all"),
				className: "text-sm text-office-muted",
				children: ["← ", t(lang, "back")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-office-muted",
						children: c.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl tracking-tight",
						children: ta ? c.titleTa : c.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-office-muted",
						children: ta ? c.descriptionTa : c.description
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
					status: c.status,
					ta
				})]
			}),
			c.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: c.photo,
				alt: "",
				className: "mt-4 h-48 w-full rounded-xl object-cover"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid grid-cols-2 gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						k: t(lang, "citizenLabel"),
						v: `${c.citizenName} · ${c.citizenPhone}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						k: t(lang, "ward"),
						v: wardById(c.wardId)?.[ta ? "nameTa" : "name"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						k: t(lang, "category"),
						v: categoryById(c.categoryId)?.[ta ? "nameTa" : "name"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						k: t(lang, "department"),
						v: deptById(c.departmentId)?.[ta ? "nameTa" : "name"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "mt-4 block text-xs text-office-muted",
				children: t(lang, "assignOfficer")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: c.officerId ?? "",
				onChange: (e) => assignOfficer(c.id, e.target.value, actor),
				className: "mt-1 h-11 w-full rounded-lg bg-office-3 px-3 text-sm",
				children: ac.officers.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: o.id,
					children: [
						ta ? o.nameTa : o.name,
						" · ",
						deptById(o.departmentId)?.[ta ? "nameTa" : "name"]
					]
				}, o.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: note,
				onChange: (e) => setNote(e.target.value),
				placeholder: t(lang, "fieldNote"),
				className: "mt-3 h-20 w-full rounded-lg bg-office-3 p-3 text-sm"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [[
					{
						s: "pending",
						key: "markPending"
					},
					{
						s: "in_progress",
						key: "markProgress"
					},
					{
						s: "resolved",
						key: "markResolved"
					},
					{
						s: "escalated",
						key: "markEscalated"
					}
				].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						updateStatus(c.id, m.s, actor, note || void 0, proof);
						setNote("");
					},
					className: "rounded-full bg-office-3 px-3 py-2 text-xs",
					children: t(lang, m.key)
				}, m.s)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "cursor-pointer rounded-full bg-office-3 px-3 py-2 text-xs",
					children: [proof ? t(lang, "proof") : t(lang, "proofAdd"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "image/*",
						className: "sr-only",
						onChange: (e) => {
							const file = e.target.files?.[0];
							if (file) fileToDataUrl(file).then(setProof);
						}
					})]
				})]
			}),
			c.afterPhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: c.afterPhoto,
				alt: "",
				className: "mt-3 h-40 w-full rounded-xl object-cover"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: t(lang, "thread")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 space-y-2",
						children: [c.messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-office-muted",
							children: t(lang, "chatHint")
						}) : null, c.messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-office-3 px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: m.text }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[10px] text-office-muted",
								children: m.author
							})]
						}, m.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-2 flex gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							if (!reply.trim() || !session) return;
							addMessage(c.id, session.role === "citizen" ? "citizen" : session.role, actor, reply.trim());
							setReply("");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: reply,
							onChange: (e) => setReply(e.target.value),
							placeholder: t(lang, "replyPh"),
							className: "h-11 flex-1 rounded-lg bg-office-3 px-3 text-sm"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "h-11 rounded-lg bg-maroon px-4 text-sm text-paper",
							children: t(lang, "send")
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayerLink, {
				complaintId: c.id,
				tone: "dark"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-6 space-y-3 border-l border-office-line pl-4",
				children: c.timeline.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: ta ? ev.titleTa : ev.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-office-muted",
					children: [
						ev.actor,
						" · ",
						relTime(ev.at, ta)
					]
				})] }, ev.id))
			})
		]
	});
}
function Info({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-office-2 p-3 ring-1 ring-office-line",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] text-office-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: v ?? "—"
		})]
	});
}
function Heatmap() {
	const lang = useApp((s) => s.settings.lang);
	const ta = lang === "ta";
	const complaints = useDeskComplaints();
	const ac = useAc();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl tracking-tight",
			children: t(lang, "navHeatmap")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-office-muted",
			children: t(lang, "heatmapSub")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mt-4 h-[480px] overflow-hidden rounded-xl ring-1 ring-office-line",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/brand/coast-map.jpg",
				alt: t(lang, "mapAlt"),
				className: "h-full w-full object-cover opacity-80"
			}), ac.wards.map((w) => {
				const n = complaints.filter((c) => c.wardId === w.id).length;
				const size = 18 + n * 10;
				const color = n >= 3 ? "#ef4444" : n === 2 ? "#f59e0b" : n === 1 ? "#22c55e" : "#64748b";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80",
					style: {
						left: `${w.mx}%`,
						top: `${w.my}%`,
						width: size,
						height: size,
						background: color
					},
					title: `${ta ? w.nameTa : w.name}: ${n}`
				}, w.id);
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-xs text-office-muted",
			children: t(lang, "heatmapLegend")
		})
	] });
}
function AiPanel() {
	const lang = useApp((s) => s.settings.lang);
	const ta = lang === "ta";
	const complaints = useDeskComplaints();
	const ac = useAc();
	const ai = useApp((s) => s.ai);
	const setAi = useApp((s) => s.setAi);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	const topCat = CATEGORIES.map((cat) => ({
		cat,
		n: complaints.filter((c) => c.categoryId === cat.id).length
	})).sort((a, b) => b.n - a.n)[0];
	const overdue = complaints.filter((c) => slaState(c) === "overdue");
	const open = complaints.filter((c) => c.status !== "resolved").length;
	const wa = complaints.filter((c) => c.channel === "whatsapp").length;
	const focus = ac.wards[0];
	const local = [
		`${t(lang, "aiTop")}: ${topCat ? ta ? topCat.cat.nameTa : topCat.cat.name : "—"} (${topCat?.n ?? 0})`,
		`${t(lang, "aiOpen")}: ${open} / ${complaints.length}`,
		`${t(lang, "aiSla")}: ${overdue.length} ${t(lang, "overdue")}`,
		`${t(lang, "aiWa")}: ${wa}`,
		`${t(lang, "aiAction")}: ${overdue[0]?.id ?? "—"} · ${ta ? focus?.nameTa : focus?.name}`
	];
	async function run() {
		setBusy(true);
		setErr("");
		const summary = complaints.map((c) => `${c.id}|${c.categoryId}|${c.status}|${c.wardId}|${c.channel}`).join("\n");
		const langHint = ta ? "Reply in Tamil (தமிழ்)." : "Reply in English.";
		const res = await generateBriefing({ data: {
			summary: `${ac.app} · ${ac.mla.ac} ${ac.place}\n${langHint}\nCounts ${complaints.length}\n${summary}`,
			lang
		} });
		setBusy(false);
		if (!res.ok) setErr(res.error);
		else setAi(res.text);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: t(lang, "navAi")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-office-muted",
				children: t(lang, "aiSub")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 space-y-2",
				children: local.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-xl bg-office-2 px-4 py-3 text-sm ring-1 ring-office-line",
					children: l
				}, l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => void run(),
				disabled: busy,
				className: "mt-5 flex h-11 items-center gap-2 rounded-xl bg-maroon px-4 text-sm text-paper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), busy ? t(lang, "asking") : t(lang, "genBrief")]
			}),
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-danger",
				children: err
			}) : null,
			ai ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "mt-4 whitespace-pre-wrap rounded-xl bg-office-2 p-4 text-sm leading-relaxed ring-1 ring-office-line",
				children: ai.text
			}) : null
		]
	});
}
function WalkIn() {
	const lang = useApp((s) => s.settings.lang);
	const ta = lang === "ta";
	const submit = useApp((s) => s.submitComplaint);
	const setView = useApp((s) => s.setOfficeView);
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [desc, setDesc] = (0, import_react.useState)("");
	const [categoryId, setCategoryId] = (0, import_react.useState)("pothole");
	const ac = useAc();
	const [wardId, setWardId] = (0, import_react.useState)(ac.wards[0]?.id ?? "town");
	const wardValue = ac.wards.some((w) => w.id === wardId) ? wardId : ac.wards[0].id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: t(lang, "navWalkin")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-office-muted",
				children: t(lang, "walkinSub")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-5 space-y-3",
				onSubmit: (e) => {
					e.preventDefault();
					const c = submit({
						description: desc,
						categoryId,
						wardId: wardValue,
						channel: "walkin",
						citizenName: name || t(lang, "walkinCitizen"),
						citizenPhone: phone
					});
					setView("detail", c.id);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: t(lang, "citizenName"),
						className: "h-11 w-full rounded-lg bg-office-3 px-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: phone,
						onChange: (e) => setPhone(e.target.value),
						placeholder: t(lang, "mobile"),
						className: "h-11 w-full rounded-lg bg-office-3 px-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: desc,
						onChange: (e) => setDesc(e.target.value),
						placeholder: t(lang, "issuePh"),
						className: "h-28 w-full rounded-lg bg-office-3 p-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: categoryId,
						onChange: (e) => setCategoryId(e.target.value),
						className: "h-11 w-full rounded-lg bg-office-3 px-3 text-sm",
						children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: ta ? c.nameTa : c.name
						}, c.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: wardValue,
						onChange: (e) => setWardId(e.target.value),
						className: "h-11 w-full rounded-lg bg-office-3 px-3 text-sm",
						children: ac.wards.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: w.id,
							children: ta ? w.nameTa : w.name
						}, w.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: !desc.trim(),
						className: "h-11 rounded-xl bg-maroon px-5 text-sm text-paper",
						children: t(lang, "register")
					})
				]
			})
		]
	});
}
function Officers() {
	const lang = useApp((s) => s.settings.lang);
	const ta = lang === "ta";
	const complaints = useDeskComplaints();
	const ac = useAc();
	const loginOfficer = useApp((s) => s.loginOfficer);
	const setView = useApp((s) => s.setOfficeView);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl tracking-tight",
		children: t(lang, "navOfficers")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
		children: ac.officers.map((o) => {
			const n = complaints.filter((c) => c.officerId === o.id && c.status !== "resolved").length;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-office-2 p-4 ring-1 ring-office-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-10 items-center justify-center rounded-full bg-maroon text-sm text-paper",
							children: o.initials
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: ta ? o.nameTa : o.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-office-muted",
							children: deptById(o.departmentId)?.[ta ? "nameTa" : "name"]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-office-muted",
						children: [
							n,
							" ",
							t(lang, "openCount"),
							" · ",
							o.phone
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							loginOfficer(o.id);
							setView("queue");
						},
						className: "mt-3 text-xs text-gold",
						children: t(lang, "openAsOfficer")
					})
				]
			}, o.id);
		})
	})] });
}
function Wards() {
	const lang = useApp((s) => s.settings.lang);
	const ta = lang === "ta";
	const complaints = useDeskComplaints();
	const ac = useAc();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl tracking-tight",
		children: t(lang, "navWards")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 overflow-hidden rounded-xl bg-office-2 ring-1 ring-office-line",
		children: ac.wards.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-office-line px-4 py-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ta ? w.nameTa : w.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums text-office-muted",
				children: complaints.filter((c) => c.wardId === w.id).length
			})]
		}, w.id))
	})] });
}
function Depts() {
	const lang = useApp((s) => s.settings.lang);
	const ta = lang === "ta";
	const complaints = useDeskComplaints();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl tracking-tight",
		children: t(lang, "navDepts")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 overflow-hidden rounded-xl bg-office-2 ring-1 ring-office-line",
		children: DEPARTMENTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-office-line px-4 py-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ta ? d.nameTa : d.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums text-office-muted",
				children: complaints.filter((c) => c.departmentId === d.id).length
			})]
		}, d.id))
	})] });
}
var SplitComponent = OfficeApp;
//#endregion
export { SplitComponent as component };
