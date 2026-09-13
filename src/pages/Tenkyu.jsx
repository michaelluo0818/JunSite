import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, MapPin, Star, Sparkles } from "lucide-react";
import { TENKYU } from "../data/site";

/* ---------------------------------------------------------------
   てんきゅーつあー2026.

   The poster is a cartoon: crayon hearts and stars on warm paper, a
   marker-pen title, and four blocks of dates that are told apart by
   colour alone — Osaka yellow, Fukuoka red, Sapporo blue, Tokyo
   orange. This page inherits that coding wholesale, because it is the
   thing that makes four near-identical listings readable at a glance.

   Inside each card the three facts a reader actually came for are
   given three different shapes, so none of them can be mistaken for
   another: the times sit in a pair of filled chips, the venue in a
   single dashed frame, the prices in a plain ruled list.

   Class names are written out in full in ACCENT rather than assembled
   from the city key, because Tailwind only ships classes it can find
   as literal text in the source.
   --------------------------------------------------------------- */
const ACCENT = {
  osaka: {
    band: "bg-tk-osaka-bright",
    soft: "bg-tk-osaka-soft",
    text: "text-tk-osaka",
    chip: "bg-tk-osaka text-tk-cream",
    row: "hover:bg-tk-osaka-soft",
    edge: "hover:border-tk-osaka",
  },
  fukuoka: {
    band: "bg-tk-fukuoka-bright",
    soft: "bg-tk-fukuoka-soft",
    text: "text-tk-fukuoka",
    chip: "bg-tk-fukuoka text-tk-cream",
    row: "hover:bg-tk-fukuoka-soft",
    edge: "hover:border-tk-fukuoka",
  },
  sapporo: {
    band: "bg-tk-sapporo-bright",
    soft: "bg-tk-sapporo-soft",
    text: "text-tk-sapporo",
    chip: "bg-tk-sapporo text-tk-cream",
    row: "hover:bg-tk-sapporo-soft",
    edge: "hover:border-tk-sapporo",
  },
  tokyo: {
    band: "bg-tk-tokyo-bright",
    soft: "bg-tk-tokyo-soft",
    text: "text-tk-tokyo",
    chip: "bg-tk-tokyo text-tk-cream",
    row: "hover:bg-tk-tokyo-soft",
    edge: "hover:border-tk-tokyo",
  },
};

/* The drawing's hearts and stars, scattered around the title. All of
   it is decoration: nothing here is announced to a screen reader.

   Every position hugs an edge, outside the ~22–78% band the centred
   title, tagline and city chips actually occupy, so a doodle can never
   land on a word. The smallest ones are dropped below `sm`, where that
   band is most of the screen — on a phone only the four hearts in the
   top corners survive, since the hero shortens enough there that
   anything at mid-height lands on the tagline.

   `dur` is per doodle and deliberately uneven. Eight or more hearts
   sharing one duration read as a single blinking object; spread across
   2.6–4.4s with staggered delays, they read as a drift. */
const DOODLES = [
  // left edge
  { Icon: Heart, cls: "top-[13%] left-[0%] size-7 text-tk-pink sm:top-[16%] sm:left-[3%] sm:size-9", tilt: "-14deg", delay: "0s", dur: "3.4s" },
  { Icon: Star, cls: "top-[62%] left-[9%] hidden size-5 text-tk-star sm:block sm:size-7", tilt: "10deg", delay: "0.6s", dur: "2.8s" },
  { Icon: Heart, cls: "top-[4%] left-[16%] size-4 text-tk-heart sm:size-6", tilt: "8deg", delay: "1.1s", dur: "3.9s" },
  { Icon: Heart, cls: "bottom-[9%] left-[6%] hidden size-5 text-tk-violet sm:block", tilt: "-9deg", delay: "1.6s", dur: "3.1s" },
  { Icon: Heart, cls: "top-[38%] left-[1%] hidden size-6 text-tk-orange sm:block", tilt: "15deg", delay: "0.9s", dur: "4.4s" },
  { Icon: Star, cls: "bottom-[26%] left-[13%] hidden size-4 text-tk-star sm:block", tilt: "-18deg", delay: "2.1s", dur: "2.6s" },
  { Icon: Heart, cls: "top-[80%] left-[19%] hidden size-4 text-tk-pink sm:block", tilt: "20deg", delay: "1.3s", dur: "3.6s" },

  // right edge
  { Icon: Heart, cls: "top-[10%] right-[0%] size-8 text-tk-heart sm:top-[12%] sm:right-[3%] sm:size-10", tilt: "12deg", delay: "0.3s", dur: "3.2s" },
  { Icon: Star, cls: "top-[64%] right-[10%] hidden size-5 text-tk-star sm:block sm:size-6", tilt: "-12deg", delay: "0.9s", dur: "4.1s" },
  { Icon: Heart, cls: "top-[3%] right-[17%] size-4 text-tk-violet sm:size-5", tilt: "-6deg", delay: "1.4s", dur: "2.9s" },
  { Icon: Heart, cls: "bottom-[7%] right-[6%] hidden size-7 text-tk-orange sm:block", tilt: "16deg", delay: "1.9s", dur: "3.7s" },
  { Icon: Heart, cls: "top-[40%] right-[1%] hidden size-6 text-tk-pink sm:block", tilt: "-16deg", delay: "0.5s", dur: "4.3s" },
  { Icon: Star, cls: "bottom-[28%] right-[14%] hidden size-4 text-tk-star sm:block", tilt: "22deg", delay: "2.4s", dur: "2.7s" },
  { Icon: Heart, cls: "top-[82%] right-[19%] hidden size-4 text-tk-heart sm:block", tilt: "-20deg", delay: "1.7s", dur: "3.5s" },
];

