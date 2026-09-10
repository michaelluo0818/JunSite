import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  ShoppingBag,
  Ticket,
} from "lucide-react";
import { Section, SectionHeading } from "../components/Section";
import { LiveEntry } from "../components/LiveList";
import { useSchedule } from "../hooks/useSchedule";
import { upcoming } from "../data/schedule";
import { NONFICTION, RELEASES, ROOMLIVE, SHOP_URL } from "../data/site";

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[center_22%] bg-cover"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />
      {/* The photo sits around 175/255 luminance, so light type would
          wash out on it. A warm veil rising from the lower left keeps
          the black display face above 10:1 contrast while leaving her
          face, top right, untouched. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(255,246,219,0.96)_0%,rgba(255,246,219,0.86)_36%,rgba(255,246,219,0.4)_60%,rgba(255,246,219,0)_86%)] md:bg-[linear-gradient(to_top_right,rgba(255,246,219,0.94)_0%,rgba(255,246,219,0.78)_26%,rgba(255,246,219,0.34)_50%,rgba(255,246,219,0)_74%)]"
      />
      <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-5 pt-24 pb-14 text-ink sm:min-h-[84vh] sm:pb-20">
        <h1 className="display text-[22vw] leading-[0.82] tracking-[0.02em] sm:text-[16vw] lg:text-[13rem]">
          JUN
        </h1>
        <div className="mt-8 border-t border-ink/25 pt-8">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={NONFICTION.to}
              className="eyebrow inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-accent"
            >
              <Ticket className="size-4" />
              Live Tour{" "}
              <span className="normal-case">“{NONFICTION.title}”</span>
            </Link>
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow inline-flex items-center gap-2 border border-ink/45 px-6 py-3.5 text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <ShoppingBag className="size-4" />
              Web Shop
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   nonfiction — the whole block runs on the tour poster's own
   palette (black ground, brass gold, warm off-white) rather than the
   site's teal, so the campaign reads as its own world.
   ---------------------------------------------------------------- */
function Nonfiction() {
  return (
    <section className="bg-nf-black text-nf-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Link to={NONFICTION.to} className="group block overflow-hidden">
          <img
            src="/nonfiction.jpg"
            alt={`${NONFICTION.eyebrow}「${NONFICTION.title}」ポスター`}
            className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </Link>

        <div>
          <p className="eyebrow text-nf-gold">{NONFICTION.eyebrow}</p>

          <h2 className="script mt-3 text-6xl leading-[0.9] text-nf-white sm:text-7xl lg:text-8xl">
            {NONFICTION.title}
          </h2>

          <p className="display mt-7 text-3xl text-nf-gold sm:text-4xl">
            {NONFICTION.date}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-nf-white/85">
            <span>Open {NONFICTION.open}</span>
            <span>Start {NONFICTION.start}</span>
          </div>

          <p className="mt-5 border-t border-nf-grey/30 pt-5 text-sm">
            <span className="text-nf-gold">{NONFICTION.city}</span>
            <span className="mx-2 text-nf-grey">/</span>
            <span className="display-lower">{NONFICTION.venue}</span>
          </p>

          <dl className="mt-6 space-y-2">
            {NONFICTION.tickets.map((t) => (
              <div key={t.label} className="flex items-baseline gap-4 text-sm">
                <dt className="eyebrow w-28 shrink-0 text-nf-grey">
                  {t.label}
                </dt>
                <dd
                  className={
                    t.soldOut ? "text-nf-grey line-through" : "text-nf-white"
                  }
                >
                  {t.price}
                </dd>
                {t.soldOut && (
                  <span className="eyebrow text-nf-gold">完売</span>
                )}
              </div>
            ))}
          </dl>

          <div className="mt-9">
            <a
              href={NONFICTION.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow group inline-flex items-center gap-2 bg-nf-gold px-7 py-4 text-nf-black transition-colors hover:bg-nf-gold-2"
            >
              公演詳細・チケット
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveSchedule() {
  const { shows } = useSchedule();

  return (
    <Section>
      <SectionHeading title="Live Schedule" ja="ライブ情報" to="/live" />
      <div className="divide-y divide-ink/10 border-b border-ink/10">
        {upcoming(shows, 4).map((item) => (
          <LiveEntry key={item.id} item={item} compact />
        ))}
      </div>
      <Link
        to="/live"
        className="eyebrow group mt-8 inline-flex items-center gap-2 text-ink-2 transition-colors hover:text-accent"
      >
        すべての公演を見る
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </Section>
  );
}

/* ROOMLIVE — JUN's own YouTube variety programme. Thumbnails come
   straight from YouTube so no artwork needs maintaining. */
function RoomLive() {
  return (
    <Section>
      <SectionHeading title="ROOMLIVE" />

      <p className="eyebrow -mt-2 mb-6 text-ink-3">
        シリーズ ／ {ROOMLIVE.series}
      </p>

      <ul className="grid gap-8 sm:grid-cols-3">
        {ROOMLIVE.episodes.map((ep) => (
          <li key={ep.no}>
            <a
              href={`https://www.youtube.com/watch?v=${ep.videos[0].id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-video overflow-hidden bg-ink">
                <img
                  src={`https://img.youtube.com/vi/${ep.videos[0].id}/hqdefault.jpg`}
                  alt={`${ROOMLIVE.series} ${ep.title}`}
                  className="size-full object-cover transition-opacity group-hover:opacity-80"
                  loading="lazy"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <Play
                    className="size-10 text-paper drop-shadow"
                    strokeWidth={1.5}
                  />
                </span>
              </div>
              <h3 className="mt-4 text-lg font-medium transition-colors group-hover:text-accent">
                {ep.title}
              </h3>
            </a>
          </li>
        ))}
      </ul>

      <a
        href={ROOMLIVE.channel}
        target="_blank"
        rel="noopener noreferrer"
        className="eyebrow group mt-10 inline-flex items-center gap-2 border-b border-ink/25 pb-1 transition-colors hover:border-accent hover:text-accent"
      >
        YouTubeチャンネルを見る
        <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
      </a>
    </Section>
  );
}

function Discography() {
  return (
    <Section className="pt-0!">
      <SectionHeading title="Discography" ja="作品" to="/discography" />
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
        {RELEASES.slice(0, 3).map((r) => (
          <li key={r.slug}>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <img
                src={r.cover}
                alt={`${r.title} ジャケット`}
                className="aspect-square w-full bg-paper-2 object-cover transition-opacity group-hover:opacity-85"
                loading="lazy"
              />
              <p className="display-lower mt-4 inline-flex items-center gap-1 text-base transition-colors group-hover:text-accent sm:text-lg">
                {r.title}
                <ArrowUpRight className="size-3.5 shrink-0" />
              </p>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function ShopBand() {
  return (
    <section className="border-y border-ink/12 bg-paper-2">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="display text-2xl sm:text-3xl">Web Shop</h2>
          <p className="mt-2 text-sm text-ink-2">
            CD・グッズはオンラインストアにて販売中です。
          </p>
        </div>
        <a
          href={SHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow inline-flex shrink-0 items-center gap-2 bg-ink px-7 py-4 text-paper transition-colors hover:bg-accent"
        >
          <ShoppingBag className="size-4" />
          ストアを見る
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Nonfiction />
      <LiveSchedule />
      <Discography />
      <ShopBand />
      <RoomLive />
    </>
  );
}
