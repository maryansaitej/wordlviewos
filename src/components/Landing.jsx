export default function Landing({ onStart, onNavigate }) {
  return (
    <section className="landing">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Worldview OS</p>
          <h1>Use philosophy to navigate life.</h1>
          <p className="hero-text">
            A calm, private, client-side operating system for daily reflection, emotional awareness,
            decisions, contradictions, and the philosophy you actually practice.
          </p>
          <div className="hero-actions">
            <button className="seal-button" onClick={() => onNavigate("reflection")}>Reflect Today</button>
            <button className="ghost-button" onClick={() => onNavigate("explorer")}>Explore Ideas</button>
          </div>
        </div>

        <div className="temple-scene" aria-hidden="true">
          <div className="sun-disc" />
          <div className="constellation">
            <span />
            <span />
            <span />
          </div>
          <div className="temple">
            <div className="roof" />
            <div className="columns">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="steps" />
          </div>
          <div className="scroll-card">
            <span>◈</span>
            <span>○</span>
            <span>□</span>
            <span>≈</span>
            <span>⌖</span>
            <span>☉</span>
            <span>△</span>
          </div>
        </div>
      </div>

      <div className="process-row">
        {[
          ["01", "Reflect daily", "Record moods, emotional patterns, and the questions life is asking you."],
          ["02", "Use lenses", "Compare how different philosophies approach anxiety, failure, grief, and decisions."],
          ["03", "Notice tensions", "See where your desires conflict and what would balance them."],
          ["04", "Track evolution", "Watch your worldview change through behavior, not just quiz answers."],
        ].map(([number, title, text]) => (
          <article className="process-card" key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
