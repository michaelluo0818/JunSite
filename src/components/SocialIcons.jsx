/* lucide dropped brand marks in v1, so the three platform glyphs are
   hand-rolled here. They inherit currentColor like any lucide icon. */

const base = {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
  focusable: false,
};

export function XIcon({ className = "size-4" }) {
  return (
    <svg {...base} className={className}>
      <path d="M17.53 3h3.02l-6.6 7.54L21.75 21h-5.9l-4.62-6.04L5.94 21H2.92l7.06-8.07L2.25 3h6.05l4.18 5.52L17.53 3Zm-1.06 16.2h1.67L7.6 4.72H5.81L16.47 19.2Z" />
    </svg>
  );
}

export function YouTubeIcon({ className = "size-4" }) {
  return (
    <svg {...base} className={className}>
      <path d="M21.58 7.19a2.51 2.51 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42a2.51 2.51 0 0 0-1.77 1.77A26.1 26.1 0 0 0 2 12a26.1 26.1 0 0 0 .42 4.81 2.51 2.51 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.51 2.51 0 0 0 1.77-1.77A26.1 26.1 0 0 0 22 12a26.1 26.1 0 0 0-.42-4.81ZM10 15.02V8.98L15.2 12 10 15.02Z" />
    </svg>
  );
}

export function TikTokIcon({ className = "size-4" }) {
  return (
    <svg {...base} className={className}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3c-1.29 0-2.48-.53-3.24-1.48Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "size-4" }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.29a6.55 6.55 0 1 0 0 13.1 6.55 6.55 0 0 0 0-13.1Zm0 10.8a4.25 4.25 0 1 1 0-8.5 4.25 4.25 0 0 1 0 8.5Zm8.34-11.06a1.53 1.53 0 1 1-3.06 0 1.53 1.53 0 0 1 3.06 0Z" />
    </svg>
  );
}

export const SOCIAL_ICONS = {
  X: XIcon,
  YouTube: YouTubeIcon,
  TikTok: TikTokIcon,
  Instagram: InstagramIcon,
};
