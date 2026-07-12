"use client";

export default function Pagination({
  page,
  onPageChange,
  disabled,
  canGoNext,
}: {
  page: number;
  onPageChange: (page: number) => void;
  disabled: boolean;
  canGoNext: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-1 py-4">
      <button
        type="button"
        disabled={page <= 1 || disabled}
        onClick={() => onPageChange(page - 1)}
        className="rounded-md border border-ink-line px-3 py-1.5 font-body text-xs text-paper-dim transition-colors hover:text-paper disabled:opacity-30 disabled:hover:text-paper-dim"
      >
        صفحه قبل
      </button>
      <span className="font-mono text-xs text-paper-faint">صفحه {page}</span>
      <button
        type="button"
        disabled={!canGoNext || disabled}
        onClick={() => onPageChange(page + 1)}
        className="rounded-md border border-ink-line px-3 py-1.5 font-body text-xs text-paper-dim transition-colors hover:text-paper disabled:opacity-30 disabled:hover:text-paper-dim"
      >
        صفحه بعد
      </button>
    </div>
  );
}
