import { useEffect, useMemo, useState } from "react";
import Dashboard from "./components/Dashboard";
import Explorer from "./components/Explorer";
import Landing from "./components/Landing";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import SituationLens from "./components/SituationLens";
import WorldviewCode from "./components/WorldviewCode";
import { questions } from "./data/questions";
import { buildResult, createSnapshot, scoreAnswers } from "./utils/scoring";
import {
  addSnapshot,
  loadHistory,
  loadSelectedPrinciples,
  loadTheme,
  resetAllData,
  saveSelectedPrinciples,
  saveTheme,
} from "./utils/storage";

const navItems = [
  ["home", "Academy"],
  ["quiz", "Quiz"],
  ["results", "Results"],
  ["dashboard", "Evolution"],
  ["explorer", "Explorer"],
  ["code", "Code"],
  ["situations", "Lens"],
];

export default function App() {
  const [view, setView] = useState("home");
  const [answers, setAnswers] = useState([]);
  const [history, setHistory] = useState(() => loadHistory());
  const [selectedPrinciples, setSelectedPrinciples] = useState(() => loadSelectedPrinciples());
  const [theme, setTheme] = useState(() => loadTheme());
  const [copied, setCopied] = useState(false);
  const [activeSituation, setActiveSituation] = useState("rejection");

  const currentResult = useMemo(() => {
    const latest = history[history.length - 1];
    return latest ? buildResult(latest.scores) : null;
  }, [history]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  function startQuiz() {
    setAnswers([]);
    setView("quiz");
  }

  function completeQuiz() {
    if (answers.length !== questions.length) return;
    const result = scoreAnswers(questions, answers);
    const snapshot = createSnapshot(result);
    setHistory(addSnapshot(snapshot));
    setView("results");
  }

  function togglePrinciple(philosophyId, principle) {
    const updated = {
      ...selectedPrinciples,
      [philosophyId]: {
        ...(selectedPrinciples[philosophyId] || {}),
        [principle]: !selectedPrinciples[philosophyId]?.[principle],
      },
    };
    setSelectedPrinciples(updated);
    saveSelectedPrinciples(updated);
  }

  function handleReset() {
    const confirmed = window.confirm("Reset quiz history, selected principles, and theme?");
    if (!confirmed) return;
    resetAllData();
    setHistory([]);
    setSelectedPrinciples({});
    setTheme("light");
    setAnswers([]);
    setView("home");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setView("home")} aria-label="Worldview OS home">
          <span className="brand-mark">◈</span>
          <span>Worldview OS</span>
        </button>

        <nav className="main-nav" aria-label="Primary navigation">
          {navItems.map(([id, label]) => (
            <button key={id} className={view === id ? "active" : ""} onClick={() => (id === "quiz" ? startQuiz() : setView(id))}>
              {label}
            </button>
          ))}
        </nav>

        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle color mode"
        >
          {theme === "dark" ? "☼" : "☾"}
        </button>
      </header>

      <main>
        {view === "home" && <Landing onStart={startQuiz} onNavigate={setView} />}
        {view === "quiz" && (
          <Quiz answers={answers} setAnswers={setAnswers} onComplete={completeQuiz} />
        )}
        {view === "results" && (
          <Results result={currentResult} onRetake={startQuiz} onNavigate={setView} />
        )}
        {view === "dashboard" && (
          <Dashboard history={history} currentResult={currentResult} onStart={startQuiz} />
        )}
        {view === "explorer" && (
          <Explorer selectedPrinciples={selectedPrinciples} onToggle={togglePrinciple} />
        )}
        {view === "code" && (
          <WorldviewCode
            selectedPrinciples={selectedPrinciples}
            onToggle={togglePrinciple}
            onReset={handleReset}
            copied={copied}
            setCopied={setCopied}
          />
        )}
        {view === "situations" && (
          <SituationLens activeSituation={activeSituation} setActiveSituation={setActiveSituation} />
        )}
      </main>
    </div>
  );
}
