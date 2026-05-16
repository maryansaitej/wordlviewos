import { philosophies, philosophyOrder } from "../data/philosophies";

export function createEmptyScores() {
  return philosophyOrder.reduce((scores, id) => ({ ...scores, [id]: 0 }), {});
}

export function scoreAnswers(questions, answers) {
  const rawScores = createEmptyScores();

  questions.forEach((question, index) => {
    const optionIndex = answers[index];
    const option = question.options[optionIndex];
    if (!option) return;

    Object.entries(option.weights).forEach(([id, points]) => {
      rawScores[id] += points;
    });
  });

  return buildResult(rawScores);
}

export function buildResult(rawScores) {
  const total = Object.values(rawScores).reduce((sum, value) => sum + value, 0) || 1;
  const stack = philosophyOrder
    .map((id) => ({
      id,
      name: philosophies[id].name,
      symbol: philosophies[id].symbol,
      accent: philosophies[id].accent,
      score: rawScores[id] || 0,
      percentage: Math.round(((rawScores[id] || 0) / total) * 100),
    }))
    .sort((a, b) => b.score - a.score);

  const dominant = stack[0];
  const secondary = stack[1];
  const blindSpot = [...stack].reverse().find((item) => item.score === 0) || stack[stack.length - 1];

  return {
    rawScores,
    stack,
    dominant,
    secondary,
    blindSpot,
    summary: createSummary(dominant, secondary),
    strengths: createStrengths(dominant.id, secondary.id),
    risks: createRisks(dominant.id, blindSpot.id),
    suggestions: createSuggestions(stack.slice(0, 3).map((item) => item.id), blindSpot.id),
  };
}

function createSummary(dominant, secondary) {
  const dominantIdea = philosophies[dominant.id].short.toLowerCase();
  const secondaryIdea = philosophies[secondary.id].short.toLowerCase();
  return `You seem to lean toward ${dominant.name} as your primary operating mode, with ${secondary.name} as a strong secondary influence. Your current worldview values ${dominantIdea} It is also shaped by ${secondaryIdea}`;
}

function createStrengths(primary, secondary) {
  const items = [...philosophies[primary].strengths, ...philosophies[secondary].strengths];
  return [...new Set(items)].slice(0, 5);
}

function createRisks(primary, blindSpot) {
  return [
    ...philosophies[primary].dangers.slice(0, 2),
    `Underusing ${philosophies[blindSpot].name} may leave less room for ${philosophies[blindSpot].coreIdeas[0].toLowerCase()}.`,
  ];
}

function createSuggestions(topIds, blindSpot) {
  const suggestions = topIds.map((id) => `Explore ${philosophies[id].name}: ${philosophies[id].practicalPrinciples[0]}`);
  suggestions.push(`Balance the stack with ${philosophies[blindSpot].name}: ${philosophies[blindSpot].practicalPrinciples[0]}`);
  return suggestions;
}

export function createSnapshot(result) {
  return {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    scores: result.rawScores,
    stack: result.stack,
    dominant: result.dominant.id,
    secondary: result.secondary.id,
    summary: result.summary,
  };
}

export function describeTrends(history) {
  if (history.length < 2) return ["Take the quiz again later to reveal how your worldview changes over time."];

  const first = history[0].scores;
  const latest = history[history.length - 1].scores;

  return philosophyOrder
    .map((id) => {
      const diff = latest[id] - first[id];
      if (diff > 2) return `Your ${philosophies[id].name} score has increased over time.`;
      if (diff < -2) return `Your ${philosophies[id].name} score has decreased slightly.`;
      return null;
    })
    .filter(Boolean)
    .slice(0, 4)
    .concat(
      history[history.length - 1].dominant !== history[0].dominant
        ? [`Your dominant philosophy has shifted from ${philosophies[history[0].dominant].name} to ${philosophies[history[history.length - 1].dominant].name}.`]
        : [`${philosophies[history[history.length - 1].dominant].name} remains your dominant thread.`]
    );
}
