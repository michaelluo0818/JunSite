import { useEffect, useState } from "react";
import fallbackFile from "../../public/schedule.json";
import { parseSchedule, SCHEDULE_URL } from "../data/schedule";

/* The copy bundled at build time is the safety net. It renders
   immediately — so the page is never blank and never shows a spinner —
   and is replaced as soon as the live file arrives.

   If the live file is missing, unreachable or malformed, the built-in
   copy simply stays on screen. A bad edit can make the schedule stale;
   it can never take the site down. */

let bundled;
try {
  bundled = parseSchedule(fallbackFile);
} catch {
  bundled = [];
}

export function useSchedule() {
  const [shows, setShows] = useState(bundled);
  const [source, setSource] = useState("bundled");
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;

    // Cache-buster: without it a CDN or the browser will happily serve
    // yesterday's schedule for hours after the file is replaced.
    fetch(`${SCHEDULE_URL}?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const parsed = parseSchedule(data);
        if (!alive) return;
        setShows(parsed);
        setSource("live");
      })
      .catch((err) => {
        if (!alive) return;
        setError(err.message);
        console.warn(`[schedule] using the built-in copy — ${err.message}`);
      });

    return () => {
      alive = false;
    };
  }, []);

  return { shows, source, error };
}
