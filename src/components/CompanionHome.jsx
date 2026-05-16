import StackChart from "./StackChart";

export default function CompanionHome({ behavioralScores, reflections, replay, contradictions, mode, onNavigate }) {
  const latest = reflections[reflections.length - 1];

  return (
    <section className="page-grid">
      <div className="panel sanctuary-panel wide-panel">
        <p className="eyebrow">Worldview OS</p>
        <h2>Use philosophy to navigate life.</h2>
        <p className="large-copy">
          Your quiz is only the doorway. The operating system is built through daily reflections, choices, emotional patterns, resonant guidance, and the principles you actually practice.
        </p>
        <div className="hero-actions">
          <button className="seal-button" onClick={() => onNavigate("reflection")}>Write Today’s Reflection</button>
          <button className="ghost-button" onClick={() => onNavigate("decision")}>Open Decision Lens</button>
          <button className="ghost-button" onClick={() => onNavigate("situations")}>Use Situation Lens</button>
        </div>
      </div>

      <article className="panel">
        <p className="eyebrow">Current operating mode</p>
        <h3>{mode.name}</h3>
        <p>{mode.description}</p>
        <p className="manuscript-note">Prompt bias: {mode.promptBias}</p>
      </article>

      <article className="panel">
        <p className="eyebrow">Today’s signal</p>
        {latest ? (
          <>
            <h3>{latest.mood}</h3>
            <p>{latest.prompt}</p>
            <p>{latest.tags?.join(", ")}</p>
          </>
        ) : (
          <>
            <h3>No reflection yet</h3>
            <p>Write one entry today and the app will start learning from your behavior.</p>
          </>
        )}
      </article>

      <article className="panel">
        <h3>Behavioral Worldview</h3>
        <StackChart stack={behavioralScores.stack} />
      </article>

      <article className="panel">
        <h3>This week</h3>
        <p>{replay.summary}</p>
        <ul className="clean-list">
          <li>Dominant mood: {replay.dominantMood}</li>
          <li>Recurring struggles: {replay.recurringStruggles.join(", ")}</li>
          <li>{replay.responsePattern}</li>
        </ul>
      </article>

      <article className="panel wide-panel">
        <h3>Contradiction to watch</h3>
        <p>{contradictions[0].explanation}</p>
        <div className="stone-callout">{contradictions[0].title}: {contradictions[0].suggestion}</div>
      </article>
    </section>
  );
}
