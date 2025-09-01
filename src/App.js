import React, { useState, useEffect } from "react";
import "./leitner-app.css"; 

// questionsData ... (keep your existing questionsData here)

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({}); 
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  // ✅ Load saved progress on first mount
  useEffect(() => {
    const saved = localStorage.getItem("quizProgress");
    if (saved) {
      const parsed = JSON.parse(saved);
      setCurrentQuestion(parsed.currentQuestion || 0);
      setScore(parsed.score || 0);
      setAnsweredQuestions(parsed.answeredQuestions || {});
    }
  }, []);

  // ✅ Save progress whenever relevant state changes
  useEffect(() => {
    localStorage.setItem(
      "quizProgress",
      JSON.stringify({
        currentQuestion,
        score,
        answeredQuestions,
      })
    );
  }, [currentQuestion, score, answeredQuestions]);

  const handleAnswer = (option) => {
    const currentQ = questionsData.questions[currentQuestion];
    const correct = option === currentQ.answer;

    setIsCorrect(correct);
    setShowFeedback(true);

    // Save whether the question was answered correctly
    setAnsweredQuestions((prev) => ({
      ...prev,
      [currentQ.id]: correct,
    }));

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setIsCorrect(null);
    if (currentQuestion < questionsData.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      alert("You reached the end!");
    }
  };

  // ✅ Reset progress button
  const resetProgress = () => {
    localStorage.removeItem("quizProgress");
    setCurrentQuestion(0);
    setScore(0);
    setAnsweredQuestions({});
    setShowFeedback(false);
    setIsCorrect(null);
  };

  const currentQ = questionsData.questions[currentQuestion];

  return (
    <div className="app">
      <div className="card">
        <div className="card-content">
          <div className="stats">
            <span>Question {currentQuestion + 1}/{questionsData.questions.length}</span>
            <span>Score: {score}</span>
          </div>

          <div className="question">{currentQ.question}</div>

          <div className="options">
            {Object.entries(currentQ.options).map(([key, value]) => (
              <button
                key={key}
                className="option-btn"
                onClick={() => handleAnswer(key)}
                disabled={showFeedback}
              >
                {key}: {value}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
              <div className="feedback-title">
                {isCorrect ? "Correct!" : "Incorrect"}
              </div>
              <div className="feedback-text">{currentQ.explanation}</div>
              <button className="next-btn" onClick={handleNext}>
                Next
              </button>
            </div>
          )}

          <div style={{ marginTop: "16px", textAlign: "center" }}>
            <button className="next-btn" onClick={resetProgress}>
              Reset Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
