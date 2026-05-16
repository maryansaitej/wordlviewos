import { lifeAreas } from "../data/lifeAreas";
import { moodWeights, tagWeights } from "../data/reflections";
import { philosophies, philosophyOrder } from "../data/philosophies";
import { principles } from "../data/principles";

export function getDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function createBehavioralScores({ quizResult, reflections, selectedPrinciples, responseChoices }) {
  const scores = philosophyOrder.reduce((acc, id) => ({ ...acc, [id]: 2 }), {});

  if (quizResult?.rawScores) addWeighted(scores, quizResult.rawScores, 0.35);

  reflections.forEach((reflection) => {
    addWeighted(scores, reflection.promptWeights || {}, 1);
    addWeighted(scores, moodWeights[reflection.mood] || {}, 1);
    reflection.tags?.forEach((tag) => addWeighted(scores, tagWeights[tag] || {}, 1));
    addSliderInfluence(scores, reflection.sliders || {});
  });

  Object.entries(selectedPrinciples || {}).forEach(([philosophyId, group]) => {
    const count = Object.values(group).filter(Boolean).length;
    scores[philosophyId] += count * 1.2;
  });

  responseChoices.forEach((choice) => {
    scores[choice.philosophyId] += 2.4;
  });

  return normalizeScores(scores);
}

export function createLifeAreaProfiles({ behavioralScores, reflections, selectedPrinciples, responseChoices }) {
  return Object.entries(lifeAreas).map(([areaId, area]) => {
    const scores = philosophyOrder.reduce((acc, id) => ({ ...acc, [id]: 1 }), {});
    addWeighted(scores, area.weights, 1.5);
    addWeighted(scores, behavioralScores.rawScores, 0.18);

    reflections.forEach((reflection) => {
      const tagMatches = reflection.tags?.filter((tag) => area.tags.includes(tag)).length || 0;
      if (tagMatches) {
        addWeighted(scores, reflection.promptWeights || {}, tagMatches * 0.8);
        reflection.tags.forEach((tag) => {
          if (area.tags.includes(tag)) addWeighted(scores, tagWeights[tag] || {}, 0.9);
        });
      }
    });

    Object.entries(selectedPrinciples || {}).forEach(([id, group]) => {
      const enabled = Object.entries(group).filter(([, value]) => value).map(([principle]) => principle);
      const relevant = enabled.filter((principle) => area.tags.some((tag) => principle.toLowerCase().includes(tag)));
      scores[id] += relevant.length || enabled.length * 0.12;
    });

    responseChoices
      .filter((choice) => area.tags.includes(choice.situation) || area.tags.includes(choice.tag))
      .forEach((choice) => {
        scores[choice.philosophyId] += 1.2;
      });

    return {
      id: areaId,
      name: area.name,
      stack: normalizeScores(scores).stack.slice(0, 3),
    };
  });
}

export function detectContradictions({ reflections, behavioralScores, responseChoices }) {
  const tagCounts = countTags(reflections);
  const score = behavioralScores.rawScores;
  const choiceCounts = responseChoices.reduce((acc, choice) => {
    acc[choice.philosophyId] = (acc[choice.philosophyId] || 0) + 1;
    return acc;
  }, {});

  const candidates = [
    {
      id: "freedom-uncertainty",
      when: (tags) => tags.meaning + tags.responsibility >= 2 && tags.uncertainty + tags.fear >= 2,
      title: "Wants freedom, but fears uncertainty",
      explanation: "Your reflections point toward chosen meaning, but uncertainty keeps appearing as friction.",
      sides: ["Existentialism reinforces freedom and responsibility.", "Stoicism and Taoism can help you meet uncertainty without paralysis."],
      suggestion: "Make one reversible choice this week instead of waiting for total certainty.",
    },
    {
      id: "discipline-discomfort",
      when: (tags) => tags.discipline + score.stoicism >= 6 && tags.avoidance >= 2,
      title: "Wants discipline, but avoids discomfort",
      explanation: "You seem to respect self-command, while your entries also name avoidance or drained energy.",
      sides: ["Stoicism and Nietzschean thought reinforce discipline.", "Buddhism reminds you not to turn discipline into self-attack."],
      suggestion: "Choose one small discomfort that serves your values and practice it gently.",
    },
    {
      id: "meaning-responsibility",
      when: (tags) => tags.meaning >= 2 && tags.avoidance + tags.fear >= 2,
      title: "Wants meaning, but hesitates before responsibility",
      explanation: "Meaning appears important, yet fear or avoidance may be delaying the actions that would make it real.",
      sides: ["Existentialism asks you to choose.", "Pragmatism asks you to test the next step."],
      suggestion: "Convert one abstract longing into a visible action within 24 hours.",
    },
    {
      id: "peace-validation",
      when: (tags) => tags.control + tags.attachment >= 2 && tags.validation >= 2,
      title: "Wants peace, but seeks validation",
      explanation: "Your emotional pattern suggests the wish for inner steadiness, but approval still carries weight.",
      sides: ["Buddhism softens attachment.", "Stoicism separates character from applause."],
      suggestion: "Before seeking reassurance, ask what your own values already know.",
    },
    {
      id: "ambition-failure",
      when: () => score.nietzschean + choiceCounts.nietzschean >= 5 && tagCounts.fear + tagCounts.avoidance >= 2,
      title: "Wants ambition, but fears failure",
      explanation: "There is energy for growth, but fear may be negotiating down the size of your life.",
      sides: ["Nietzschean philosophy uses struggle as material.", "Absurdism helps failure feel less final."],
      suggestion: "Define a brave attempt that is valuable even if it fails.",
    },
  ];

  const detected = candidates.filter((item) => item.when(tagCounts)).slice(0, 4);
  return detected.length
    ? detected
    : [
        {
          id: "forming",
          title: "Your tensions are still forming",
          explanation: "Add a few daily reflections and resonant philosophy responses. The app will begin noticing more specific patterns.",
          sides: ["Reflection reveals repeated emotional weather.", "Chosen responses reveal the philosophy you reach for in practice."],
          suggestion: "Complete three daily reflections to create a clearer map.",
        },
      ];
}

