import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { PageHeader, Section } from "../components/Section";
import { CONTACT_EMAIL } from "../data/site";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard unavailable — the address is selectable on screen. */
    }
  };

  return (
    <>
      <PageHeader title="Contact" ja="お問い合わせ" />

      <Section>
        <div className="max-w-2xl">
          <p className="text-sm leading-[2] text-ink-2">
            ライブ出演のご依頼、チケットに関するお問い合わせ、
            取材・メディア出演のご依頼などは、下記のメールアドレスまでご連絡ください。
          </p>

          <div className="mt-10 border border-ink/15 bg-paper-2 p-7 sm:p-9">
            <p className="eyebrow text-ink-3">メールアドレス</p>
            <p className="mt-3 text-lg break-all sm:text-2xl">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="underline decoration-ink/25 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {CONTACT_EMAIL}
              </a>
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="eyebrow inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-accent"
              >
                <Mail className="size-4" />
                メールを送る
              </a>
              <button
                type="button"
                onClick={copy}
                className="eyebrow inline-flex items-center gap-2 border border-ink/25 px-6 py-3.5 transition-colors hover:border-accent hover:text-accent"
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? "コピーしました" : "アドレスをコピー"}
              </button>
            </div>
          </div>

          <div className="mt-10 space-y-4 text-sm leading-[2] text-ink-2">
            <p>
              お問い合わせの際は、お名前・ご連絡先・お問い合わせ内容を
              ご記入くださいますようお願い申し上げます。
            </p>
            <p>
              内容を確認のうえ、順次ご返信いたします。
              なお、ご返信までにお時間をいただく場合がございます。
              あらかじめご了承くださいますようお願いいたします。
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
