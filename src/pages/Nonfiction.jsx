import { Link } from "react-router-dom";
import { ArrowUpRight, Ticket } from "lucide-react";
import { NONFICTION } from "../data/site";

/* The tour page runs entirely on the poster's palette — black ground,
   brass gold, warm off-white — so it reads as a continuation of the
   printed artwork rather than a page about it. */
export default function Nonfiction() {
  return (
    <div className="bg-nf-black text-nf-white">
      <section className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
        <p className="eyebrow text-center text-nf-gold">{NONFICTION.eyebrow}</p>
        <h1 className="script mt-4 text-center text-7xl leading-[0.9] sm:text-8xl lg:text-9xl">
          {NONFICTION.title}
        </h1>

        <img
          src="/nonfiction.jpg"
          alt={`${NONFICTION.eyebrow}「${NONFICTION.title}」ポスター`}
          className="mt-12 w-full"
        />

        <div className="mt-14 grid gap-12 sm:grid-cols-2">
          <div>
            <p className="display text-4xl text-nf-gold sm:text-5xl">{NONFICTION.date}</p>
            <div className="mt-6 space-y-1.5 text-sm text-nf-white/85">
              <p>Open {NONFICTION.open}</p>
              <p>Start {NONFICTION.start}</p>
            </div>
            <div className="mt-8 border-t border-nf-grey/30 pt-6">
              <p className="eyebrow text-nf-gold">{NONFICTION.city}</p>
              <p className="display-lower mt-2 text-2xl">{NONFICTION.venue}</p>
              <a
                href={NONFICTION.accessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow group mt-4 inline-flex items-center gap-1.5 border-b border-nf-grey/50 pb-1 text-nf-white/80 transition-colors hover:border-nf-gold hover:text-nf-gold"
              >
                会場までのアクセス
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow text-nf-grey">Ticket</p>
            <dl className="mt-5 space-y-3">
              {NONFICTION.tickets.map((t) => (
                <div
                  key={t.label}
                  className="flex items-baseline justify-between gap-4 border-b border-nf-grey/20 pb-3"
                >
                  <dt className="text-sm text-nf-white/80">{t.label}</dt>
                  <dd className="flex items-baseline gap-3">
                    <span className={t.soldOut ? "text-nf-grey line-through" : "text-nf-white"}>
                      {t.price}
                    </span>
                    {t.soldOut && <span className="eyebrow text-nf-gold">Sold Out</span>}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 space-y-4">
              <a
                href={NONFICTION.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow group inline-flex items-center gap-2 bg-nf-gold px-7 py-4 text-nf-black transition-colors hover:bg-nf-gold-2"
              >
                <Ticket className="size-4" />
                チケットを購入する
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
              </a>
              <p className="text-xs leading-relaxed text-nf-grey">
                チケットに関するお問い合わせは、
                <Link to="/contact" className="underline underline-offset-4 hover:text-nf-gold">
                  お問い合わせページ
                </Link>
                よりご連絡ください。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
