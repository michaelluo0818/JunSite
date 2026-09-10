import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* Stand-in for the pages that have not been built yet, so nothing in
   the navigation is a dead link. Delete a route's use of this as soon
   as the real page exists. */
export default function Placeholder({ title, ja }) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-6xl flex-col justify-center px-5 py-24">
      <p className="eyebrow text-ink-3">{ja}</p>
      <h1 className="display mt-4 text-4xl sm:text-6xl">{title}</h1>
      <p className="mt-6 text-sm text-ink-2">準備中です。しばらくお待ちください。</p>
      <Link
        to="/"
        className="eyebrow group mt-10 inline-flex items-center gap-2 self-start border-b border-ink/25 pb-1 transition-colors hover:border-accent hover:text-accent"
      >
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
        Home
      </Link>
    </section>
  );
}
