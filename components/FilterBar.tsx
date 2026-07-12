"use client";

import { useCategories } from "@/lib/hooks/useCoins";
import { CoinFilters, SortKey, TimeFrame } from "@/lib/types";
import { cx } from "@/lib/utils";

const TIMEFRAMES: { value: TimeFrame; label: string }[] = [
  { value: "1h", label: "1h" },
  { value: "24h", label: "24h" },
  { value: "7d", label: "7d" },
  { value: "30d", label: "30d" },
];

const SORTS: { value: SortKey; label: string }[] = [
  { value: "market_cap_desc", label: "ارزش بازار ↓" },
  { value: "market_cap_asc", label: "ارزش بازار ↑" },
  { value: "price_desc", label: "قیمت ↓" },
  { value: "price_asc", label: "قیمت ↑" },
  { value: "volume_desc", label: "حجم معاملات ↓" },
  { value: "change_desc", label: "درصد تغییر ↓" },
  { value: "change_asc", label: "درصد تغییر ↑" },
];

export default function FilterBar({
  filters,
  onChange,
}: {
  filters: CoinFilters;
  onChange: (patch: Partial<CoinFilters>) => void;
}) {
  const { data: categories } = useCategories();

  return (
    <div className="rounded-lg border border-ink-line bg-ink-surface/60 p-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {/* Category */}
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow">نوع دارایی</span>
          <select
            value={filters.category}
            onChange={(e) => onChange({ category: e.target.value })}
            className="rounded-md border border-ink-line bg-ink px-2.5 py-2 text-sm text-paper"
          >
            <option value="all">همه دسته‌ها</option>
            {(categories ?? []).slice(0, 60).map((c) => (
              <option key={c.category_id} value={c.category_id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        {/* Min price */}
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow">حداقل قیمت ($)</span>
          <input
            type="number"
            min={0}
            inputMode="decimal"
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
            placeholder="۰"
            className="rounded-md border border-ink-line bg-ink px-2.5 py-2 text-sm text-paper placeholder:text-paper-faint tabular"
          />
        </label>

        {/* Max price */}
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow">حداکثر قیمت ($)</span>
          <input
            type="number"
            min={0}
            inputMode="decimal"
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
            placeholder="نامحدود"
            className="rounded-md border border-ink-line bg-ink px-2.5 py-2 text-sm text-paper placeholder:text-paper-faint tabular"
          />
        </label>

        {/* Timeframe */}
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow">بازه تغییرات</span>
          <div className="flex rounded-md border border-ink-line bg-ink p-0.5">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf.value}
                type="button"
                onClick={() => onChange({ timeframe: tf.value })}
                className={cx(
                  "flex-1 rounded px-2 py-1.5 text-xs font-mono transition-colors",
                  filters.timeframe === tf.value
                    ? "bg-brass text-ink font-semibold"
                    : "text-paper-dim hover:text-paper"
                )}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </label>

        {/* Gainers / losers */}
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow">جهت تغییرات</span>
          <select
            value={filters.changeDirection}
            onChange={(e) =>
              onChange({ changeDirection: e.target.value as CoinFilters["changeDirection"] })
            }
            className="rounded-md border border-ink-line bg-ink px-2.5 py-2 text-sm text-paper"
          >
            <option value="all">همه ارزها</option>
            <option value="gainers">فقط صعودی‌ها</option>
            <option value="losers">فقط نزولی‌ها</option>
          </select>
        </label>

        {/* Sort */}
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow">مرتب‌سازی</span>
          <select
            value={filters.sort}
            onChange={(e) => onChange({ sort: e.target.value as SortKey })}
            className="rounded-md border border-ink-line bg-ink px-2.5 py-2 text-sm text-paper"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
