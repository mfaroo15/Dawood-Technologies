"use client";

import { useMemo, useSyncExternalStore } from "react";

function subscribe(onTick: () => void) {
  const id = window.setInterval(onTick, 30_000);
  return () => window.clearInterval(id);
}

// The server renders a placeholder; the client swaps in the live time after hydration.
export function LocalTime({ timeZone, className }: { timeZone: string; className?: string }) {
  const format = useMemo(() => new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone }), [timeZone]);
  const time = useSyncExternalStore(subscribe, () => format.format(new Date()), () => "--:--");
  return <p className={className}><span className="visually-hidden">Local time: </span>{time}</p>;
}
