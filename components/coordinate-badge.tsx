"use client";

import { usePathname } from "next/navigation";

/* Shows the reader's current position in the Atlas hierarchy. */
export function CoordinateBadge({ map }: { map: Record<string, string> }) {
  const pathname = usePathname();
  const coordinate = map[pathname];

  return (
    <p className="font-sans text-xs uppercase tracking-[0.25em] text-atmosphere/70">
      {coordinate ? `Coordinate · ${coordinate}` : "The Atlas"}
    </p>
  );
}
