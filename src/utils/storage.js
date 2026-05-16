const KEYS = {
  history: "worldview-os-history",
  principles: "worldview-os-principles",
  theme: "worldview-os-theme",
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
