import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { NAV, SOCIALS } from "../data/site";
import { SOCIAL_ICONS } from "./SocialIcons";

/* ---------------------------------------------------------------
   Every destination is on screen at all times — no hamburger, no
   drawer, nothing behind a tap. The link row simply wraps onto as
   many lines as it needs.

   It is sticky only from lg up: on a phone the wrapped rows are tall
   enough that pinning them would eat a sixth of the screen, so there
   the header scrolls away and the full menu repeats in the footer.
   --------------------------------------------------------------- */

function SocialRow({ className = "", iconClass = "size-4" }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {SOCIALS.map(({ name, href }) => {
        const Icon = SOCIAL_ICONS[name];
        return (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="text-ink-2 transition-colors hover:text-accent"
          >
            <Icon className={iconClass} />
          </a>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    [
      "menu-item whitespace-nowrap transition-colors",
      isActive ? "text-accent" : "text-ink hover:text-accent",
    ].join(" ");

  return (
    <header className="z-50 border-b border-ink/12 bg-paper lg:sticky lg:top-0 lg:bg-paper/95 lg:backdrop-blur-sm">
      {/* Row 1 — wordmark + social links */}
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 lg:h-20">
        <Link to="/" className="display text-2xl leading-none tracking-[0.14em] lg:text-3xl">
          JUN
        </Link>
        <SocialRow iconClass="size-4 lg:size-[18px]" />
      </div>

      {/* Row 2 — the whole menu, wrapping as needed */}
      <nav className="border-t border-ink/10">
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-5 py-3 text-[10px] tracking-[0.16em] sm:gap-x-7 sm:text-[11px] sm:tracking-[0.18em] lg:justify-start lg:gap-x-8 lg:py-3.5">
          {NAV.map((item) => (
            <li key={item.to ?? item.href}>
              {item.to ? (
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={linkClass}
                >
                  <span className={item.lower ? "normal-case" : "uppercase"}>{item.label}</span>
                </NavLink>
              ) : (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="menu-item inline-flex items-center gap-0.5 whitespace-nowrap text-ink uppercase transition-colors hover:text-accent"
                >
                  {item.label}
                  <ArrowUpRight className="size-3" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
