import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/* Section wrapper + heading rule. Mirrors the Harvard Film Archive
   pattern: an uppercase bold label sitting on a hairline, with an
   optional "view all" pushed to the right. */
export function SectionHeading({ title, ja, to, action = "View All" }) {
  return (
    <div className="rule mb-8 flex items-end justify-between gap-6 pt-5">
      <div>
        <h2 className="display text-[1.35rem] leading-none sm:text-[1.6rem]">{title}</h2>
        {ja && <p className="mt-2 text-xs text-ink-3">{ja}</p>}
      </div>
      {to && (
        <Link
          to={to}
          className="eyebrow group inline-flex shrink-0 items-center gap-1.5 text-ink-2 transition-colors hover:text-accent"
        >
          {action}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

/* Title block that opens a sub-page. */
export function PageHeader({ title, ja, lower = false, children }) {
  return (
    <div className="border-b border-ink/12 bg-paper-2">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <h1 className={`${lower ? "display-lower" : "display"} text-4xl sm:text-6xl`}>{title}</h1>
        {ja && <p className="mt-3 text-sm text-ink-2">{ja}</p>}
        {children}
      </div>
    </div>
  );
}

export function Section({ children, className = "" }) {
  return (
    <section className={`mx-auto max-w-6xl px-5 py-14 sm:py-20 ${className}`}>
      {children}
    </section>
  );
}
