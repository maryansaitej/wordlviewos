const KEYS = {
  history: "worldview-os-history",
  principles: "worldview-os-principles",
  theme: "worldview-os-theme",
  reflections: "worldview-os-reflections",
  responseChoices: "worldview-os-response-choices",
  mode: "worldview-os-mode",
  decisions: "worldview-os-decisions",
};

export function loadHistory() {
  return read(KEYS.history, []);
}

export function saveHistory(history) {
  write(KEYS.history, history);
}

export function addSnapshot(snapshot) {
  const history = loadHistory();
  const updated = [...history, snapshot];
  saveHistory(updated);
  return updated;
}

export function loadSelectedPrinciples() {
  return read(KEYS.principles, {});
}

export function saveSelectedPrinciples(selected) {
  write(KEYS.principles, selected);
}

export function loadTheme() {
  return read(KEYS.theme, "light");
}

export function saveTheme(theme) {
  write(KEYS.theme, theme);
}

export function loadReflections() {
  return read(KEYS.reflections, []);
}

export function saveReflections(reflections) {
  write(KEYS.reflections, reflections);
}

export function addReflection(reflection) {
  const reflections = loadReflections();
  const sameDayIndex = reflections.findIndex((item) => item.dateKey === reflection.dateKey);
  const updated =
    sameDayIndex >= 0
      ? reflections.map((item, index) => (index === sameDayIndex ? reflection : item))
      : [...reflections, reflection];
  saveReflections(updated);
  return updated;
}

export function loadResponseChoices() {
  return read(KEYS.responseChoices, []);
}

export function saveResponseChoices(choices) {
  write(KEYS.responseChoices, choices);
}

export function addResponseChoice(choice) {
  const choices = loadResponseChoices();
  const updated = [...choices, choice];
  saveResponseChoices(updated);
  return updated;
}

export function loadMode() {
  return read(KEYS.mode, "default");
}

export function saveMode(mode) {
  write(KEYS.mode, mode);
}

export function loadDecisions() {
  return read(KEYS.decisions, []);
}

export function saveDecisions(decisions) {
  write(KEYS.decisions, decisions);
}

export function addDecision(decision) {
  const decisions = loadDecisions();
  const updated = [decision, ...decisions].slice(0, 12);
  saveDecisions(updated);
  return updated;
}

export function resetAllData() {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}

function read(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