export function createWeeklyReplay({ reflections, responseChoices, selectedPrinciples, behavioralScores }) {
  const since = Date.now() - 7 * 86400000;
  const weekReflections = reflections.filter((item) => new Date(item.createdAt).getTime() >= since);
  const weekChoices = responseChoices.filter((item) => new Date(item.createdAt).getTime() >= since);
  const moodCounts = countBy(weekReflections.map((item) => item.mood).filter(Boolean));
  const tagCounts = countTags(weekReflections);
  const selected = Object.entries(selectedPrinciples || {}).flatMap(([id, group]) =>
    Object.entries(group)
      .filter(([, value]) => value)
      .map(([principle]) => ({ id, principle }))
  );
  const dominant = behavioralScores.stack[0];
  const secondary = behavioralScores.stack[1];
  const topMood = topEntry(moodCounts)?.[0] || "unrecorded";
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag]) => tag);

  return {
    summary: weekReflections.length
      ? `This week you behaved primarily ${dominant.name} under pressure, while ${secondary.name} appeared as a secondary way of making sense of life.`
      : "This week has not been recorded yet. Add daily reflections to make the replay feel alive.",
    dominantMood: topMood,
    recurringStruggles: topTags.length ? topTags : ["not enough reflection data yet"],
    strongestPrinciples: selected.slice(0, 4),
    responsePattern: weekChoices.length
      ? `You most often resonated with ${philosophies[topEntry(countBy(weekChoices.map((item) => item.philosophyId)))?.[0]]?.name || "mixed"} guidance.`
      : "No resonant philosophy responses selected this week.",
    worldviewShift: `${dominant.name} is currently the strongest behavioral signal in your operating system.`,
  };
}

export function createSnapshotText({ behavioralScores, contradictions, replay }) {
  const top = behavioralScores.stack.slice(0, 4);
  return [
    "Worldview OS Snapshot",
    "",
    ...top.map((item) => `${item.symbol} ${item.name}: ${item.percentage}%`),
    "",
    `Current theme: ${behavioralScores.stack[0].name} with ${behavioralScores.stack[1].name} as a secondary current.`,
    `Weekly note: ${replay.summary}`,
    `Tension to watch: ${contradictions[0]?.title || "None detected yet"}`,
  ].join("\n");
}

function addSliderInfluence(scores, sliders) {
  if (sliders.peace >= 7) addWeighted(scores, { buddhism: 1, taoism: 1 }, 1);
  if (sliders.discipline >= 7) addWeighted(scores, { stoicism: 1, nietzschean: 1 }, 1);
  if (sliders.meaning >= 7) addWeighted(scores, { existentialism: 1, absurdism: 1 }, 1);
  if (sliders.clarity >= 7) addWeighted(scores, { pragmatism: 1, stoicism: 1 }, 1);
  if (sliders.connection >= 7) addWeighted(scores, { buddhism: 1, existentialism: 1 }, 1);
}

function addWeighted(target, source, multiplier = 1) {
  Object.entries(source || {}).forEach(([id, value]) => {
    target[id] = (target[id] || 0) + value * multiplier;
  });
}

function normalizeScores(rawScores) {
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

  return { rawScores, stack };
}

function countTags(reflections) {
  return reflections.reduce((acc, reflection) => {
    reflection.tags?.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});
}

function countBy(items) {
  return items.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

function topEntry(counts) {
  return Object.entries(counts || {}).sort((a, b) => b[1] - a[1])[0];
}
