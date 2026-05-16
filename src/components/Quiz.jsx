import { questions } from "../data/questions";

export default function Quiz({ answers, setAnswers, onComplete }) {
  const currentIndex = answers.length;
  const question = questions[currentIndex];
  const progress = Math.round((answers.length / questions.length) * 100);

  if (!question) {
    return (
      <section className="panel center-panel">
        <p className="eyebrow">Reflection complete</p>
        <h2>Your answers are ready to become a philosophy stack.</h2>
        <button className="seal-button" onClick={onComplete}>Reveal My Worldview</button>
      </section>
    );
  }

  return (
    <section className="quiz-layout">
      <div className="quiz-header">
        <p className="eyebrow">Question {currentIndex + 1} of {questions.length}</p>
        <div className="path-bar" aria-label={`${progress}% complete`}>
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <article className="panel quiz-card">
        <span className="manuscript-note">{question.theme}</span>
        <h2>{question.prompt}</h2>
        <div className="answer-grid">
          {question.options.map((option, index) => (
            <button
              className="answer-card"
              key={option.text}
              onClick={() => setAnswers([...answers, index])}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              {option.text}
            </button>
          ))}
        </div>
      </article>

      {answers.length > 0 && (
        <button className="text-button" onClick={() => setAnswers(answers.slice(0, -1))}>
          Back to previous question
        </button>
      )}
    </section>
  );
}
