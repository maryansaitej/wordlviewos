import { useEffect, useMemo, useState } from "react";
import CompanionHome from "./components/CompanionHome";
import Contradictions from "./components/Contradictions";
import Dashboard from "./components/Dashboard";
import DailyReflection from "./components/DailyReflection";
import DecisionLens from "./components/DecisionLens";
import Explorer from "./components/Explorer";
import Landing from "./components/Landing";
import Modes from "./components/Modes";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import SituationLens from "./components/SituationLens";
import Snapshots from "./components/Snapshots";
import WeeklyReplay from "./components/WeeklyReplay";
import WorldviewCode from "./components/WorldviewCode";
import { modes } from "./data/modes";
import { questions } from "./data/questions";
import {
  createBehavioralScores,
  createLifeAreaProfiles,
  createSnapshotText,
  createWeeklyReplay,
  detectContradictions,
} from "./utils/analytics";
import { buildResult, createSnapshot, scoreAnswers } from "./utils/scoring";
import {
  addDecision,
  addSnapshot,
  addReflection,
  addResponseChoice,
  loadDecisions,
  loadHistory,
  loadMode,
  loadReflections,
  loadResponseChoices,
  loadSelectedPrinciples,
  loadTheme,
  resetAllData,
  saveMode,
  saveSelectedPrinciples,
  saveTheme,
} from "./utils/storage";

const navItems = [
  ["home", "OS"],
  ["reflection", "Reflect"],
  ["dashboard", "Evolution"],
  ["situations", "Situation"],
  ["decision", "Decision"],
  ["contradictions", "Tensions"],
  ["replay", "Replay"],
  ["snapshots", "Snapshot"],
  ["modes", "Modes"],
  ["quiz", "Quiz"],
  ["explorer", "Explorer"],
  ["code", "Code"],
];

export default function App() {
  const [view, setView] = useState("home");
  const [answers, setAnswers] = useState([]);
  const [history, setHistory] = useState(() => loadHistory());
  const [reflections, setReflections] = useState(() => loadReflections());
  const [responseChoices, setResponseChoices] = useState(() => loadResponseChoices());
  const [decisions, setDecisions] = useState(() => loadDecisions());
  const [selectedPrinciples, setSelectedPrinciples] = useState(() => loadSelectedPrinciples());
  const [theme, setTheme] = useState(() => loadTheme());
  const [activeMode, setActiveModeState] = useState(() => loadMode());
  const [copied, setCopied] = useState(false);
  const [activeSituation, setActiveSituation] = useState("rejection");

  const currentResult = useMemo(() => {
    const latest = history[history.length - 1];
    return latest ? buildResult(latest.scores) : null;
  }, [history]);

  const behavioralScores = useMemo(
    () => createBehavioralScores({ quizResult: currentResult, reflections, selectedPrinciples, responseChoices }),
    [currentResult, reflections, selectedPrinciples, responseChoices]
  );

  const lifeAreaProfiles = useMemo(
    () => createLifeAreaProfiles({ behavioralScores, reflections, selectedPrinciples, responseChoices }),
    [behavioralScores, reflections, selectedPrinciples, responseChoices]
  );

  const contradictions = useMemo(
    () => detectContradictions({ reflections, behavioralScores, responseChoices }),
    [reflections, behavioralScores, responseChoices]
  );

  const replay = useMemo(
    () => createWeeklyReplay({ reflections, responseChoices, selectedPrinciples, behavioralScores }),
    [reflections, responseChoices, selectedPrinciples, behavioralScores]
  );

  const snapshotText = useMemo(
    () => createSnapshotText({ behavioralScores, contradictions, replay }),
    [behavioralScores, contradictions, replay]
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.mode = activeMode;
    document.documentElement.style.setProperty("--mode-accent", modes[activeMode].accent);
    saveTheme(theme);
  }, [theme, activeMode]);

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

  function saveReflection(reflection) {
    setReflections(addReflection(reflection));
    setView("home");
  }

  function chooseResponse(situation, philosophyId) {
    const choice = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      situation,
      philosophyId,
      tag: situation,
    };
    setResponseChoices(addResponseChoice(choice));
  }

  function saveDecision(decision) {
    setDecisions(addDecision(decision));
  }

  function setActiveMode(mode) {
    setActiveModeState(mode);
    saveMode(mode);
  }

  function handleReset() {
    const confirmed = window.confirm("Reset quiz history, reflections, response choices, selected principles, and theme?");
    if (!confirmed) return;
    resetAllData();
    setHistory([]);
    setReflections([]);
    setResponseChoices([]);
    setDecisions([]);
    setSelectedPrinciples({});
    setTheme("light");
    setActiveMode("default");
    setAnswers([]);
    setView("home");
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="topbar">
        <button className="brand" onClick={() => setView("home")} aria-label="Worldview OS home">
          <span className="brand-mark">◈</span>
          <span>Worldview OS</span>
        </button>

        <nav className="main-nav" aria-label="Primary navigation">
          {navItems.map(([id, label]) => (
            <button
              key={id}
              aria-current={view === id ? "page" : undefined}
              className={view === id ? "active" : ""}
              onClick={() => (id === "quiz" ? startQuiz() : setView(id))}
            >
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

      <main id="main-content" tabIndex="-1">
        {view === "home" && (
          <CompanionHome
            behavioralScores={behavioralScores}
            reflections={reflections}
            replay={replay}
            contradictions={contradictions}
            mode={modes[activeMode]}
            onNavigate={setView}
          />
        )}
        {view === "academy" && <Landing onStart={startQuiz} onNavigate={setView} />}
        {view === "reflection" && (
          <DailyReflection reflections={reflections} mode={activeMode} onSave={saveReflection} />
        )}
        {view === "quiz" && (
          <Quiz answers={answers} setAnswers={setAnswers} onComplete={completeQuiz} />
        )}
        {view === "results" && (
          <Results result={currentResult} onRetake={startQuiz} onNavigate={setView} />
        )}
        {view === "dashboard" && (
          <Dashboard
            history={history}
            currentResult={currentResult}
            behavioralScores={behavioralScores}
            lifeAreaProfiles={lifeAreaProfiles}
            reflections={reflections}
            onStart={startQuiz}
          />
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
          <SituationLens
            activeSituation={activeSituation}
            setActiveSituation={setActiveSituation}
            responseChoices={responseChoices}
            onChooseResponse={chooseResponse}
          />
        )}
        {view === "decision" && (
          <DecisionLens decisions={decisions} onSaveDecision={saveDecision} />
        )}
        {view === "contradictions" && <Contradictions contradictions={contradictions} />}
        {view === "replay" && <WeeklyReplay replay={replay} contradictions={contradictions} />}
        {view === "snapshots" && (
          <Snapshots
            behavioralScores={behavioralScores}
            replay={replay}
            contradictions={contradictions}
            snapshotText={snapshotText}
            copied={copied}
            setCopied={setCopied}
          />
        )}
        {view === "modes" && (
          <Modes activeMode={activeMode} setActiveMode={setActiveMode} />
        )}
      </main>
    </div>
  );
}
