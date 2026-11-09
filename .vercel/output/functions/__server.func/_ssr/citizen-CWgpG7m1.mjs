import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, X as require_react, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as CircleHelp, D as Cloud, E as Droplets, F as Camera, L as Bell, M as ChevronRight, N as Check, P as ChartColumn, R as ArrowRight, S as Lock, T as House, b as MapPin, d as Settings, f as Search, g as MessageSquare, h as Mic, k as ClipboardList, l as Shield, m as PenLine, p as Plus, r as Wind, s as TrendingUp, t as X, u as Share2, v as Megaphone, z as ArrowLeft } from "../_libs/lucide-react.mjs";
import { a as useDeskComplaints, c as CATEGORIES, d as categoryById, f as deptById, h as wardById, i as useApp, m as officerById, n as mine, o as cn, r as notesFor, s as classifyComplaint, u as FAQ } from "./router-C-uXpymO.mjs";
import { t } from "./i18n-BWvy1YPa.mjs";
import { a as absTime, c as fileToDataUrl, d as slaState, f as useAc, i as StatusPill, l as relTime, r as SlaPill, s as channelLabel, t as LayerLink } from "./layer-link-CpDUGQ46.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/citizen-CWgpG7m1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PhoneShell({ children, dark }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-ink p-0 md:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("relative flex h-dvh w-full max-w-[430px] flex-col overflow-hidden md:h-[844px] md:max-h-[844px] md:rounded-[2rem] md:border md:border-white/10 md:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]", dark ? "bg-ink text-paper" : "bg-cream text-fg"),
			children
		})
	});
}
function Splash() {
	const lang = useApp((s) => s.settings.lang);
	const setScreen = useApp((s) => s.setCitizenScreen);
	const onboarded = useApp((s) => s.onboarded);
	useApp((s) => s.session);
	const ac = useAc();
	const goRef = (0, import_react.useRef)(onboarded);
	goRef.current = onboarded;
	const advance = () => {
		const live = useApp.getState();
		if (live.session?.role === "citizen") {
			setScreen("home");
			return;
		}
		if (live.onboarded || goRef.current) {
			const phone = live.pendingPhone.length === 10 ? live.pendingPhone : "9876543210";
			live.loginCitizen(phone);
			return;
		}
		setScreen("onboard");
	};
	(0, import_react.useEffect)(() => {
		const tmr = window.setTimeout(advance, 1400);
		return () => window.clearTimeout(tmr);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "button",
		tabIndex: 0,
		onClick: advance,
		onKeyDown: (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				advance();
			}
		},
		className: "flex h-full w-full cursor-pointer flex-col bg-cream text-left text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex flex-1 flex-col items-center justify-end bg-maroon-soft pb-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-maroon/15 to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/brand/logo.svg",
				alt: "",
				className: "relative z-[1] size-28"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-[1.1] flex-col items-center px-8 pb-8 pt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/brand/logo.svg",
					alt: "",
					className: "size-10"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[10px] font-medium uppercase tracking-[0.28em] text-muted",
					children: t(lang, "splashHonor")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-center font-display text-[1.7rem] leading-tight tracking-tight",
					children: ac.mla.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-center text-sm text-muted",
					children: [
						ac.mla.constituency,
						" · ",
						ac.mla.ac
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto w-full pt-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold tracking-wide",
							children: ac.app
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: lang === "ta" ? "உங்கள் குரல். எங்கள் பொறுப்பு" : "Your voice. Our duty."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-ink text-sm font-medium text-paper",
							children: t(lang, "continue")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex justify-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-maroon" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-line" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-line" })
							]
						})
					]
				})
			]
		})]
	});
}
var slides = [
	{
		icon: Megaphone,
		ring: "bg-maroon-soft text-maroon",
		tKey: "onboard1t",
		dKey: "onboard1d",
		enKicker: "YOUR VOICE MATTERS"
	},
	{
		icon: TrendingUp,
		ring: "bg-warn-soft text-warn",
		tKey: "onboard2t",
		dKey: "onboard2d",
		enKicker: "TRACK PROGRESS"
	},
	{
		icon: Check,
		ring: "bg-ok-soft text-ok",
		tKey: "onboard3t",
		dKey: "onboard3d",
		enKicker: "INSTANT NOTIFICATIONS"
	}
];
function Onboard() {
	const lang = useApp((s) => s.settings.lang);
	const step = useApp((s) => s.onboardStep);
	const setStep = useApp((s) => s.setOnboardStep);
	const slide = slides[step] ?? slides[0];
	const Icon = slide.icon;
	const last = step === slides.length - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-cream px-6 pb-8 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-sm text-muted",
					onClick: () => {
						const live = useApp.getState();
						const phone = live.pendingPhone.length === 10 ? live.pendingPhone : "9876543210";
						live.loginCitizen(phone);
					},
					children: t(lang, "skip")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center justify-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex size-36 items-center justify-center rounded-full ${slide.ring}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-12",
							strokeWidth: 1.5
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-10 font-display text-3xl tracking-tight",
						children: t(lang, slide.tKey)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[11px] font-medium uppercase tracking-[0.22em] text-muted",
						children: slide.enKicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xs text-sm leading-relaxed text-muted",
						children: t(lang, slide.dKey)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: step === 0,
					onClick: () => setStep(Math.max(0, step - 1)),
					className: "flex size-12 items-center justify-center rounded-xl border border-line disabled:opacity-30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						if (!last) {
							setStep(step + 1);
							return;
						}
						const live = useApp.getState();
						const phone = live.pendingPhone.length === 10 ? live.pendingPhone : "9876543210";
						live.loginCitizen(phone);
					},
					className: "flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-ink text-paper",
					children: [last ? t(lang, "start") : t(lang, "next"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex justify-center gap-1.5",
				children: slides.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1 rounded-full ${i === step ? "w-6 bg-maroon" : "w-1.5 bg-line"} ${i === 1 && step !== 1 ? "bg-gold/40" : ""}` }, i))
			})
		]
	});
}
function BellDot() {
	const unread = useApp((s) => notesFor(s.notifications, s.session, s.acId, s.complaints).filter((n) => !n.read).length);
	const setScreen = useApp((s) => s.setCitizenScreen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setScreen("notifs"),
		className: "relative flex size-9 items-center justify-center rounded-full bg-white/10",
		"aria-label": "Notifications",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-1.5 top-1.5 size-2 rounded-full bg-maroon" }) : null]
	});
}
var FILTERS = [
	{
		id: "all",
		key: "all"
	},
	{
		id: "pending",
		key: "pending"
	},
	{
		id: "in_progress",
		key: "inProgress"
	},
	{
		id: "resolved",
		key: "resolved"
	}
];
function matchesFilter(c, f) {
	if (f === "all") return true;
	if (f === "pending") return c.status === "pending" || c.status === "new" || c.status === "escalated";
	return c.status === f;
}
function ComplaintList() {
	const lang = useApp((s) => s.settings.lang);
	const ta = lang === "ta";
	const session = useApp((s) => s.session);
	const acId = useApp((s) => s.acId);
	const complaints = useDeskComplaints();
	const setScreen = useApp((s) => s.setCitizenScreen);
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const list = mine(complaints, session, acId).filter((c) => {
		if (!matchesFilter(c, filter)) return false;
		if (!q.trim()) return true;
		return `${c.title} ${c.titleTa} ${c.description} ${c.id}`.toLowerCase().includes(q.toLowerCase());
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "flex items-center justify-between px-4 py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl tracking-tight",
					children: t(lang, "myComplaints")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-full bg-paper px-3 ring-1 ring-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: t(lang, "search"),
						className: "h-11 flex-1 bg-transparent text-sm outline-none"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex gap-2 overflow-x-auto pb-1",
					children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFilter(f.id),
						className: `rounded-full px-3 py-1.5 text-xs font-medium ${filter === f.id ? "bg-ink text-paper" : "bg-paper text-muted ring-1 ring-line"}`,
						children: t(lang, f.key)
					}, f.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "phone-scroll mt-3 flex-1 space-y-2 overflow-y-auto px-4 pb-24",
				children: list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pt-10 text-center text-sm text-muted",
					children: t(lang, "empty")
				}) : list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setScreen("detail", c.id),
					className: "w-full rounded-xl bg-paper p-3 text-left ring-1 ring-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: ta ? c.titleTa : c.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								status: c.status,
								ta
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-xs text-muted",
							children: ta ? c.descriptionTa : c.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center gap-2 text-[11px] text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }),
								wardById(c.wardId)?.[ta ? "nameTa" : "name"],
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaPill, {
									state: slaState(c),
									ta
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-auto",
									children: relTime(c.createdAt)
								})
							]
						})
					]
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setScreen("submit"),
				className: "absolute bottom-20 right-5 flex h-12 items-center gap-2 rounded-full bg-maroon px-4 text-sm font-medium text-paper shadow-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
					" ",
					t(lang, "submit")
				]
			})
		]
	});
}
function ComplaintDetail() {
	const lang = useApp((s) => s.settings.lang);
	const ta = lang === "ta";
	const id = useApp((s) => s.activeComplaintId);
	const complaint = useApp((s) => s.complaints.find((c) => c.id === id));
	const setScreen = useApp((s) => s.setCitizenScreen);
	if (!complaint) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setScreen("complaints"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
		})
	});
	const cat = categoryById(complaint.categoryId);
	const ward = wardById(complaint.wardId);
	const dept = deptById(complaint.departmentId);
	const officer = officerById(complaint.officerId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "phone-scroll flex h-full flex-col overflow-y-auto bg-cream pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setScreen("complaints"),
				className: "flex size-10 items-center justify-center rounded-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "flex size-10 items-center justify-center rounded-full",
				"aria-label": "Share",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl tracking-tight",
						children: ta ? complaint.titleTa : complaint.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
						status: complaint.status,
						ta
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted",
					children: [
						ward?.[ta ? "nameTa" : "name"],
						" · ",
						absTime(complaint.createdAt)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-5 rounded-xl bg-paper p-4 ring-1 ring-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted",
							children: t(lang, "description")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-relaxed",
							children: ta ? complaint.descriptionTa : complaint.description
						}),
						complaint.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: complaint.photo,
							alt: "",
							className: "mt-3 h-36 w-full rounded-lg object-cover"
						}) : null,
						complaint.afterPhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs font-medium text-muted",
							children: t(lang, "proof")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: complaint.afterPhoto,
							alt: "",
							className: "mt-1 h-36 w-full rounded-lg object-cover"
						})] }) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-3 rounded-xl bg-paper p-4 ring-1 ring-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted",
						children: t(lang, "details")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-2 space-y-1.5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
								k: ta ? "புகார் எண்" : "Complaint #",
								v: complaint.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
								k: t(lang, "category"),
								v: ta ? cat?.nameTa : cat?.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
								k: ta ? "துறை" : "Department",
								v: ta ? dept?.nameTa : dept?.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
								k: t(lang, "ward"),
								v: ta ? ward?.nameTa : ward?.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
								k: ta ? "வழி" : "Channel",
								v: channelLabel(complaint.channel, ta)
							})
						]
					})]
				}),
				officer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center justify-between rounded-xl bg-paper p-4 ring-1 ring-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-10 items-center justify-center rounded-full bg-maroon text-sm text-paper",
							children: officer.initials
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: t(lang, "assigned")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: ta ? officer.nameTa : officer.name
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setScreen("chat", complaint.id),
						className: "flex items-center gap-1 rounded-full bg-maroon-soft px-3 py-1.5 text-xs font-medium text-maroon",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3.5" }),
							" ",
							t(lang, "chat")
						]
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: t(lang, "timeline")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 space-y-4 border-l border-line pl-4",
						children: complaint.timeline.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[21px] top-1 size-2.5 rounded-full bg-ok" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: ta ? ev.titleTa : ev.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted",
									children: absTime(ev.at)
								}),
								ev.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: ta ? ev.detailTa : ev.detail
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-muted",
									children: ["— ", ev.actor]
								})
							]
						}, ev.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayerLink, { complaintId: complaint.id })
			]
		})]
	});
}
function Row$1({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-right font-medium",
			children: v ?? "—"
		})]
	});
}
function SubmitComplaint({ voiceSeed = "" }) {
	const lang = useApp((s) => s.settings.lang);
	const setScreen = useApp((s) => s.setCitizenScreen);
	const submit = useApp((s) => s.submitComplaint);
	const ac = useAc();
	const [desc, setDesc] = (0, import_react.useState)(voiceSeed);
	const guess = (0, import_react.useMemo)(() => classifyComplaint(desc), [desc]);
	const [categoryId, setCategoryId] = (0, import_react.useState)(guess.categoryId);
	const [wardId, setWardId] = (0, import_react.useState)(ac.wards[0]?.id ?? "town");
	const wardValue = ac.wards.some((w) => w.id === wardId) ? wardId : ac.wards[0].id;
	const [photo, setPhoto] = (0, import_react.useState)();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(null);
	function onDesc(v) {
		setDesc(v);
		const g = classifyComplaint(v);
		if (g.confidence >= .7) setCategoryId(g.categoryId);
	}
	async function onPhoto(file) {
		if (!file) return;
		setPhoto(await fileToDataUrl(file));
	}
	function onSubmit() {
		if (!desc.trim()) return;
		setBusy(true);
		window.setTimeout(() => {
			const c = submit({
				description: desc.trim(),
				categoryId,
				wardId: wardValue,
				photo,
				channel: "app"
			});
			setBusy(false);
			setDone(c.id);
		}, 900);
	}
	if (done) {
		const filed = useApp.getState().complaints.find((c) => c.id === done);
		const officer = officerById(filed?.officerId ?? null);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "phone-scroll flex h-full flex-col overflow-y-auto bg-cream px-6 py-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: t(lang, "gotNumber")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-3xl tracking-tight",
					children: done
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: t(lang, "trackAlways")
				}),
				officer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm font-medium",
					children: [
						t(lang, "sentTo"),
						" ",
						lang === "ta" ? officer.nameTa : officer.name
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: t(lang, "deskWatching")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayerLink, { complaintId: done }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setScreen("detail", done),
					className: "mt-6 h-12 w-full rounded-xl bg-maroon text-paper",
					children: t(lang, "myComplaints")
				})
			]
		});
	}
	if (busy) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col items-center justify-center bg-cream px-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-12 animate-spin rounded-full border-2 border-line border-t-maroon" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 font-medium",
				children: t(lang, "processing")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: t(lang, "sorted")
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-cream",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center gap-3 px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setScreen("home"),
				className: "flex size-10 items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-medium",
				children: t(lang, "submit")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "phone-scroll flex-1 overflow-y-auto px-5 pb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-xs font-medium",
					children: t(lang, "description")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: desc,
					onChange: (e) => onDesc(e.target.value),
					maxLength: 500,
					placeholder: t(lang, "descPh"),
					className: "mt-2 h-28 w-full resize-none rounded-xl bg-paper p-3 text-sm outline-none ring-1 ring-line"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-right text-[11px] text-muted",
					children: [desc.length, "/500"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-xs font-medium",
					children: [
						t(lang, "category"),
						" & ",
						t(lang, "ward")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: categoryId,
					onChange: (e) => setCategoryId(e.target.value),
					className: "mt-2 h-12 w-full rounded-xl bg-paper px-3 text-sm ring-1 ring-line",
					children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: lang === "ta" ? c.nameTa : c.name
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: wardValue,
					onChange: (e) => setWardId(e.target.value),
					className: "mt-2 h-12 w-full rounded-xl bg-paper px-3 text-sm ring-1 ring-line",
					children: ac.wards.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: w.id,
						children: lang === "ta" ? w.nameTa : w.name
					}, w.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs font-medium",
					children: t(lang, "photo")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-2 flex h-28 cursor-pointer flex-col items-center justify-center rounded-xl bg-paper text-sm text-muted ring-1 ring-line",
					children: [photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: photo,
						alt: "",
						className: "h-full w-full rounded-xl object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1",
						children: t(lang, "addPhoto")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: (e) => void onPhoto(e.target.files?.[0])
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 flex items-center gap-2 rounded-xl bg-ok-soft px-3 py-2 text-xs text-ok",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }),
						" ",
						t(lang, "locationOk"),
						" · 8.631, 77.912"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: !desc.trim(),
					onClick: onSubmit,
					className: "mt-6 h-12 w-full rounded-xl bg-maroon text-paper disabled:opacity-40",
					children: t(lang, "submit")
				})
			]
		})]
	});
}
function VoiceReport() {
	const lang = useApp((s) => s.settings.lang);
	const setScreen = useApp((s) => s.setCitizenScreen);
	const [text, setText] = (0, import_react.useState)("");
	const [listening, setListening] = (0, import_react.useState)(false);
	const sample = "திருச்செந்தூர் பேருந்து நிலையம் அருகில் தெருவிளக்கு எரியவில்லை";
	function listen() {
		const SR = window.webkitSpeechRecognition ?? window.SpeechRecognition;
		if (!SR) {
			setText(sample);
			return;
		}
		const rec = new SR();
		rec.lang = "ta-IN";
		rec.onresult = (e) => {
			setText(e.results[0]?.[0]?.transcript ?? sample);
			setListening(false);
		};
		rec.onerror = () => {
			setText(sample);
			setListening(false);
		};
		setListening(true);
		rec.start();
	}
	if (text) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitComplaint, { voiceSeed: text });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-cream px-6 pt-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setScreen("home"),
			className: "size-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col items-center justify-center text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: listen,
					className: `flex size-28 items-center justify-center rounded-full ${listening ? "bg-maroon text-paper" : "bg-maroon-soft text-maroon"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-10" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 font-display text-2xl",
					children: t(lang, "voiceReport")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xs text-sm text-muted",
					children: t(lang, "speakTa")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setText(sample),
					className: "mt-8 text-sm text-maroon underline-offset-4 hover:underline",
					children: lang === "ta" ? "மாதிரி தமிழ் புகார் பயன்படுத்து" : "Use a sample Tamil report"
				})
			]
		})]
	});
}
function ChatScreen() {
	const lang = useApp((s) => s.settings.lang);
	const session = useApp((s) => s.session);
	const id = useApp((s) => s.activeComplaintId);
	const acId = useApp((s) => s.acId);
	const complaints = useDeskComplaints();
	const addMessage = useApp((s) => s.addMessage);
	const setScreen = useApp((s) => s.setCitizenScreen);
	const mineList = mine(complaints, session, acId);
	const complaint = complaints.find((c) => c.id === id) ?? mineList[0];
	const [text, setText] = (0, import_react.useState)("");
	if (!complaint) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-6 text-sm text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setScreen("home"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6",
			children: t(lang, "empty")
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-3 border-b border-line px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setScreen("detail", complaint.id),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: complaint.id
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: t(lang, "chatHint")
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "phone-scroll flex-1 space-y-2 overflow-y-auto px-4 py-4",
				children: [complaint.messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-sm text-muted",
					children: t(lang, "chatHint")
				}) : null, complaint.messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `max-w-[80%] rounded-xl px-3 py-2 text-sm ${m.from === "citizen" ? "ml-auto bg-maroon text-paper" : "bg-paper ring-1 ring-line"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: m.text }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[10px] opacity-70",
						children: m.author
					})]
				}, m.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex gap-2 border-t border-line p-3",
				onSubmit: (e) => {
					e.preventDefault();
					if (!text.trim()) return;
					addMessage(complaint.id, "citizen", session?.name ?? "Citizen", text.trim());
					setText("");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: text,
					onChange: (e) => setText(e.target.value),
					className: "h-11 flex-1 rounded-full bg-paper px-4 text-sm ring-1 ring-line",
					placeholder: t(lang, "send")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "h-11 rounded-full bg-ink px-4 text-sm text-paper",
					children: t(lang, "send")
				})]
			})
		]
	});
}
function Home() {
	const lang = useApp((s) => s.settings.lang);
	const ta = lang === "ta";
	const session = useApp((s) => s.session);
	const acId = useApp((s) => s.acId);
	const ac = useAc();
	const complaints = useDeskComplaints();
	const setScreen = useApp((s) => s.setCitizenScreen);
	const mineList = mine(complaints, session, acId);
	const total = mineList.length;
	const active = mineList.filter((c) => c.status !== "resolved").length;
	const resolved = mineList.filter((c) => c.status === "resolved").length;
	const rate = total ? Math.round(resolved / total * 100) : 0;
	const hour = (/* @__PURE__ */ new Date()).getHours();
	const greet = hour < 12 ? ta ? "காலை வணக்கம்" : "Good morning" : hour < 17 ? ta ? "மதிய வணக்கம்" : "Good afternoon" : ta ? "மாலை வணக்கம்" : "Good evening";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "phone-scroll flex h-full flex-col overflow-y-auto bg-cream pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between bg-ink px-4 py-3 text-paper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-[0.18em]",
					children: ac.app.toUpperCase()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellDot, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setScreen("profile"),
						className: "flex size-9 items-center justify-center rounded-full bg-white/10 text-sm font-medium",
						children: (session?.name ?? "C").slice(0, 1)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "sunburst relative overflow-hidden px-5 pb-8 pt-6 text-paper",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunRays, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "relative text-xs text-sand",
						children: [greet, session?.name ? ` · ${session.name}` : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "relative mt-2 max-w-[16ch] font-display text-[1.85rem] leading-tight tracking-tight",
						children: t(lang, "greeting")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setScreen("weather"),
						className: "mt-4 flex w-full items-center justify-between rounded-xl bg-[#d7eef7] px-4 py-3 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-semibold tabular-nums text-fg",
							children: "30°C"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								ta ? "மேகமூட்டம்" : "Clouds",
								" · ",
								ta ? ac.placeTa : ac.place
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-xs text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "size-3.5" }), " 56%"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "size-3.5" }), " 6 km/h"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold",
								children: t(lang, "announcements")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-maroon px-2 py-0.5 text-[10px] text-paper",
								children: ac.announcements.length
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex gap-2 overflow-x-auto pb-1",
							children: ac.announcements.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-[180px] rounded-xl bg-paper-2 p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: ta ? a.titleTa : a.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted",
										children: ta ? a.detailTa : a.detail
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-[10px] text-muted",
										children: a.when
									})
								]
							}, a.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setScreen("submit"),
						className: "mt-4 flex w-full items-center justify-between rounded-xl bg-paper px-4 py-4 text-left shadow-sm ring-1 ring-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-10 items-center justify-center rounded-full bg-maroon-soft text-maroon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: t(lang, "report")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: t(lang, "reportVoice")
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-muted" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-3 overflow-hidden rounded-xl bg-paper ring-1 ring-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								n: total,
								label: t(lang, "total")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								n: active,
								label: t(lang, "active"),
								accent: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								n: resolved,
								label: t(lang, "resolved"),
								ok: true
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setScreen("mla"),
						className: "mt-3 flex w-full items-center gap-3 rounded-xl bg-paper p-3 text-left ring-1 ring-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/brand/logo.svg",
								alt: "",
								className: "size-12 rounded-full"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-medium text-maroon",
										children: t(lang, "yourMla")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold",
										children: ta ? ac.mla.constituencyTa : ac.mla.constituency
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											ac.mla.ac,
											" · ",
											ta ? ac.mla.districtTa : ac.mla.district
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-muted" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 rounded-xl bg-paper p-4 ring-1 ring-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: t(lang, "resolutionRate")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-ok-soft px-2 py-0.5 text-[10px] text-ok",
									children: t(lang, "active")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-2xl font-semibold tabular-nums",
								children: [rate, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									resolved,
									" ",
									ta ? "இல்" : "of",
									" ",
									total,
									" ",
									ta ? "புகார்கள் தீர்ந்தன" : "complaints resolved"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 text-sm font-semibold",
						children: t(lang, "services")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Service, {
							title: t(lang, "myComplaints"),
							sub: t(lang, "trackAll"),
							className: "bg-maroon text-paper",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-4" }),
							onClick: () => setScreen("complaints")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Service, {
							title: t(lang, "voiceReport"),
							sub: t(lang, "speakTa"),
							className: "bg-ink text-paper",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }),
							onClick: () => setScreen("voice")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid grid-cols-4 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }),
								label: t(lang, "liveMap"),
								onClick: () => setScreen("map")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-4" }),
								label: t(lang, "help"),
								onClick: () => setScreen("help")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-4" }),
								label: t(lang, "analytics"),
								onClick: () => setScreen("analytics")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-4" }),
								label: t(lang, "chat"),
								onClick: () => setScreen("chat")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setScreen("settings"),
						className: "mt-2 flex w-full items-center gap-2 rounded-xl bg-paper px-3 py-3 text-sm ring-1 ring-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" }),
							" ",
							t(lang, "settings")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold",
							children: t(lang, "recent")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-xs text-maroon",
							onClick: () => setScreen("complaints"),
							children: t(lang, "viewAll")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 space-y-2",
						children: mineList.slice(0, 3).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setScreen("detail", c.id),
							className: "flex w-full items-center justify-between rounded-xl bg-paper px-3 py-3 text-left ring-1 ring-line",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: ta ? c.titleTa : c.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									wardById(c.wardId)?.[ta ? "nameTa" : "name"],
									" · ",
									relTime(c.createdAt)
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								status: c.status,
								ta
							})]
						}, c.id))
					})
				]
			})
		]
	});
}
function Stat({ n, label, accent, ok }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-3 py-3 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `text-lg font-semibold tabular-nums ${accent ? "text-maroon" : ok ? "text-ok" : ""}`,
			children: n
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] text-muted",
			children: label
		})]
	});
}
function Service({ title, sub, className, icon, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: `rounded-xl p-4 text-left ${className}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-8 items-center justify-center rounded-lg bg-white/15",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] opacity-80",
				children: sub
			})
		]
	});
}
function Mini({ icon, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex flex-col items-center gap-1 rounded-xl bg-paper px-1 py-3 text-[11px] ring-1 ring-line",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-fg",
			children: icon
		}), label]
	});
}
function SunRays() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "pointer-events-none absolute -right-8 -top-10 size-56 opacity-90",
		viewBox: "0 0 200 200",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "120",
			cy: "70",
			r: "28",
			fill: "#f3c15b"
		}), Array.from({ length: 18 }).map((_, i) => {
			const a = i / 18 * Math.PI * 2;
			const x1 = 120 + Math.cos(a) * 34;
			const y1 = 70 + Math.sin(a) * 34;
			const x2 = 120 + Math.cos(a) * 88;
			const y2 = 70 + Math.sin(a) * 88;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1,
				y1,
				x2,
				y2,
				stroke: "#e8a63a",
				strokeWidth: "3"
			}, i);
		})]
	});
}
function SettingsScreen() {
	const lang = useApp((s) => s.settings.lang);
	const ta = lang === "ta";
	const settings = useApp((s) => s.settings);
	const setLang = useApp((s) => s.setLang);
	const setDark = useApp((s) => s.setDark);
	const setNotify = useApp((s) => s.setNotify);
	const setScreen = useApp((s) => s.setCitizenScreen);
	const logout = useApp((s) => s.logout);
	const resetDemo = useApp((s) => s.resetDemo);
	const nav = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "phone-scroll h-full overflow-y-auto bg-cream pb-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center gap-3 px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setScreen("home"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl tracking-tight",
				children: t(lang, "settings")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wide text-muted",
					children: t(lang, "language")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 overflow-hidden rounded-xl bg-paper ring-1 ring-line",
					children: ["ta", "en"].map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setLang(code),
						className: "flex w-full items-center justify-between px-4 py-3 text-sm",
						children: [code === "ta" ? "தமிழ் (Tamil)" : "English", settings.lang === code ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-maroon",
							children: "✓"
						}) : null]
					}, code))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wide text-muted",
					children: t(lang, "notifications")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-2 flex items-center justify-between rounded-xl bg-paper px-4 py-3 ring-1 ring-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: t(lang, "push")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: ta ? "புகார் புதுப்பிப்புகள்" : "Receive complaint updates"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: settings.notify,
						onChange: (e) => setNotify(e.target.checked),
						className: "size-5 accent-maroon"
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wide text-muted",
					children: t(lang, "appearance")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-2 flex items-center justify-between rounded-xl bg-paper px-4 py-3 ring-1 ring-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: t(lang, "darkMode")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: ta ? "இருண்ட தோற்றம்" : "Use dark theme"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: settings.dark,
						onChange: (e) => setDark(e.target.checked),
						className: "size-5 accent-maroon"
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wide text-muted",
					children: t(lang, "about")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 overflow-hidden rounded-xl bg-paper ring-1 ring-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-4" }),
							label: t(lang, "faq"),
							onClick: () => setScreen("help")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4" }),
							label: t(lang, "privacy"),
							onClick: () => setScreen("help")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-4 py-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" }),
									" ",
									t(lang, "version")
								]
							}), "0.1.0"]
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						logout();
						nav({ to: "/" });
					},
					className: "h-12 w-full rounded-xl bg-ink text-paper",
					children: t(lang, "logout")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => resetDemo(),
					className: "w-full text-xs text-muted",
					children: ta ? "டெமோ தரவை மீட்டமை" : "Reset demo data"
				})
			]
		})]
	});
}
function Row({ icon, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex w-full items-center justify-between px-4 py-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-2",
			children: [
				icon,
				" ",
				label
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-muted" })]
	});
}
function MlaProfile() {
	const lang = useApp((s) => s.settings.lang);
	const ta = lang === "ta";
	const setScreen = useApp((s) => s.setCitizenScreen);
	const ac = useAc();
	const initials = ac.mla.name.split(" ").map((p) => p[0]).filter(Boolean).slice(0, 2).join("");
	const rows = [
		[ta ? "தொகுதி" : "Constituency", ta ? ac.mla.constituencyTa : ac.mla.constituency],
		[ta ? "தேர்வு" : "Elected", ac.mla.elected],
		[ta ? "மாவட்டம்" : "District", ta ? ac.mla.districtTa : ac.mla.district],
		[ta ? "அலுவலகம்" : "Office", ta ? ac.mla.officeTa : ac.mla.office],
		[ta ? "நேரம்" : "Hours", ta ? ac.mla.hoursTa : ac.mla.hours]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "phone-scroll h-full overflow-y-auto bg-cream pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-maroon px-4 pb-10 pt-4 text-paper",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setScreen("home"),
				className: "text-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: t(lang, "ourMla")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex size-24 items-center justify-center rounded-full bg-paper font-display text-3xl text-maroon ring-4 ring-white/30",
						children: initials
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-2xl",
						children: ac.mla.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-sand",
						children: [
							"MLA, ",
							ta ? ac.placeTa : ac.place,
							" · ",
							ac.mla.ac
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "-mt-4 rounded-t-2xl bg-cream px-4 pt-4",
			children: rows.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4 border-b border-line py-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: k
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "max-w-[60%] text-right font-medium",
					children: v
				})]
			}, k))
		})]
	});
}
function WeatherScreen() {
	const lang = useApp((s) => s.settings.lang);
	const setScreen = useApp((s) => s.setCitizenScreen);
	const ac = useAc();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-cream",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between bg-ink px-4 py-3 text-paper",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-[0.18em]",
				children: ac.app.toUpperCase()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setScreen("home"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col items-center justify-center px-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, { className: "size-16 text-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-display text-5xl tabular-nums",
					children: "30°C"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted",
					children: lang === "ta" ? `மேகமூட்டம் · ${ac.placeTa}` : `Clouds · ${ac.place}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid w-full grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wchip, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "size-4" }),
							label: lang === "ta" ? "உணர்வு" : "Feels like",
							v: "32°C"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wchip, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "size-4" }),
							label: lang === "ta" ? "ஈரப்பதம்" : "Humidity",
							v: "56%"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wchip, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "size-4" }),
							label: lang === "ta" ? "காற்று" : "Wind",
							v: "6 km/h"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-xs text-xs text-muted",
					children: t(lang, "weatherHint")
				})
			]
		})]
	});
}
function Wchip({ icon, label, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-paper px-2 py-3 ring-1 ring-line",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center text-muted",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm font-semibold tabular-nums",
				children: v
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] text-muted",
				children: label
			})
		]
	});
}
function LiveMap() {
	const lang = useApp((s) => s.settings.lang);
	const ta = lang === "ta";
	const session = useApp((s) => s.session);
	const acId = useApp((s) => s.acId);
	const complaints = useDeskComplaints();
	const setScreen = useApp((s) => s.setCitizenScreen);
	const pins = mine(complaints, session, acId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-3 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setScreen("home"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-medium",
					children: t(lang, "liveMap")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-4 flex-1 overflow-hidden rounded-xl bg-paper ring-1 ring-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/brand/coast-map.jpg",
					alt: "",
					className: "h-full w-full object-cover"
				}), pins.map((c) => {
					const w = wardById(c.wardId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setScreen("detail", c.id),
						className: "absolute -translate-x-1/2 -translate-y-1/2",
						style: {
							left: `${w?.mx ?? 50}%`,
							top: `${w?.my ?? 50}%`
						},
						title: c.id,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-6 items-center justify-center rounded-full bg-maroon text-[9px] text-paper",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" })
						})
					}, c.id);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 py-3 text-xs text-muted",
				children: ta ? "உங்கள் புகார்கள் வார்டு அளவில் காட்டப்படும்." : "Your complaints plotted by ward."
			})
		]
	});
}
function HelpScreen() {
	const lang = useApp((s) => s.settings.lang);
	const ta = lang === "ta";
	const setScreen = useApp((s) => s.setCitizenScreen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "phone-scroll h-full overflow-y-auto bg-cream px-4 pb-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center gap-3 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setScreen("home"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl",
				children: t(lang, "faq")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: FAQ.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "rounded-xl bg-paper p-4 ring-1 ring-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
					className: "cursor-pointer text-sm font-medium",
					children: ta ? f.qTa : f.q
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: ta ? f.aTa : f.a
				})]
			}, f.q))
		})]
	});
}
function AnalyticsScreen() {
	const lang = useApp((s) => s.settings.lang);
	const ta = lang === "ta";
	const session = useApp((s) => s.session);
	const ac = useAc();
	const acId = useApp((s) => s.acId);
	const complaints = useDeskComplaints();
	const setScreen = useApp((s) => s.setCitizenScreen);
	const list = mine(complaints, session, acId);
	const resolved = list.filter((c) => c.status === "resolved").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full bg-cream px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-3 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setScreen("home"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl",
					children: t(lang, "analytics")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-paper p-3 ring-1 ring-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-semibold tabular-nums",
							children: list.length
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: t(lang, "total")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-paper p-3 ring-1 ring-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-semibold tabular-nums text-maroon",
							children: list.length - resolved
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: t(lang, "active")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-paper p-3 ring-1 ring-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-semibold tabular-nums text-ok",
							children: resolved
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: t(lang, "resolved")
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-2",
				children: ac.wards.slice(0, 6).map((w) => {
					const n = list.filter((c) => c.wardId === w.id).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ta ? w.nameTa : w.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-muted",
							children: n
						})]
					}, w.id);
				})
			})
		]
	});
}
function NotifsScreen() {
	const lang = useApp((s) => s.settings.lang);
	const ta = lang === "ta";
	const notes = useApp((s) => notesFor(s.notifications, s.session, s.acId, s.complaints));
	const mark = useApp((s) => s.markNotifsRead);
	const setScreen = useApp((s) => s.setCitizenScreen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full bg-cream px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setScreen("home"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl",
					children: t(lang, "notifications")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: mark,
				className: "text-xs text-maroon",
				children: ta ? "படித்ததாக குறி" : "Mark read"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [notes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: t(lang, "empty")
			}) : null, notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => n.complaintId && setScreen("detail", n.complaintId),
				className: "w-full rounded-xl bg-paper p-3 text-left ring-1 ring-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4 text-maroon" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: ta ? n.titleTa : n.title
							}),
							!n.read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ml-auto size-2 rounded-full bg-maroon" }) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: ta ? n.bodyTa : n.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[10px] text-muted",
						children: relTime(n.at)
					})
				]
			}, n.id))]
		})]
	});
}
function ProfileScreen() {
	const session = useApp((s) => s.session);
	const setScreen = useApp((s) => s.setCitizenScreen);
	const lang = useApp((s) => s.settings.lang);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-cream px-4 pt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setScreen("home"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex size-16 items-center justify-center rounded-full bg-maroon text-xl text-paper",
					children: (session?.name ?? "C").slice(0, 1)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-2xl",
					children: session?.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: ["+91 ", session?.phone]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setScreen("settings"),
					className: "mt-6 h-11 rounded-xl bg-ink px-6 text-sm text-paper",
					children: t(lang, "settings")
				})
			]
		})]
	});
}
function CitizenApp() {
	const screen = useApp((s) => s.citizenScreen);
	const session = useApp((s) => s.session);
	const dark = useApp((s) => s.settings.dark);
	const setScreen = useApp((s) => s.setCitizenScreen);
	(0, import_react.useEffect)(() => {
		if (screen === "login" || screen === "otp") {
			const phone = useApp.getState().pendingPhone;
			useApp.getState().loginCitizen(phone.length === 10 ? phone : "9876543210");
			return;
		}
		if (session && (screen === "splash" || screen === "onboard")) setScreen("home");
	}, [
		session,
		screen,
		setScreen
	]);
	const showNav = !!session && !(!session || screen === "splash" || screen === "onboard") && ![
		"detail",
		"submit",
		"voice",
		"otp"
	].includes(screen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneShell, {
		dark,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex min-h-0 flex-1 flex-col",
			children: [
				screen === "splash" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {}) : null,
				screen === "onboard" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboard, {}) : null,
				session && screen === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Home, {}) : null,
				session && screen === "complaints" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintList, {}) : null,
				session && screen === "detail" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintDetail, {}) : null,
				session && screen === "submit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitComplaint, {}) : null,
				session && screen === "voice" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceReport, {}) : null,
				session && screen === "chat" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatScreen, {}) : null,
				session && screen === "settings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsScreen, {}) : null,
				session && screen === "mla" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MlaProfile, {}) : null,
				session && screen === "weather" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherScreen, {}) : null,
				session && screen === "map" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveMap, {}) : null,
				session && screen === "help" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpScreen, {}) : null,
				session && screen === "analytics" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalyticsScreen, {}) : null,
				session && screen === "notifs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotifsScreen, {}) : null,
				session && screen === "profile" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileScreen, {}) : null,
				showNav ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {
					screen,
					onGo: setScreen
				}) : null
			]
		})
	});
}
function BottomNav({ screen, onGo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "absolute inset-x-0 bottom-0 flex border-t border-line bg-cream/95 px-2 py-1 backdrop-blur",
		children: [
			{
				id: "home",
				icon: House,
				label: "Home"
			},
			{
				id: "complaints",
				icon: ClipboardList,
				label: "List"
			},
			{
				id: "submit",
				icon: PenLine,
				label: "New"
			},
			{
				id: "map",
				icon: MapPin,
				label: "Map"
			},
			{
				id: "settings",
				icon: Settings,
				label: "More"
			}
		].map((it) => {
			const active = screen === it.id;
			const Icon = it.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onGo(it.id),
				className: `flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] ${active ? "text-maroon" : "text-muted"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), it.label]
			}, it.id);
		})
	});
}
var SplitComponent = CitizenApp;
//#endregion
export { SplitComponent as component };
