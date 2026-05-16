import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { philosophies, philosophyOrder } from "../data/philosophies";
import { describeTrends } from "../utils/scoring";
import StackChart from "./StackChart";

export default function Dashboard({ history, currentResult, onStart }) {
  const chartData = history.map((snapshot, index) => ({
    name: `Attempt ${index + 1}`,
    date: new Date(snapshot.date).toLocaleDateString(),
    ...snapshot.scores,
  }));
  const trends = describeTrends(history);

  return (
    <section className="page-grid">
      <div className="panel">
        <p className="eyebrow">Map of the self</p>
        <h2>Worldview Evolution</h2>
        <p className="large-copy">
          Every completed quiz becomes a dated snapshot, so your philosophy can be treated as a living pattern rather than a permanent label.
        </p>
      </div>

      <div className="panel">
        <h3>Current stack</h3>
        {currentResult ? <StackChart stack={currentResult.stack} /> : <p>No quiz results yet.</p>}
      </div>

      <div className="panel wide-panel">
        <h3>Change over time</h3>
        {history.length ? (
          <div className="chart-wrap evolution-chart">
            <ResponsiveContainer width="100%" height={340}>
              <LineChart data={chartData} margin={{ top: 12, right: 24, bottom: 8, left: 0 }}>
                <CartesianGrid stroke="var(--line)" strokeDasharray="3 5" />
                <XAxis dataKey="name" tick={{ fill: "var(--muted)", fontSize: 12 }} />
                <YAxis tick={{ fill: "var(--muted)", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--line)",
                    borderRadius: 8,
                    color: "var(--text)",
                  }}
                />
                <Legend />
                {philosophyOrder.map((id) => (
                  <Line
                    key={id}
                    type="monotone"
                    dataKey={id}
                    name={philosophies[id].name}
                    stroke={philosophies[id].accent}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="empty-state">
            <p>Your timeline is empty. Take the quiz to create your first snapshot.</p>
            <button className="seal-button" onClick={onStart}>Start My Worldview</button>
          </div>
        )}
      </div>

      <article className="panel">
        <h3>Trend notes</h3>
        <ul className="clean-list">{trends.map((trend) => <li key={trend}>{trend}</li>)}</ul>
      </article>

      <article className="panel">
        <h3>Previous attempts</h3>
        <div className="attempt-list">
          {[...history].reverse().map((snapshot, index) => (
            <div className="attempt" key={snapshot.id}>
              <span>{new Date(snapshot.date).toLocaleString()}</span>
              <strong>{philosophies[snapshot.dominant].symbol} {philosophies[snapshot.dominant].name}</strong>
              <p>{index === 0 ? "Latest snapshot" : snapshot.summary}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
