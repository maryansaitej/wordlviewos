import { philosophies } from "../data/philosophies";
import StackChart from "./StackChart";

export default function Results({ result, onRetake, onNavigate }) {
  if (!result) {
    return (
      <section className="panel center-panel">
        <h2>No results yet</h2>
        <p>Take the quiz to generate your first philosophy stack.</p>
        <button className="seal-button" onClick={onRetake}>Start My Worldview</button>
      </section>
    );
  }

  return (
    <section className="page-grid">
      <div className="panel">
        <p className="eyebrow">Your current worldview profile</p>
        <h2>{result.dominant.name}-{result.secondary.name} Stack</h2>
        <p className="large-copy">{result.summary}</p>
        <div className="result-pills">
          <Metric label="Dominant" item={result.dominant} />
          <Metric label="Secondary" item={result.secondary} />
          <Metric label="Blind spot" item={result.blindSpot} />
        </div>
      </div>

      <div className="panel">
        <h3>Philosophy Stack</h3>
        <StackChart stack={result.stack} />
        <div className="stack-list">
          {result.stack.map((item) => (
            <div className="stack-row" key={item.id}>
              <span style={{ color: philosophies[item.id].accent }}>{item.symbol}</span>
              <strong>{item.percentage}%</strong>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <InsightCard title="Strengths" items={result.strengths} />
      <InsightCard title="Risks / blind spots" items={result.risks} />
      <InsightCard title="Suggested ideas to explore" items={result.suggestions} />

      <div className="panel action-panel">
        <button className="seal-button" onClick={() => onNavigate("dashboard")}>View Evolution</button>
        <button className="ghost-button" onClick={() => onNavigate("code")}>Open Worldview Code</button>
        <button className="text-button" onClick={onRetake}>Retake Quiz</button>
      </div>
    </section>
  );
}

function Metric({ label, item }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{item.symbol} {item.name}</strong>
    </div>
  );
}

function InsightCard({ title, items }) {
  return (
    <article className="panel">
      <h3>{title}</h3>
      <ul className="clean-list">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}
