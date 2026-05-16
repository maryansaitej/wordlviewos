export default function Landing({ onStart, onNavigate }) {
  return (
    <section className="landing">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Worldview OS</p>
          <h1>Build your personal philosophy for life.</h1>
          <p className="hero-text">
            A calm, private, client-side space for discovering the ideas that guide your choices,
            tracking how they evolve, and turning them into a practical code for living.
          </p>
          <div className="hero-actions">
            <button className="seal-button" onClick={onStart}>Start My Worldview</button>
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
          ["01", "Answer questions", "Reflect on ambition, suffering, freedom, meaning, and uncertainty."],
          ["02", "Discover your stack", "See your philosophical tendencies as a living mix, not a fixed label."],
          ["03", "Build your code", "Choose practical principles that become your personal operating system."],
          ["04", "Track evolution", "Retake the quiz and watch your worldview change over time."],
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
