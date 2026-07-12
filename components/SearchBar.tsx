"use client";

export default function SearchBar({
  value,
  onChange,
  isSearching,
}: {
  value: string;
  onChange: (value: string) => void;
  isSearching: boolean;
}) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="جستجوی نام یا نماد ارز…"
        className="w-full rounded-md border border-ink-line bg-ink-surface px-4 py-2.5 pl-9 font-body text-sm text-paper placeholder:text-paper-faint focus:border-brass/60"
        aria-label="جستجوی ارزها"
      />
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
        {isSearching ? (
          <span className="block h-3.5 w-3.5 animate-spin rounded-full border-2 border-paper-faint border-t-brass" />
        ) : (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            className="text-paper-faint"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </div>
    </div>
  );
}
