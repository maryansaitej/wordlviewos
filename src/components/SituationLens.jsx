import { philosophies, philosophyOrder } from "../data/philosophies";
import { situations } from "../data/situations";

export default function SituationLens({ activeSituation, setActiveSituation, responseChoices, onChooseResponse }) {
  const situation = situations[activeSituation];
  const latestChoice = [...responseChoices].reverse().find((choice) => choice.situation === activeSituation);

  return (
    <section className="page-grid">
      <div className="panel">
        <p className="eyebrow">Situation Lens</p>
        <h2>One life moment, seven philosophical responses.</h2>
        <p className="large-copy">Choose a situation, compare the lenses, then mark which perspective resonates. That choice becomes part of your behavioral worldview.</p>
        <div className="chip-grid">
          {Object.entries(situations).map(([id, item]) => (
            <button
              className={id === activeSituation ? "chip active" : "chip"}
              key={id}
              onClick={() => setActiveSituation(id)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      <div className="panel situation-note">
        <span className="manuscript-note">manuscript note</span>
        <h3>{situation.title}</h3>
        <p>{situation.note}</p>
        {latestChoice && <div className="stone-callout">Last resonant lens: {philosophies[latestChoice.philosophyId].name}</div>}
      </div>

      {philosophyOrder.map((id) => (
        <article className="panel lens-card" key={id}>
          <h3>
            <span style={{ color: philosophies[id].accent }}>{philosophies[id].symbol}</span>
            {philosophies[id].name}
          </h3>
          <p>{situation.responses[id]}</p>
          <button className="ghost-button" onClick={() => onChooseResponse(activeSituation, id)}>
            This resonated
          </button>
        </article>
      ))}
    </section>
  );
}
