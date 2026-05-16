import { useState } from "react";
import { decisionFrameworks } from "../data/decisions";
import { philosophies, philosophyOrder } from "../data/philosophies";

export default function DecisionLens({ decisions, onSaveDecision }) {
  const [dilemma, setDilemma] = useState("");
  const [saved, setSaved] = useState(false);
  const activeText = dilemma.trim() || "Write a dilemma above to frame these questions around your real life.";

  function save() {
    if (!dilemma.trim()) return;
    onSaveDecision({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      dilemma: dilemma.trim(),
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  }

  return (
    <section className="page-grid">
      <div className="panel wide-panel">
        <p className="eyebrow">Decision Lens</p>
        <h2>Let each philosophy question the decision.</h2>
        <p className="large-copy">
          No generated advice. Just durable frameworks that help you see the dilemma from several angles.
        </p>
        <label className="journal-box">
          <span>Dilemma, fear, or major decision</span>
          <textarea value={dilemma} onChange={(event) => setDilemma(event.target.value)} rows="4" placeholder="Should I quit my stable job?" />
        </label>
        <button className="seal-button" onClick={save}>{saved ? "Saved" : "Save Decision"}</button>
      </div>

      {philosophyOrder.map((id) => (
        <article className="panel decision-card" key={id}>
          <h3><span style={{ color: philosophies[id].accent }}>{philosophies[id].symbol}</span> {philosophies[id].name}</h3>
          <p className="decision-context">{activeText}</p>
          <ul className="clean-list">
            {decisionFrameworks[id].map((question) => <li key={question}>{question}</li>)}
          </ul>
        </article>
      ))}

      <div className="panel wide-panel">
        <h3>Recent decisions</h3>
        <div className="attempt-list">
          {decisions.map((decision) => (
            <article className="attempt" key={decision.id}>
              <span>{new Date(decision.createdAt).toLocaleString()}</span>
              <p>{decision.dilemma}</p>
            </article>
          ))}
          {!decisions.length && <p>Saved dilemmas will appear here.</p>}
        </div>
      </div>
    </section>
  );
}
