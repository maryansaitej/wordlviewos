import { emotionalTags, getDailyPrompt, moods } from "../data/reflections";
import { getDateKey } from "../utils/analytics";

const sliderLabels = ["meaning", "peace", "clarity", "discipline", "connection"];

export default function DailyReflection({ reflections, mode, onSave }) {
  const todayKey = getDateKey();
  const existing = reflections.find((item) => item.dateKey === todayKey);
  const prompt = existing?.prompt ? { text: existing.prompt, weights: existing.promptWeights } : getDailyPrompt(new Date(), mode);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const tags = emotionalTags.filter((tag) => data.get(tag) === "on");
    const reflection = {
      id: existing?.id || crypto.randomUUID(),
      dateKey: todayKey,
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      prompt: prompt.text,
      promptWeights: prompt.weights,
      mood: data.get("mood"),
      tags,
      journal: data.get("journal").trim(),
      sliders: Object.fromEntries(sliderLabels.map((label) => [label, Number(data.get(label))])),
    };
    onSave(reflection);
  }

  return (
    <section className="page-grid">
      <div className="panel reflection-hero">
        <p className="eyebrow">Daily Reflection</p>
        <h2>{prompt.text}</h2>
        <p className="large-copy">
          This is the center of Worldview OS: a small daily record of what life asked of you and which philosophy you practiced in response.
        </p>
      </div>

      <form className="panel reflection-form" onSubmit={handleSubmit}>
        <h3>Today’s entry</h3>

        <div className="field-group">
          <label>Mood</label>
          <div className="chip-grid">
            {moods.map((mood) => (
              <label className="select-chip" key={mood}>
                <input type="radio" name="mood" value={mood} defaultChecked={(existing?.mood || "calm") === mood} />
                <span>{mood}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="field-group">
          <label>Emotional tags</label>
          <div className="chip-grid">
            {emotionalTags.map((tag) => (
              <label className="select-chip" key={tag}>
                <input type="checkbox" name={tag} defaultChecked={existing?.tags?.includes(tag)} />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="slider-grid">
          {sliderLabels.map((label) => (
            <label className="range-row" key={label}>
              <span>{label}</span>
              <input name={label} type="range" min="1" max="10" defaultValue={existing?.sliders?.[label] || 5} />
            </label>
          ))}
        </div>

        <label className="journal-box">
          <span>Short journal</span>
          <textarea
            name="journal"
            rows="7"
            placeholder="Write a few honest lines. No performance, no audience."
            defaultValue={existing?.journal || ""}
          />
        </label>

        <button className="seal-button" type="submit">{existing ? "Update Reflection" : "Save Reflection"}</button>
      </form>

      <div className="panel">
        <h3>Reflection history</h3>
        <div className="attempt-list">
          {[...reflections].reverse().map((reflection) => (
            <article className="attempt" key={reflection.id}>
              <span>{new Date(reflection.createdAt).toLocaleDateString()}</span>
              <strong>{reflection.mood} · {reflection.tags?.join(", ") || "untagged"}</strong>
              <p>{reflection.prompt}</p>
              {reflection.journal && <p className="history-journal">{reflection.journal}</p>}
            </article>
          ))}
          {!reflections.length && <p>Your first entry will appear here after you save today’s reflection.</p>}
        </div>
      </div>
    </section>
  );
}
