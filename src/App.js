import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // ✅ Import cookie library
import "./leitner-app.css";

const questionsData = { /* ... your questions ... */ };

export default function App() {
  const [box1, setBox1] = useState([]);
  const [box2, setBox2] = useState([]);
  const [currentQ, setCurrentQ] = useState(null);
  const [round, setRound] = useState(1);
  const [feedback, setFeedback] = useState(null);

  // ✅ Load progress from cookies on first render
  useEffect(() => {
    const savedBox1 = Cookies.get("box1");
    const savedBox2 = Cookies.get("box2");
    const savedRound = Cookies.get("round");

    if (savedBox1 && savedBox2) {
      setBox1(JSON.parse(savedBox1));
      setBox2(JSON.parse(savedBox2));
      setRound(savedRound ? parseInt(savedRound, 10) : 1);
    } else {
      setBox1(questionsData.questions);
    }
  }, []);

  // ✅ Save progress whenever box1, box2, or round changes
  useEffect(() => {
    Cookies.set("box1", JSON.stringify(box1), { expires: 7 });
    Cookies.set("box2", JSON.stringify(box2), { expires: 7 });
    Cookies.set("round", round, { expires: 7 });
  }, [box1, box2, round]);

  function pickNextQuestion() {
    let pool = [];
    if (box1.length > 0) {
      pool = box1;
    } else if (round % 3 === 0 && box2.length > 0) {
      pool = box2;
    } else {
      pool = box1.concat(box2);
    }
    if (pool.length === 0) return;
    const next = pool[Math.floor(Math.random() * pool.length)];
    setCurrentQ(next);
    setFeedback(null);
  }

  useEffect(() => {
    pickNextQuestion();
  }, [round, box1, box2]);

  function handleAnswer(choice) {
    if (!currentQ) return;
    const isCorrect = choice === currentQ.answer;
    setFeedback({ correct: isCorrect, explanation: currentQ.explanation });

    if (isCorrect) {
      setBox1((prev) => prev.filter((q) => q.id !== currentQ.id));
      setBox2((prev) =>
        prev.find((q) => q.id === currentQ.id) ? prev : [...prev, currentQ]
      );
    } else {
      setBox1((prev) =>
        prev.find((q) => q.id === currentQ.id) ? prev : [...prev, currentQ]
      );
      setBox2((prev) => prev.filter((q) => q.id !== currentQ.id));
    }
  }

  function nextQuestion() {
    setRound((r) => r + 1);
  }

  return (
    <div className="app">
      <div className="card">
        <div className="card-content">
          <div className="stats">
            <span>📦 Box 1: {box1.length}</span>
            <span>📦 Box 2: {box2.length}</span>
            <span>Round: {round}</span>
          </div>

          {!currentQ ? (
            <p className="message">No questions available 🎉</p>
          ) : (
            <div>
              <h2 className="question">{currentQ.question}</h2>
              <div className="options">
                {Object.entries(currentQ.options).map(([key, value]) => (
                  <button
                    key={key}
                    className="option-btn"
                    onClick={() => handleAnswer(key)}
                    disabled={!!feedback}
                  >
                    {key}. {value}
                  </button>
                ))}
              </div>

              {feedback && (
                <div
                  className={`feedback ${
                    feedback.correct ? "correct" : "incorrect"
                  }`}
                >
                  <p className="feedback-title">
                    {feedback.correct ? "✅ Correct!" : "❌ Incorrect"}
                  </p>
                  <p className="feedback-text">{feedback.explanation}</p>
                  <button className="next-btn" onClick={nextQuestion}>
                    Next Question
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
