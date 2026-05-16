import { philosophies, philosophyOrder } from "../data/philosophies";
import { principles } from "../data/principles";

export default function Explorer({ selectedPrinciples, onToggle }) {
  return (
    <section className="page-grid">
      <div className="panel wide-panel">
        <p className="eyebrow">Philosophy Explorer</p>
        <h2>Ideas for living, not labels for sorting yourself.</h2>
        <p className="large-copy">
          Browse each tradition as a practical lens. Toggle the principles that feel worth practicing; they will appear in your Worldview Code.
        </p>
      </div>

      {philosophyOrder.map((id) => {
        const philosophy = philosophies[id];
        return (
          <article className="panel philosophy-card" key={id}>
            <div className="philosophy-title">
              <span style={{ color: philosophy.accent }}>{philosophy.symbol}</span>
              <div>
                <h3>{philosophy.name}</h3>
                <p>{philosophy.short}</p>
              </div>
            </div>

            <p>{philosophy.explanation}</p>

            <div className="mini-grid">
              <Detail title="Core ideas" items={philosophy.coreIdeas} />
              <Detail title="Useful when" items={[philosophy.situations]} />
              <Detail title="Strengths" items={philosophy.strengths} />
              <Detail title="Dangers" items={philosophy.dangers} />
            </div>

            <div className="principle-toggles">
              <h4>Practical principles</h4>
              {principles[id].map((principle) => (
                <label className="toggle-row" key={principle}>
                  <input
                    type="checkbox"
                    checked={Boolean(selectedPrinciples[id]?.[principle])}
                    onChange={() => onToggle(id, principle)}
                  />
                  <span />
                  {principle}
                </label>
              ))}
            </div>
          </article>
        );
      })}
    </section>
  );
}

function Detail({ title, items }) {
  return (
    <div>
      <h4>{title}</h4>
      <ul className="clean-list small-list">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
