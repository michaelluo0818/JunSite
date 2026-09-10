import { PageHeader, Section } from "../components/Section";
import { PROFILE } from "../data/site";

export default function About() {
  return (
    <>
      <PageHeader title="About" ja="プロフィール" />

      <Section>
        <div className="max-w-2xl">
          <p className="display text-4xl sm:text-5xl">{PROFILE.name}</p>
          <p className="mt-3 text-sm text-accent">{PROFILE.tagline}</p>

          {PROFILE.bio.map((para) => (
            <p
              key={para}
              className="mt-6 text-sm leading-[2] text-ink-2 sm:text-[0.95rem]"
            >
              {para}
            </p>
          ))}
        </div>
      </Section>
    </>
  );
}
