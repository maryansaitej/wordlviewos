export default function Contradictions({ contradictions }) {
  return (
    <section className="page-grid">
      <div className="panel wide-panel">
        <p className="eyebrow">Contradictions</p>
        <h2>The useful tensions inside your operating system.</h2>
        <p className="large-copy">
          A contradiction is not a flaw. It is a place where two real desires are asking to be integrated.
        </p>
      </div>

      {contradictions.map((item) => (
        <article className="panel contradiction-card" key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.explanation}</p>
          <div className="mini-grid">
            {item.sides.map((side) => (
              <div className="mini-tablet" key={side}>{side}</div>
            ))}
          </div>
          <div className="stone-callout">{item.suggestion}</div>
        </article>
      ))}
    </section>
  );
}
