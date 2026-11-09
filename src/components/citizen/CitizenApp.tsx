import { useEffect } from "react";
import { House, MapPin, PenLine, Settings, ClipboardList } from "lucide-react";
import { PhoneShell } from "@/components/phone-shell";
import { useApp } from "@/lib/store";
import { Onboard, Splash } from "./auth-flow";
import { ChatScreen, ComplaintDetail, ComplaintList, SubmitComplaint, VoiceReport } from "./complaints";
import { Home } from "./home";
import {
  AnalyticsScreen,
  HelpScreen,
  LiveMap,
  MlaProfile,
  NotifsScreen,
  ProfileScreen,
  SettingsScreen,
  WeatherScreen,
} from "./more";

export function CitizenApp() {
  const screen = useApp((s) => s.citizenScreen);
  const session = useApp((s) => s.session);
  const dark = useApp((s) => s.settings.dark);
  const setScreen = useApp((s) => s.setCitizenScreen);

  useEffect(() => {
    if (screen === "login" || screen === "otp") {
      const phone = useApp.getState().pendingPhone;
      useApp.getState().loginCitizen(phone.length === 10 ? phone : "9876543210");
      return;
    }
    if (session && (screen === "splash" || screen === "onboard")) {
      setScreen("home");
    }
  }, [session, screen, setScreen]);

  const gated = !session || screen === "splash" || screen === "onboard";
  const showNav = !!session && !gated && !["detail", "submit", "voice", "otp"].includes(screen);

  return (
    <PhoneShell dark={dark}>
      <div className="relative flex min-h-0 flex-1 flex-col">
        {screen === "splash" ? <Splash /> : null}
        {screen === "onboard" ? <Onboard /> : null}
        {session && screen === "home" ? <Home /> : null}
        {session && screen === "complaints" ? <ComplaintList /> : null}
        {session && screen === "detail" ? <ComplaintDetail /> : null}
        {session && screen === "submit" ? <SubmitComplaint /> : null}
        {session && screen === "voice" ? <VoiceReport /> : null}
        {session && screen === "chat" ? <ChatScreen /> : null}
        {session && screen === "settings" ? <SettingsScreen /> : null}
        {session && screen === "mla" ? <MlaProfile /> : null}
        {session && screen === "weather" ? <WeatherScreen /> : null}
        {session && screen === "map" ? <LiveMap /> : null}
        {session && screen === "help" ? <HelpScreen /> : null}
        {session && screen === "analytics" ? <AnalyticsScreen /> : null}
        {session && screen === "notifs" ? <NotifsScreen /> : null}
        {session && screen === "profile" ? <ProfileScreen /> : null}
        {showNav ? <BottomNav screen={screen} onGo={setScreen} /> : null}
      </div>
    </PhoneShell>
  );
}

function BottomNav({
  screen,
  onGo,
}: {
  screen: string;
  onGo: (s: "home" | "complaints" | "submit" | "map" | "settings") => void;
}) {
  const items = [
    { id: "home" as const, icon: House, label: "Home" },
    { id: "complaints" as const, icon: ClipboardList, label: "List" },
    { id: "submit" as const, icon: PenLine, label: "New" },
    { id: "map" as const, icon: MapPin, label: "Map" },
    { id: "settings" as const, icon: Settings, label: "More" },
  ];
  return (
    <nav className="absolute inset-x-0 bottom-0 flex border-t border-line bg-cream/95 px-2 py-1 backdrop-blur">
      {items.map((it) => {
        const active = screen === it.id;
        const Icon = it.icon;
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => onGo(it.id)}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] ${active ? "text-maroon" : "text-muted"}`}
          >
            <Icon className="size-5" />
            {it.label}
          </button>
        );
      })}
    </nav>
  );
}
