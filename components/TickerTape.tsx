"use client";

import { useMarkets } from "@/lib/hooks/useCoins";
import { formatPercent, formatPrice, cx } from "@/lib/utils";

export default function TickerTape() {
  const { data } = useMarkets({
    page: 1,
    category: "all",
    sort: "market_cap_desc",
  });

  const coins = (data ?? []).slice(0, 12);

  if (coins.length === 0) {
    return <div className="h-10 border-b border-ink-line bg-ink-soft" />;
  }

  // Duplicate the list so the marquee loop is seamless.
  const strip = [...coins, ...coins];

  return (
    <div className="relative overflow-hidden border-b border-ink-line bg-ink-soft">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-ink-soft to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-ink-soft to-transparent" />
      <div className="flex w-max animate-marquee items-center py-2 font-mono text-[13px]">
        {strip.map((coin, idx) => {
          const change = coin.price_change_percentage_24h_in_currency ?? 0;
          const positive = change >= 0;
          return (
            <div
              key={`${coin.id}-${idx}`}
              className="flex items-center gap-2 border-r border-ink-line px-5 tabular"
            >
              <span className="text-paper-dim uppercase">{coin.symbol}</span>
              <span className="text-paper">{formatPrice(coin.current_price)}</span>
              <span className={cx(positive ? "text-gain" : "text-loss")}>
                {formatPercent(change)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
