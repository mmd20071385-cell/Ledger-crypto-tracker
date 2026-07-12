"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMarketChart } from "@/lib/hooks/useCoins";
import { formatPrice, cx } from "@/lib/utils";

const RANGES: { label: string; days: number }[] = [
  { label: "۲۴ساعت", days: 1 },
  { label: "۷روز", days: 7 },
  { label: "۳۰روز", days: 30 },
  { label: "۱سال", days: 365 },
];

export default function PriceChart({ coinId }: { coinId: string }) {
  const [days, setDays] = useState(7);
  const { data, isLoading, isError } = useMarketChart(coinId, days);

  const points = (data?.prices ?? []).map(([ts, price]) => ({
    ts,
    price,
    label:
      days <= 1
        ? new Date(ts).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
        : new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  }));

  const first = points[0]?.price ?? 0;
  const last = points[points.length - 1]?.price ?? 0;
  const positive = last >= first;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex rounded-md border border-ink-line bg-ink p-0.5">
          {RANGES.map((r) => (
            <button
              key={r.days}
              onClick={() => setDays(r.days)}
              className={cx(
                "rounded px-2.5 py-1 font-mono text-xs transition-colors",
                days === r.days
                  ? "bg-brass text-ink font-semibold"
                  : "text-paper-dim hover:text-paper"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-56 w-full">
        {isLoading ? (
          <div className="flex h-full items-center justify-center font-body text-xs text-paper-faint">
            در حال بارگذاری نمودار…
          </div>
        ) : isError || points.length === 0 ? (
          <div className="flex h-full items-center justify-center font-body text-xs text-paper-faint">
            داده نمودار در دسترس نیست.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={points} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={positive ? "#3FBE83" : "#E0596B"}
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="100%"
                    stopColor={positive ? "#3FBE83" : "#E0596B"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="label"
                tick={{ fill: "#6B7180", fontSize: 11, fontFamily: "var(--font-mono)" }}
                axisLine={{ stroke: "#2A3140" }}
                tickLine={false}
                minTickGap={40}
              />
              <YAxis
                domain={["dataMin", "dataMax"]}
                tick={{ fill: "#6B7180", fontSize: 11, fontFamily: "var(--font-mono)" }}
                axisLine={false}
                tickLine={false}
                width={64}
                tickFormatter={(v) => formatPrice(v)}
              />
              <Tooltip
                contentStyle={{
                  background: "#1B202B",
                  border: "1px solid #2A3140",
                  borderRadius: 8,
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                }}
                labelStyle={{ color: "#9DA3B0" }}
                formatter={(value: number) => [formatPrice(value), "قیمت"]}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={positive ? "#3FBE83" : "#E0596B"}
                strokeWidth={2}
                fill="url(#chartFill)"
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
