/* ---------------------------------------------------------------
   The live schedule is the one part of the site that changes weekly,
   so it lives in /schedule.json and is fetched at runtime. Replacing
   that one file updates the site — no rebuild, no deploy.

   Everything here is deliberately forgiving: a hand-edited file will
   eventually contain a typo, and a typo must never blank the page.
   --------------------------------------------------------------- */

export const SCHEDULE_URL = "/schedule.json";

const str = (v) => (typeof v === "string" ? v.trim() : "");
const list = (v) => (Array.isArray(v) ? v.map(str).filter(Boolean) : []);

/** Fills in everything that can be derived, so the JSON only has to
 *  carry what a human actually knows: date, place, title. */
export function normalizeShow(raw, index) {
  const iso = str(raw?.iso);
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);

  return {
    id: str(raw?.id) || `${iso || "x"}-${index}`,
    iso,
    month: m ? `${Number(m[2])}月` : "",
    date: str(raw?.date) || (m ? `${Number(m[2])}/${Number(m[3])}` : ""),
    area: str(raw?.area),
    title: str(raw?.title),
    lead: str(raw?.lead),
    alert: str(raw?.alert),
    times: list(raw?.times),
    notes: list(raw?.notes),
    details: Array.isArray(raw?.details)
      ? raw.details
          .map((d) => ({ label: str(d?.label), value: str(d?.value) }))
          .filter((d) => d.label || d.value)
      : [],
    tbd: Boolean(raw?.tbd),
    featured: Boolean(raw?.featured),
    to: str(raw?.to),
  };
}

/** Accepts either `{ shows: [...] }` or a bare array. Throws only when
 *  there is nothing usable at all, which is the signal to fall back. */
export function parseSchedule(data) {
  const raw = Array.isArray(data) ? data : Array.isArray(data?.shows) ? data.shows : null;
  if (!raw) throw new Error("no `shows` array found");

  const shows = raw
    .map(normalizeShow)
    .filter((s) => s.iso && s.title)
    .sort((a, b) => a.iso.localeCompare(b.iso));

  if (!shows.length) throw new Error("no show had both a date and a title");
  return shows;
}

const today = () => new Date().toISOString().slice(0, 10);

export const isPast = (show) => Boolean(show.iso) && show.iso < today();

/** Next shows first. Once the whole season is over, shows the most
 *  recent instead, so the homepage is never empty. */
export function upcoming(shows, limit) {
  const ahead = shows.filter((s) => !isPast(s));
  const list = ahead.length ? ahead : [...shows].reverse();
  return limit ? list.slice(0, limit) : list;
}

/** Groups into the months the schedule is written in, keeping order. */
export function byMonth(shows) {
  const groups = [];
  for (const show of shows) {
    const last = groups.at(-1);
    if (last && last.month === show.month) last.shows.push(show);
    else groups.push({ month: show.month, shows: [show] });
  }
  return groups;
}
