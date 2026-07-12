"use client";

import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";

export default function Sparkline({
  data,
  positive,
}: {
  data: number[];
  positive: boolean;
}) {
  if (!data || data.length === 0) {
    return <div className="h-10 w-28 text-paper-faint text-xs">—</div>;
  }

  const points = data.map((price, i) => ({ i, price }));

  return (
    <div className="h-10 w-28">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <YAxis domain={["dataMin", "dataMax"]} hide />
          <Line
            type="monotone"
            dataKey="price"
            stroke={positive ? "#3FBE83" : "#E0596B"}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
