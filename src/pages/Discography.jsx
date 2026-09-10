import { ArrowUpRight } from "lucide-react";
import { PageHeader, Section } from "../components/Section";
import { RELEASES, SHOP_URL } from "../data/site";

export default function Discography() {
  return (
    <>
      <PageHeader title="Discography" ja="作品" />

      <Section>
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4">
          {RELEASES.map((r) => (
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
                <p className="display-lower mt-4 inline-flex items-start gap-1 text-base leading-snug transition-colors group-hover:text-accent sm:text-lg">
                  {r.title}
                  <ArrowUpRight className="mt-1 size-3.5 shrink-0" />
                </p>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-14 flex flex-col gap-4 bg-paper-2 p-6 text-sm text-ink-2 sm:flex-row sm:items-center sm:justify-between">
          <span>※ 各作品はオンラインストアにて販売中です。</span>
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow inline-flex shrink-0 items-center gap-2 bg-ink px-5 py-3 text-paper transition-colors hover:bg-accent"
          >
            ストアを見る
            <ArrowUpRight className="size-3.5" />
          </a>
        </p>
      </Section>
    </>
  );
}
