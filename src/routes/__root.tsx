import { useEffect } from "react";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { useApp } from "@/lib/store";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Namma TCR" },
      { name: "theme-color", content: "#8B1A2B" },
      {
        name: "description",
        content: "Tiruchendur AC-215 constituency complaint management — Namma TCR",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Noto+Sans+Tamil:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: Root,
});

function Root() {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <PersistGate>
            <Outlet />
          </PersistGate>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function PersistGate({ children }: { children: React.ReactNode }) {
  const lang = useApp((s) => s.settings.lang);
  const acId = useApp((s) => s.acId);
  useEffect(() => {
    void Promise.resolve(useApp.persist.rehydrate()).then(() => {
      useApp.getState().markHydrated();
    });
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.ac = acId;
  }, [lang, acId]);
  return <>{children}</>;
}
