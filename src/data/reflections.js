export const moods = [
  "calm",
  "anxious",
  "motivated",
  "uncertain",
  "lonely",
  "fulfilled",
  "frustrated",
  "grateful",
  "overwhelmed",
];

export const emotionalTags = [
  "control",
  "fear",
  "meaning",
  "avoidance",
  "validation",
  "discipline",
  "uncertainty",
  "attachment",
  "responsibility",
  "energy",
  "connection",
  "growth",
];

export const reflectionPrompts = [
  {
    text: "What disturbed your peace today?",
    weights: { stoicism: 2, buddhism: 1 },
    tags: ["control", "peace"],
  },
  {
    text: "What are you resisting?",
    weights: { buddhism: 2, taoism: 2 },
    tags: ["attachment", "uncertainty"],
  },
  {
    text: "Where did fear influence your decisions?",
    weights: { existentialism: 2, stoicism: 1 },
    tags: ["fear", "responsibility"],
  },
  {
    text: "What mattered most today?",
    weights: { existentialism: 2, pragmatism: 1 },
    tags: ["meaning"],
  },
  {
    text: "What drained your energy?",
    weights: { taoism: 2, pragmatism: 1 },
    tags: ["energy"],
  },
  {
    text: "What are you trying to control?",
    weights: { stoicism: 2, buddhism: 1 },
    tags: ["control"],
  },
  {
    text: "What did you avoid today?",
    weights: { existentialism: 2, nietzschean: 1 },
    tags: ["avoidance", "responsibility"],
  },
  {
    text: "What gave you meaning today?",
    weights: { existentialism: 2, absurdism: 1 },
    tags: ["meaning"],
  },
  {
    text: "Where did ego appear today?",
    weights: { buddhism: 2, nietzschean: 1 },
    tags: ["validation", "attachment"],
  },
  {
    text: "What suffering are you refusing to accept?",
    weights: { buddhism: 2, stoicism: 1 },
    tags: ["attachment", "control"],
  },
  {
    text: "Where did you act with quiet courage?",
    weights: { stoicism: 1, existentialism: 1, nietzschean: 2 },
    tags: ["growth", "discipline"],
  },
  {
    text: "What simple next step would make tomorrow lighter?",
    weights: { pragmatism: 2, taoism: 1 },
    tags: ["energy", "clarity"],
  },
  {
    text: "Where did you force what needed patience?",
    weights: { taoism: 2, buddhism: 1 },
    tags: ["control", "uncertainty"],
  },
  {
    text: "What did you take too seriously today?",
    weights: { absurdism: 2, taoism: 1 },
    tags: ["meaning", "fear"],
  },
];

export const moodWeights = {
  calm: { taoism: 1, buddhism: 1 },
  anxious: { stoicism: 1, buddhism: 1, existentialism: 1 },
  motivated: { nietzschean: 1, pragmatism: 1 },
  uncertain: { existentialism: 1, taoism: 1, absurdism: 1 },
  lonely: { buddhism: 1, existentialism: 1 },
  fulfilled: { existentialism: 1, stoicism: 1 },
  frustrated: { stoicism: 1, pragmatism: 1 },
  grateful: { buddhism: 1, taoism: 1 },
  overwhelmed: { taoism: 1, stoicism: 1, buddhism: 1 },
};

export const tagWeights = {
  control: { stoicism: 2 },
  fear: { existentialism: 1, stoicism: 1 },
  meaning: { existentialism: 2, absurdism: 1 },
  avoidance: { existentialism: 1, nietzschean: 1 },
  validation: { buddhism: 1, stoicism: 1, nietzschean: 1 },
  discipline: { stoicism: 2, nietzschean: 1 },
  uncertainty: { taoism: 1, existentialism: 1, absurdism: 1 },
  attachment: { buddhism: 2, taoism: 1 },
  responsibility: { existentialism: 2, stoicism: 1 },
  energy: { taoism: 1, pragmatism: 1 },
  connection: { buddhism: 1, existentialism: 1 },
  growth: { nietzschean: 2, pragmatism: 1 },
};

export function getDailyPrompt(date = new Date(), mode = "default") {
  const start = new Date(date.getFullYear(), 0, 0);
  const day = Math.floor((date - start) / 86400000);
  const offset = mode === "default" ? 0 : mode.length;
  return reflectionPrompts[(day + offset) % reflectionPrompts.length];
}
