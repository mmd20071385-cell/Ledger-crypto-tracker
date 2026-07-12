"use client";

import Image from "next/image";
import { MarketCoin, TimeFrame } from "@/lib/types";
import { formatCompact, formatPercent, formatPrice, cx } from "@/lib/utils";
import Sparkline from "./Sparkline";

function changeFor(coin: MarketCoin, timeframe: TimeFrame): number | null {
  switch (timeframe) {
    case "1h":
      return coin.price_change_percentage_1h_in_currency ?? null;
    case "24h":
      return coin.price_change_percentage_24h_in_currency ?? null;
    case "7d":
      return coin.price_change_percentage_7d_in_currency ?? null;
    case "30d":
      return coin.price_change_percentage_30d_in_currency ?? null;
  }
}

export default function CoinRow({
  coin,
  timeframe,
  onSelect,
  index,
}: {
  coin: MarketCoin;
  timeframe: TimeFrame;
  onSelect: () => void;
  index: number;
}) {
  const change = changeFor(coin, timeframe);
  const positive = (change ?? 0) >= 0;

  return (
    <>
      {/* Desktop row */}
      <tr
        onClick={onSelect}
        className="group hidden cursor-pointer border-b border-ink-line/70 transition-colors hover:bg-ink-raised/60 sm:table-row animate-fade-up"
        style={{ animationDelay: `${Math.min(index * 20, 300)}ms` }}
      >
        <td className="py-3 pr-5 font-mono text-xs text-paper-faint tabular">
          {coin.market_cap_rank ?? "—"}
        </td>
        <td className="py-3 pl-4">
          <div className="flex items-center gap-3">
            <Image
              src={coin.image}
              alt=""
              width={24}
              height={24}
              className="rounded-full"
              unoptimized
            />
            <div className="leading-tight">
              <div className="font-body text-sm font-medium text-paper">{coin.name}</div>
              <div className="font-mono text-xs uppercase text-paper-faint">{coin.symbol}</div>
            </div>
          </div>
        </td>
        <td className="py-3 pl-4 text-right font-mono text-sm tabular text-paper">
          {formatPrice(coin.current_price)}
        </td>
        <td
          className={cx(
            "py-3 pl-4 text-right font-mono text-sm tabular",
            positive ? "text-gain" : "text-loss"
          )}
        >
          {formatPercent(change)}
        </td>
        <td className="py-3 pl-4 text-right font-mono text-sm tabular text-paper-dim">
          ${formatCompact(coin.market_cap)}
        </td>
        <td className="py-3 pl-4 text-right font-mono text-sm tabular text-paper-dim">
          ${formatCompact(coin.total_volume)}
        </td>
        <td className="py-3 pl-5">
          <Sparkline data={coin.sparkline_in_7d?.price ?? []} positive={positive} />
        </td>
      </tr>

      {/* Mobile card */}
      <tr className="table-row border-b border-ink-line/70 sm:hidden" onClick={onSelect}>
        <td colSpan={7} className="px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Image
                src={coin.image}
                alt=""
                width={28}
                height={28}
                className="rounded-full"
                unoptimized
              />
              <div className="leading-tight">
                <div className="font-body text-sm font-medium text-paper">{coin.name}</div>
                <div className="font-mono text-xs uppercase text-paper-faint">
                  {coin.symbol} · #{coin.market_cap_rank ?? "—"}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-sm tabular text-paper">
                {formatPrice(coin.current_price)}
              </div>
              <div
                className={cx(
                  "font-mono text-xs tabular",
                  positive ? "text-gain" : "text-loss"
                )}
              >
                {formatPercent(change)}
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}
