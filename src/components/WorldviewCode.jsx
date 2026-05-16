import { philosophies, philosophyOrder } from "../data/philosophies";
import { principles } from "../data/principles";
import { buildWorldviewText, copyText } from "../utils/export";

export default function WorldviewCode({ selectedPrinciples, onToggle, onReset, copied, setCopied }) {
  const text = buildWorldviewText(selectedPrinciples);
  const selectedCount = Object.values(selectedPrinciples).reduce(
    (sum, group) => sum + Object.values(group).filter(Boolean).length,
    0
  );

  async function handleCopy() {
    await copyText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className="page-grid">
      <div className="panel">
        <p className="eyebrow">My Worldview Code</p>
        <h2>Your personal life operating system.</h2>
        <p className="large-copy">
          {selectedCount
            ? `${selectedCount} principles are currently active across your philosophy stack.`
            : "Toggle principles in the explorer or use the list below to start composing your code."}
        </p>
        <div className="hero-actions">
          <button className="seal-button" onClick={handleCopy}>{copied ? "Copied" : "Copy Code"}</button>
          <a className="ghost-button" href={`data:text/plain;charset=utf-8,${encodeURIComponent(text)}`} download="worldview-code.txt">
            Export Text
          </a>
          <button className="text-button danger" onClick={onReset}>Reset all data</button>
        </div>
      </div>

      <div className="panel code-preview">
        <pre>{text}</pre>
      </div>

      <div className="panel wide-panel">
        <h3>Enable or disable principles</h3>
        <div className="code-toggle-grid">
          {philosophyOrder.map((id) => (
            <article className="mini-tablet" key={id}>
              <h4><span style={{ color: philosophies[id].accent }}>{philosophies[id].symbol}</span> {philosophies[id].name}</h4>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