function Doodles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {DOODLES.map(({ Icon, cls, tilt, delay, dur }, i) => (
        <Icon
          key={i}
          fill="currentColor"
          strokeWidth={1.25}
          className={`doodle absolute ${cls}`}
          style={{ "--tk-tilt": tilt, animationDelay: delay, animationDuration: dur }}
        />
      ))}
    </div>
  );
}

/* OPEN and START. Filled, centred and numeric — a shape that appears
   nowhere else on the card. */
function TimeChip({ label, value, accent }) {
  return (
    <div className={`rounded-2xl px-3 py-3 text-center ${accent.soft}`}>
      <p className={`eyebrow-round ${accent.text}`}>{label}</p>
      <p className="mt-1 text-2xl leading-none font-bold tabular-nums">{value}</p>
    </div>
  );
}

/* Google Maps' documented search link. The query is pre-filled rather
   than a pinned coordinate, so a venue that moves or gets relisted still
   resolves instead of dropping a pin in a field. */
function mapUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function ShowCard({ show }) {
  const accent = ACCENT[show.key];

  return (
    <article className="card-tk overflow-hidden rounded-[1.75rem] bg-white">
      {/* The city's colour, before a single word is read. */}
      <div className={`h-2.5 w-full ${accent.band}`} />

      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow-round text-tk-ink-3">
              {show.no} — {show.cityEn}
            </p>
            <p className={`hand mt-1.5 text-5xl leading-none ${accent.text}`}>
              {show.date}
              <span className="ml-2 align-baseline text-xl">({show.day})</span>
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full px-4 py-1.5 text-lg leading-tight font-bold ${accent.chip}`}
          >
            {show.city}
          </span>
        </div>

        <p className="mt-4 text-sm text-tk-ink-2">てんきゅーつあー in {show.city}</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <TimeChip label="Open" value={show.open} accent={accent} />
          <TimeChip label="Start" value={show.start} accent={accent} />
        </div>

        {/* Venue. Outlined rather than filled, so a location can never
            be skimmed as a third time. The whole frame is the map link. */}
        <a
          href={mapUrl(show.mapQuery)}
          target="_blank"
          rel="noopener noreferrer"
          className={`group mt-3 flex items-start gap-3 rounded-2xl border border-dashed border-tk-line px-4 py-3.5 transition-colors ${accent.edge} ${accent.row}`}
        >
          <MapPin className={`mt-0.5 size-4 shrink-0 ${accent.text}`} />
          <div className="min-w-0 flex-1">
            <p className="eyebrow-round text-tk-ink-3">Venue</p>
            <p className="mt-1 leading-snug font-bold">
              {show.venueNote && (
                <span className="mr-1.5 text-xs font-medium text-tk-ink-2">{show.venueNote}</span>
              )}
              {show.venue}
            </p>
          </div>
          <ArrowUpRight
            className={`mt-0.5 size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 ${accent.text}`}
          />
        </a>

        {/* Each price is its own purchase link: the two ticket types go
            on sale as two separate shop items, so the row itself is the
            link rather than one button standing in for both. */}
        <ul className="mt-5">
          {show.tickets.map((t) => (
            <li key={t.label} className="border-b border-tk-line/70 last:border-0">
              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group -mx-2 flex items-center justify-between gap-3 rounded-xl px-2 py-3 transition-colors ${accent.row}`}
              >
                <span className="flex items-center gap-1.5 text-sm text-tk-ink-2">
                  {t.support && <Heart className="size-3.5 shrink-0 text-tk-heart" fill="currentColor" />}
                  {t.label}
                </span>
                <span className="flex shrink-0 items-center gap-1">
                  <span className="font-bold">{t.price}</span>
                  <span className="text-xs font-medium text-tk-ink-3">{t.suffix}</span>
                  <ArrowUpRight
                    className={`ml-0.5 size-3.5 transition-transform group-hover:-translate-y-0.5 ${accent.text}`}
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>

        {show.note && (
          <p
            className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs ${accent.soft} ${accent.text}`}
          >
            <Sparkles className="size-3.5 shrink-0" />
            {show.note}
          </p>
        )}
      </div>
    </article>
  );
}

export default function Tenkyu() {
  return (
    <div className="round bg-tk-cream text-tk-ink">
      {/* ---------- Title ---------- */}
      <section className="relative overflow-hidden px-5 pt-14 pb-4 sm:pt-20">
        <Doodles />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="eyebrow-round text-tk-ink-3">{TENKYU.eyebrow}</p>
          <h1 className="hand mt-4 text-[2.7rem] leading-[1.15] sm:text-6xl lg:text-7xl">
            てんきゅーつあー
            <span className="text-tk-heart">{TENKYU.year}</span>
          </h1>
          <p className="hand mt-6 text-lg text-tk-ink-2 sm:text-2xl">{TENKYU.tagline}</p>

          {/* A four-stop index in the four colours: the whole tour,
              answered before any scrolling. */}
          {/* Two-by-two on a phone rather than a 3 + 1 wrap, which reads
              as three dates and an afterthought. One row from sm up. */}
          <ul className="mx-auto mt-9 grid max-w-sm grid-cols-2 gap-2.5 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center">
            {TENKYU.shows.map((s) => (
              <li
                key={s.key}
                className={`flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${ACCENT[s.key].soft} ${ACCENT[s.key].text}`}
              >
                <span className="tabular-nums">{s.date}</span>
                <span className="text-tk-ink">{s.city}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Poster ---------- */}
      <section className="px-5 pt-12">
        <figure className="card-tk mx-auto max-w-3xl -rotate-1 overflow-hidden rounded-[1.75rem] bg-white">
          <img
            src={TENKYU.poster}
            alt={`${TENKYU.title}／${TENKYU.tagline}　全4公演のツアーポスター`}
            className="w-full"
          />
        </figure>
      </section>

      {/* ---------- The four dates ---------- */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-5 border-b-2 border-tk-line pb-4">
          <h2 className="hand text-3xl sm:text-4xl">ツアー日程</h2>
          <p className="eyebrow-round text-tk-ink-3">全{TENKYU.shows.length}公演</p>
        </div>

        <div className="mt-9 grid gap-7 sm:grid-cols-2">
          {TENKYU.shows.map((show) => (
            <ShowCard key={show.key} show={show} />
          ))}
        </div>
      </section>

      {/* ---------- Perks ---------- */}
      <section className="bg-tk-cream-2 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="hand text-3xl sm:text-4xl">応援付きチケットの特典</h2>
          <p className="mt-3 text-sm text-tk-ink-2">
            各会場の応援付きチケットには、以下の特典が付きます。
          </p>

          <div className="mt-9 grid max-w-3xl gap-5 sm:grid-cols-2">
            {TENKYU.perks.map((p, i) => (
              <div key={p.no} className="card-tk flex items-center gap-4 rounded-[1.75rem] bg-white p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-tk-heart text-white">
                  {i === 0 ? (
                    <Star className="size-5" fill="currentColor" strokeWidth={1.25} />
                  ) : (
                    <Heart className="size-5" fill="currentColor" strokeWidth={1.25} />
                  )}
                </span>
                <div>
                  <p className="eyebrow-round text-tk-ink-3">{p.no}</p>
                  <p className="mt-1 text-lg leading-snug font-bold">{p.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Notes ---------- */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <div className="card-tk rounded-[1.75rem] border-2 border-dashed border-tk-heart/45 bg-white px-6 py-8 text-center">
          <p className="hand text-2xl leading-snug text-tk-fukuoka-bright sm:text-3xl">
            {TENKYU.highlight}
          </p>
        </div>

        <ul className="mt-9 space-y-2.5 text-sm leading-relaxed text-tk-ink-2">
          {TENKYU.notes.map((n) => (
            <li key={n} className="flex gap-2">
              <span aria-hidden="true" className="text-tk-ink-3">
                ※
              </span>
              <span>{n}</span>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-xs leading-relaxed text-tk-ink-3">
          チケットに関するお問い合わせは、
          <Link
            to="/contact"
            className="font-bold underline underline-offset-4 hover:text-tk-heart"
          >
            お問い合わせページ
          </Link>
          よりご連絡ください。
        </p>
      </section>
    </div>
  );
}
