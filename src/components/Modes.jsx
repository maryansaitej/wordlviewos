import { modes } from "../data/modes";

export default function Modes({ activeMode, setActiveMode }) {
  return (
    <section className="page-grid">
      <div className="panel wide-panel">
        <p className="eyebrow">Philosophy Modes</p>
        <h2>Change the lens for a season.</h2>
        <p className="large-copy">
          Modes do not replace your worldview. They temporarily bias prompts, symbols, color, and guidance toward the philosophy you want to practice.
        </p>
      </div>

      {Object.values(modes).map((mode) => (
        <article className={activeMode === mode.id ? "panel mode-card active" : "panel mode-card"} key={mode.id}>
          <span style={{ color: mode.accent }}>{mode.symbol}</span>
          <h3>{mode.name}</h3>
          <p>{mode.description}</p>
          <p className="manuscript-note">{mode.promptBias}</p>
          <button className={activeMode === mode.id ? "seal-button" : "ghost-button"} onClick={() => setActiveMode(mode.id)}>
            {activeMode === mode.id ? "Active" : "Activate"}
          </button>
        </article>
      ))}
    </section>
  );
}
