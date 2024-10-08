import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const questions = [
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], correct: 2 },
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
  { question: "What is the color of the sky?", options: ["Blue", "Green", "Red", "Yellow"], correct: 0 },
  { question: "What is the largest planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correct: 2 },
  { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"], correct: 2 },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setShowAnswer(true); // Show the correct answer whether the selected one is right or wrong
  };

  const nextQuestion = () => {
    setShowAnswer(false);
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/results', { state: { score } });
    }
  };

  return (
    <div className="quiz-container">
      {/* Robot container */}
      <div className="robot-container">
        <div className="robot">
          <div className="robot-face"></div>
        </div>
      </div>

      <h2>Question {currentQuestion + 1}</h2>
      <p>{questions[currentQuestion].question}</p>

      <div className="options">
        {questions[currentQuestion].options.map((option, index) => {
          const isCorrect = index === questions[currentQuestion].correct;
          const isSelected = selectedAnswer === index;
          const optionClass =
            showAnswer && isCorrect ? 'option correct' : 
            isSelected && !isCorrect ? 'option incorrect' : 'option';

          return (
            <button
              key={index}
              className={optionClass}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null} // Disable options after one is selected
            >
              {option}
            </button>
          );
        })}
      </div>

      {showAnswer && (
        <div className="alert alert-info mt-3">
          Correct Answer: {questions[currentQuestion].options[questions[currentQuestion].correct]}
        </div>
      )}

      <button
        className="btn btn-primary mt-3 next-button"
        onClick={nextQuestion}
        disabled={selectedAnswer === null}
      >
        {currentQuestion < questions.length - 1 ? 'Next' : 'Finish Quiz'}
      </button>
    </div>
  );
};

export default Quiz;
