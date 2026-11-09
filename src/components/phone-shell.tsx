import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PhoneShell({
  children,
  dark,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-ink p-0 md:p-6">
      <div
        className={cn(
          "relative flex h-dvh w-full max-w-[430px] flex-col overflow-hidden md:h-[844px] md:max-h-[844px] md:rounded-[2rem] md:border md:border-white/10 md:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]",
          dark ? "bg-ink text-paper" : "bg-cream text-fg",
        )}
      >
        {children}
      </div>
    </div>
  );
}
