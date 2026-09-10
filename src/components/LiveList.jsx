import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, MapPin } from "lucide-react";
import { isPast } from "../data/schedule";

function Badge({ children }) {
  return (
    <span className="eyebrow shrink-0 border border-ink/25 px-2 py-1 leading-none text-ink-2">
      {children}
    </span>
  );
}

/** One dated entry. `compact` drops the detail table for the homepage. */
export function LiveEntry({ item, compact = false }) {
  const past = isPast(item);
  const featured = item.featured && !past;

  return (
    <article
      className={[
        "flex flex-col gap-3 py-6 sm:flex-row sm:gap-8",
        past ? "opacity-45" : "",
        featured ? "-mx-5 bg-nf-black px-5 text-nf-white" : "",
      ].join(" ")}
    >
      <div className="flex shrink-0 items-center gap-3 sm:w-32 sm:flex-col sm:items-start sm:gap-2">
        <time
          className={`display text-2xl leading-none ${featured ? "text-nf-gold" : "text-accent"}`}
        >
          {item.date}
        </time>
        {past && (
          <div className="flex gap-2">
            <Badge>終了</Badge>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`flex items-center gap-1.5 text-xs ${featured ? "text-nf-gold" : "text-ink-3"}`}
        >
          <MapPin className="size-3.5 shrink-0" />
          {item.area}
        </p>

        <h3
          className={[
            "mt-1.5 leading-snug font-medium",
            featured
              ? "display-lower text-xl sm:text-2xl"
              : "text-base sm:text-lg",
          ].join(" ")}
        >
          {item.title}
        </h3>

        {item.lead && (
          <p
            className={`mt-1.5 text-sm ${featured ? "text-nf-gold-2" : "text-ink-2"}`}
          >
            {item.lead}
          </p>
        )}

        {item.alert && (
          <p className="mt-3 inline-flex items-start gap-1.5 bg-paper-2 px-3 py-2 text-xs text-ink-2">
            <AlertTriangle className="mt-px size-3.5 shrink-0 text-accent" />
            {item.alert}
          </p>
        )}

        {!compact && (
          <>
            {item.times?.map((t) => (
              <p
                key={t}
                className={`mt-2.5 text-sm ${featured ? "text-nf-white/85" : "text-ink-2"}`}
              >
                {t}
              </p>
            ))}

            {item.details && (
              <dl className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-[auto_1fr]">
                {item.details.map((d) => (
                  <div key={d.label} className="contents">
                    <dt
                      className={`eyebrow pt-0.5 ${featured ? "text-nf-gold" : "text-ink-3"}`}
                    >
                      {d.label}
                    </dt>
                    <dd
                      className={`text-sm ${featured ? "text-nf-white/90" : ""}`}
                    >
                      {d.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {item.notes?.map((n) => (
              <p
                key={n}
                className={`mt-2.5 text-xs ${featured ? "text-nf-gold-2" : "text-ink-3"}`}
              >
                ※ {n}
              </p>
            ))}

            {item.tbd && (
              <p className="mt-2.5 text-xs text-ink-3">
                ※ 詳細は決まり次第公開いたします
              </p>
            )}

            {item.to && (
              <Link
                to={item.to}
                className="eyebrow group mt-5 inline-flex items-center gap-2 border-b border-nf-gold/50 pb-1 text-nf-gold transition-colors hover:border-nf-gold hover:text-nf-gold-2"
              >
                公演詳細
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </>
        )}
      </div>
    </article>
  );
}
