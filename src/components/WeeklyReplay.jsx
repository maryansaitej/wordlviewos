import { philosophies } from "../data/philosophies";

export default function WeeklyReplay({ replay, contradictions }) {
  return (
    <section className="page-grid">
      <div className="panel wide-panel replay-panel">
        <p className="eyebrow">Weekly Philosophy Replay</p>
        <h2>{replay.summary}</h2>
      </div>

      <article className="panel">
        <h3>Emotional weather</h3>
        <ul className="clean-list">
          <li>Dominant mood: {replay.dominantMood}</li>
          <li>Recurring struggles: {replay.recurringStruggles.join(", ")}</li>
        </ul>
      </article>

      <article className="panel">
        <h3>Guidance pattern</h3>
        <p>{replay.responsePattern}</p>
        <p>{replay.worldviewShift}</p>
      </article>

      <article className="panel">
        <h3>Strongest principles</h3>
        <ul className="clean-list">
          {replay.strongestPrinciples.map((item) => (
            <li key={`${item.id}-${item.principle}`}>{philosophies[item.id].symbol} {item.principle}</li>
          ))}
          {!replay.strongestPrinciples.length && <li>No principles selected yet.</li>}
        </ul>
      </article>

      <article className="panel">
        <h3>Contradiction detected</h3>
        <p>{contradictions[0].title}</p>
        <div className="stone-callout">{contradictions[0].suggestion}</div>
      </article>
    </section>
  );
}
