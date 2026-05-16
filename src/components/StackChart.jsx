import { Cell, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { philosophies } from "../data/philosophies";

export default function StackChart({ stack }) {
  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={stack} layout="vertical" margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis
            type="category"
            dataKey="name"
            width={114}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted)", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "rgba(159, 116, 64, 0.08)" }}
            formatter={(value) => [`${value}%`, "Stack"]}
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--line)",
              borderRadius: 8,
              color: "var(--text)",
            }}
          />
          <Bar dataKey="percentage" radius={[0, 8, 8, 0]} barSize={18}>
            {stack.map((item) => (
              <Cell key={item.id} fill={philosophies[item.id].accent} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
