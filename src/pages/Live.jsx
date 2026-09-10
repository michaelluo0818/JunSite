import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { PageHeader, Section } from "../components/Section";
import { LiveEntry } from "../components/LiveList";
import { useSchedule } from "../hooks/useSchedule";
import { byMonth } from "../data/schedule";
import { LIVE_FOOTNOTE } from "../data/site";

export default function Live() {
  const { shows } = useSchedule();
  const groups = byMonth(shows);

  return (
    <>
      <PageHeader title="Live Schedule" ja="ライブ情報" />

      <Section>
        {groups.map((g) => (
          <section key={g.month} className="mb-14 last:mb-0">
            <h2 className="rule flex items-baseline gap-4 pt-5 pb-6">
              <span className="display text-2xl text-accent sm:text-3xl">{g.month}</span>
              <span className="eyebrow text-ink-3">{g.shows.length} shows</span>
            </h2>
            <div className="divide-y divide-ink/10 border-b border-ink/10">
              {g.shows.map((item) => (
                <LiveEntry key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}

        <p className="mt-12 flex flex-col gap-4 bg-paper-2 p-6 text-sm text-ink-2 sm:flex-row sm:items-center sm:justify-between">
          <span>※ {LIVE_FOOTNOTE}</span>
          <Link
            to="/contact"
            className="eyebrow inline-flex shrink-0 items-center gap-2 bg-ink px-5 py-3 text-paper transition-colors hover:bg-accent"
          >
            <Mail className="size-4" />
            お問い合わせ
          </Link>
        </p>
      </Section>
    </>
  );
}
