import { useCallback, useEffect, useState } from "react";
import {
  AlertTriangle,
  ChevronDown,
  Copy,
  Download,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import fallbackFile from "../../public/schedule.json";
import {
  isPast,
  normalizeShow,
  parseSchedule,
  SCHEDULE_URL,
} from "../data/schedule";
import { LiveEntry } from "../components/LiveList";

/* ================================================================
   Field helpers — lists are edited as one-per-line text, which is far
   easier to explain than JSON arrays.
   ================================================================ */

const linesToArray = (text) =>
  text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

const detailsToLines = (details) =>
  details.map((d) => `${d.label}：${d.value}`).join("\n");

const linesToDetails = (text) =>
  linesToArray(text).map((line) => {
    const m = /^(.*?)[：:](.*)$/.exec(line);
    return m
      ? { label: m[1].trim(), value: m[2].trim() }
      : { label: "", value: line };
  });

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="eyebrow text-ink-3">{label}</span>
      {hint && (
        <span className="mt-1 block text-[11px] text-ink-3">{hint}</span>
      )}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full border border-ink/20 bg-white px-3 py-2 text-sm outline-none focus:border-accent";

/* ================================================================
   One show's form
   ================================================================ */

function ShowForm({ show, open, onToggle, onChange, onRemove }) {
  const set = (patch) => onChange({ ...show, ...patch });

  return (
    <li className="border border-ink/15 bg-paper">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <span className="display w-20 shrink-0 text-lg text-accent">
          {show.date || "—"}
        </span>
        <span className="min-w-0 flex-1 truncate text-sm">
          {show.area && <span className="text-ink-3">{show.area}　</span>}
          {show.title || "（無題）"}
        </span>
        {isPast(show) && (
          <span className="eyebrow shrink-0 text-ink-3">終了</span>
        )}
        <ChevronDown
          className={`size-4 shrink-0 text-ink-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="grid gap-4 border-t border-ink/10 p-4 sm:grid-cols-2">
          <Field label="公演日" hint="複数日のときは最終日">
            <input
              type="date"
              value={show.iso}
              onChange={(e) => set({ iso: e.target.value, date: "" })}
              className={inputClass}
            />
          </Field>

          <Field label="表示する日付" hint="空欄なら公演日から自動（例 9/13）">
            <input
              type="text"
              value={show.date}
              placeholder="9/4・5"
              onChange={(e) => set({ date: e.target.value })}
              className={inputClass}
            />
          </Field>

          <Field label="地域">
            <input
              type="text"
              value={show.area}
              placeholder="札幌"
              onChange={(e) => set({ area: e.target.value })}
              className={inputClass}
            />
          </Field>

          <Field label="タイトル">
            <input
              type="text"
              value={show.title}
              onChange={(e) => set({ title: e.target.value })}
              className={inputClass}
            />
          </Field>

          <Field label="ひとこと" hint="タイトルの下に表示されます">
            <input
              type="text"
              value={show.lead}
              onChange={(e) => set({ lead: e.target.value })}
              className={inputClass}
            />
          </Field>

          <Field
            label="重要なお知らせ"
            hint="日程変更など。目立つ枠で表示されます"
          >
            <input
              type="text"
              value={show.alert}
              onChange={(e) => set({ alert: e.target.value })}
              className={inputClass}
            />
          </Field>

          <Field label="時間" hint="1行につき1つ">
            <textarea
              rows={2}
              value={show.times.join("\n")}
              placeholder="Open 18:30 ／ Start 19:00"
              onChange={(e) => set({ times: linesToArray(e.target.value) })}
              className={`${inputClass} resize-y`}
            />
          </Field>

          <Field label="詳細" hint="「ラベル：内容」を1行につき1つ">
            <textarea
              rows={4}
              value={detailsToLines(show.details)}
              placeholder={"料金：¥3,500 +1D\n会場：〇〇ホール"}
              onChange={(e) => set({ details: linesToDetails(e.target.value) })}
              className={`${inputClass} resize-y`}
            />
          </Field>

          <Field label="備考" hint="1行につき1つ。※付きで表示されます">
            <textarea
              rows={2}
              value={show.notes.join("\n")}
              onChange={(e) => set({ notes: linesToArray(e.target.value) })}
              className={`${inputClass} resize-y`}
            />
          </Field>

          <Field
            label="リンク先"
            hint="サイト内の特設ページなど（例 /nonfiction）"
          >
            <input
              type="text"
              value={show.to}
              onChange={(e) => set({ to: e.target.value })}
              className={inputClass}
            />
          </Field>

          <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={show.tbd}
                onChange={(e) => set({ tbd: e.target.checked })}
                className="size-4 accent-[var(--color-accent)]"
              />
              詳細未定として表示
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={show.featured}
                onChange={(e) => set({ featured: e.target.checked })}
                className="size-4 accent-[var(--color-accent)]"
              />
              特集として大きく表示
            </label>

            <button
              type="button"
              onClick={onRemove}
              className="eyebrow ml-auto inline-flex items-center gap-1.5 text-ink-3 transition-colors hover:text-red-700"
            >
              <Trash2 className="size-3.5" />
              この公演を削除
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

/* ================================================================
   Editor
   ================================================================ */

const blankShow = () =>
  normalizeShow(
    { iso: new Date().toISOString().slice(0, 10), area: "", title: "" },
    Date.now(),
  );

/** Drops empty fields so the downloaded file stays readable. */
function toFileShape(shows) {
  return {
    updated: new Date().toISOString().slice(0, 10),
    shows: shows
      .slice()
      .sort((a, b) => a.iso.localeCompare(b.iso))
      .map((s) => {
        const out = { iso: s.iso };
        const auto = s.iso
          ? `${Number(s.iso.slice(5, 7))}/${Number(s.iso.slice(8, 10))}`
          : "";
        if (s.date && s.date !== auto) out.date = s.date;
        if (s.area) out.area = s.area;
        if (s.title) out.title = s.title;
        if (s.lead) out.lead = s.lead;
        if (s.alert) out.alert = s.alert;
        if (s.times.length) out.times = s.times;
        if (s.details.length) out.details = s.details;
        if (s.notes.length) out.notes = s.notes;
        if (s.tbd) out.tbd = true;
        if (s.featured) out.featured = true;
        if (s.to) out.to = s.to;
        return out;
      }),
  };
}

function EditorApp() {
  const [shows, setShows] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [status, setStatus] = useState("loading");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`${SCHEDULE_URL}?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((d) => {
        setShows(parseSchedule(d));
        setStatus("live");
      })
      .catch(() => {
        try {
          setShows(parseSchedule(fallbackFile));
        } catch {
          setShows([]);
        }
        setStatus("stale");
      });
  }, []);

  const update = useCallback(
    (id, next) => setShows((prev) => prev.map((s) => (s.id === id ? next : s))),
    [],
  );

  const json = JSON.stringify(toFileShape(shows), null, 2) + "\n";

  function download() {
    const url = URL.createObjectURL(
      new Blob([json], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "schedule.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the download button still works */
    }
  }

  function addShow() {
    const s = blankShow();
    setShows((prev) => [...prev, s]);
    setOpenId(s.id);
  }

  const pastCount = shows.filter(isPast).length;

  if (status === "loading") {
    return (
      <div className="flex min-h-dvh items-center justify-center text-ink-3">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-paper-2">
      <header className="sticky top-0 z-40 border-b border-ink/15 bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-5 py-3">
          <h1 className="display mr-auto text-lg">ライブ情報エディター</h1>

          <button
            type="button"
            onClick={copy}
            className="eyebrow inline-flex items-center gap-1.5 border border-ink/25 px-4 py-2.5 transition-colors hover:border-accent hover:text-accent"
          >
            <Copy className="size-3.5" />
            {copied ? "コピーしました" : "コピー"}
          </button>
          <button
            type="button"
            onClick={download}
            className="eyebrow inline-flex items-center gap-1.5 bg-ink px-4 py-2.5 text-paper transition-colors hover:bg-accent"
          >
            <Download className="size-3.5" />
            ダウンロード
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        {status === "stale" && (
          <p className="mb-6 flex items-start gap-2 border border-accent/40 bg-paper p-4 text-sm text-ink-2">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-accent" />
            サーバー上の schedule.json
            を読み込めませんでした。サイトに組み込まれた古いデータを表示しています。
            このまま保存すると最新の内容が失われる可能性があります。
          </p>
        )}

        <p className="mb-6 bg-paper p-4 text-sm leading-relaxed text-ink-2">
          公演を編集したら「ダウンロード」を押して、保存された{" "}
          <code>schedule.json</code> を
          サーバー上の同じ名前のファイルに上書きしてください。数分でサイトに反映されます。
        </p>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* ---- form ---- */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="eyebrow text-ink-3">公演 {shows.length}件</h2>
              {pastCount > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setShows((prev) => prev.filter((s) => !isPast(s)))
                  }
                  className="eyebrow text-ink-3 underline underline-offset-4 hover:text-accent"
                >
                  終了した{pastCount}件を削除
                </button>
              )}
              <button
                type="button"
                onClick={addShow}
                className="eyebrow ml-auto inline-flex items-center gap-1.5 border border-ink/25 px-3 py-2 transition-colors hover:border-accent hover:text-accent"
              >
                <Plus className="size-3.5" />
                公演を追加
              </button>
            </div>

            <ul className="space-y-2">
              {shows.map((show) => (
                <ShowForm
                  key={show.id}
                  show={show}
                  open={openId === show.id}
                  onToggle={() =>
                    setOpenId(openId === show.id ? null : show.id)
                  }
                  onChange={(next) => update(show.id, next)}
                  onRemove={() =>
                    setShows((prev) => prev.filter((s) => s.id !== show.id))
                  }
                />
              ))}
            </ul>
          </div>

          {/* ---- preview, rendered with the real site components ---- */}
          <div>
            <h2 className="eyebrow mb-4 text-ink-3">サイトでの表示</h2>
            <div className="sticky top-24 max-h-[75vh] overflow-y-auto bg-paper px-5">
              <div className="divide-y divide-ink/10">
                {shows
                  .slice()
                  .sort((a, b) => a.iso.localeCompare(b.iso))
                  .map((show) => (
                    <LiveEntry key={show.id} item={normalizeShow(show, 0)} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Editor() {
  useEffect(() => {
    document.title = "ライブ情報エディター | JUN";
  }, []);

  return <EditorApp />;
}
