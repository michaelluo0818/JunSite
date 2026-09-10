import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { NAV, SOCIALS, PROFILE } from "../data/site";
import { SOCIAL_ICONS } from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="mt-8 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <p className="display text-4xl leading-none tracking-[0.14em]">JUN</p>
            <p className="mt-3 max-w-xs text-sm text-paper/60">{PROFILE.tagline}</p>
            <div className="mt-6 flex items-center gap-5">
              {SOCIALS.map(({ name, href }) => {
                const Icon = SOCIAL_ICONS[name];
                return (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="text-paper/70 transition-colors hover:text-paper"
                  >
                    <Icon className="size-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:gap-x-16">
            {NAV.map((item) =>
              item.to ? (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`menu-item text-[11px] tracking-[0.18em] text-paper/70 transition-colors hover:text-paper ${
                    item.lower ? "normal-case" : "uppercase"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="menu-item inline-flex items-center gap-1 text-[11px] tracking-[0.18em] text-paper/70 uppercase transition-colors hover:text-paper"
                >
                  {item.label}
                  <ArrowUpRight className="size-3" />
                </a>
              ),
            )}
          </nav>
        </div>

        <p className="mt-14 border-t border-paper/15 pt-6 text-[11px] tracking-wide text-paper/40">
          © {new Date().getFullYear()} JUN. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
