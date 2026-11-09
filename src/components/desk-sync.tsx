import { useEffect } from "react";
import { loadDesk } from "@/lib/desk.functions";
import { useApp } from "@/lib/store";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function DeskSync() {
  const { user } = useCurrentUserState();
  const userId = user?.id ?? null;

  useEffect(() => {
    if (!userId) return;
    let stop = false;
    async function pull() {
      try {
        const data = await loadDesk();
        if (!stop) useApp.getState().applyRemote(data.complaints);
      } catch {
        // Signed-out or the desk is still starting. The next poll retries.
      }
    }
    void pull();
    const timer = window.setInterval(() => void pull(), 4000);
    return () => {
      stop = true;
      window.clearInterval(timer);
    };
  }, [userId]);

  return null;
}
