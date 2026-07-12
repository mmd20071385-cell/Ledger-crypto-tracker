"use client";

import { MarketCoin, TimeFrame } from "@/lib/types";
import CoinRow from "./CoinRow";
import LoadingSkeleton from "./LoadingSkeleton";

const TIMEFRAME_LABEL: Record<TimeFrame, string> = {
  "1h": "۱ساعت",
  "24h": "۲۴ساعت",
  "7d": "۷روز",
  "30d": "۳۰روز",
};

export default function CoinTable({
  coins,
  timeframe,
  isLoading,
  isError,
  onSelect,
}: {
  coins: MarketCoin[];
  timeframe: TimeFrame;
  isLoading: boolean;
  isError: boolean;
  onSelect: (coin: MarketCoin) => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-ink-line">
      <table className="w-full border-collapse">
        <thead>
          <tr className="rule bg-ink-soft text-right">
            <th className="py-3 pr-5 font-mono text-[11px] font-medium tracking-wider text-paper-faint">
              #
            </th>
            <th className="py-3 pl-4 font-body text-[11px] font-medium tracking-wide text-paper-faint">
              دارایی
            </th>
            <th className="py-3 pl-4 text-right font-body text-[11px] font-medium tracking-wide text-paper-faint">
              قیمت
            </th>
            <th className="py-3 pl-4 text-right font-body text-[11px] font-medium tracking-wide text-paper-faint">
              {TIMEFRAME_LABEL[timeframe]}
            </th>
            <th className="hidden py-3 pl-4 text-right font-body text-[11px] font-medium tracking-wide text-paper-faint sm:table-cell">
              ارزش بازار
            </th>
            <th className="hidden py-3 pl-4 text-right font-body text-[11px] font-medium tracking-wide text-paper-faint sm:table-cell">
              حجم (۲۴ساعت)
            </th>
            <th className="hidden py-3 pl-5 text-right font-body text-[11px] font-medium tracking-wide text-paper-faint sm:table-cell">
              ۷ روز اخیر
            </th>
          </tr>
        </thead>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <tbody>
            {coins.map((coin, i) => (
              <CoinRow
                key={coin.id}
                coin={coin}
                timeframe={timeframe}
                index={i}
                onSelect={() => onSelect(coin)}
              />
            ))}
          </tbody>
        )}
      </table>

      {!isLoading && !isError && coins.length === 0 && (
        <div className="flex flex-col items-center gap-1 px-6 py-16 text-center">
          <p className="font-body text-sm text-paper">هیچ ارزی با این فیلترها مطابقت ندارد.</p>
          <p className="font-body text-xs text-paper-faint">
            بازه قیمت یا بازه تغییرات را وسیع‌تر کنید و دوباره امتحان کنید.
          </p>
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center gap-1 px-6 py-16 text-center">
          <p className="font-body text-sm text-loss">اتصال به فید بازار برقرار نشد.</p>
          <p className="font-body text-xs text-paper-faint">
            ممکن است API موقتاً محدود شده باشد — چند ثانیه صبر کنید و دوباره تلاش کنید.
          </p>
        </div>
      )}
    </div>
  );
}
