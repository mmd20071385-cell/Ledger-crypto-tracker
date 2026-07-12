"use client";

import Image from "next/image";
import { useEffect } from "react";
import { MarketCoin } from "@/lib/types";
import { formatCompact, formatPercent, formatPrice, cx } from "@/lib/utils";
import PriceChart from "./PriceChart";

export default function CoinDetailDrawer({
  coin,
  onClose,
}: {
  coin: MarketCoin | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const open = Boolean(coin);

  return (
    <div
      className={cx(
        "fixed inset-0 z-50 transition-opacity",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cx(
          "absolute left-0 top-0 h-full w-full max-w-md overflow-y-auto border-r border-ink-line bg-ink-soft transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {coin && (
          <div className="p-6">
            <button
              onClick={onClose}
              className="mb-6 font-body text-xs text-paper-faint hover:text-paper"
            >
              بستن ✕
            </button>

            <div className="mb-5 flex items-center gap-3">
              <Image
                src={coin.image}
                alt=""
                width={40}
                height={40}
                className="rounded-full"
                unoptimized
              />
              <div>
                <h2 className="font-display text-xl font-semibold text-paper">{coin.name}</h2>
                <p className="font-mono text-xs uppercase text-paper-faint">
                  {coin.symbol} · Rank #{coin.market_cap_rank ?? "—"}
                </p>
              </div>
            </div>

            <div className="mb-6 flex items-baseline gap-3">
              <span className="font-mono text-3xl tabular text-paper">
                {formatPrice(coin.current_price)}
              </span>
              <span
                className={cx(
                  "font-mono text-sm tabular",
                  (coin.price_change_percentage_24h_in_currency ?? 0) >= 0
                    ? "text-gain"
                    : "text-loss"
                )}
              >
                {formatPercent(coin.price_change_percentage_24h_in_currency)} (۲۴ساعت)
              </span>
            </div>

            <PriceChart coinId={coin.id} />

            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ink-line pt-5">
              <Stat label="ارزش بازار" value={`$${formatCompact(coin.market_cap)}`} />
              <Stat label="حجم ۲۴ساعت" value={`$${formatCompact(coin.total_volume)}`} />
              <Stat label="بیشترین ۲۴ساعت" value={formatPrice(coin.high_24h)} />
              <Stat label="کمترین ۲۴ساعت" value={formatPrice(coin.low_24h)} />
              <Stat
                label="عرضه در گردش"
                value={`${formatCompact(coin.circulating_supply)} ${coin.symbol.toUpperCase()}`}
              />
              <Stat
                label="بالاترین قیمت تاریخی"
                value={formatPrice(coin.ath)}
                sub={formatPercent(coin.ath_change_percentage)}
              />
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <dt className="eyebrow mb-1">{label}</dt>
      <dd className="font-mono text-sm tabular text-paper">{value}</dd>
      {sub && <dd className="font-mono text-xs tabular text-paper-faint">{sub}</dd>}
    </div>
  );
}
