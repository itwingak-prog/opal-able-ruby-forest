import { getAc } from "@/lib/catalog";
import { useApp } from "@/lib/store";

export function useAc() {
  const id = useApp((s) => s.acId);
  return getAc(id);
}
