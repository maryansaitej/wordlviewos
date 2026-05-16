import { copyText } from "../utils/export";
import StackChart from "./StackChart";

export default function Snapshots({ behavioralScores, replay, contradictions, snapshotText, copied, setCopied }) {
  async function copySnapshot() {
    await copyText(snapshotText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="page-grid">
      <div className="panel wide-panel">
        <p className="eyebrow">Worldview Snapshots</p>
        <h2>Shareable cards for a changing self.</h2>
        <p className="large-copy">
          Export a clean text snapshot now. The visual card below is designed to be screenshotted and shared.
        </p>
        <div className="hero-actions">
          <button className="seal-button" onClick={copySnapshot}>{copied ? "Copied" : "Copy Snapshot Text"}</button>
          <a className="ghost-button" href={`data:text/plain;charset=utf-8,${encodeURIComponent(snapshotText)}`} download="worldview-snapshot.txt">
            Export Text
          </a>
        </div>
      </div>

      <article className="snapshot-card wide-panel">
        <p className="eyebrow">My current life philosophy</p>
        <h2>{behavioralScores.stack[0].name} / {behavioralScores.stack[1].name}</h2>
        <StackChart stack={behavioralScores.stack.slice(0, 5)} />
        <div className="stone-callout">{replay.summary}</div>
        <p>{contradictions[0].title}: {contradictions[0].suggestion}</p>
      </article>
    </section>
  );
}
