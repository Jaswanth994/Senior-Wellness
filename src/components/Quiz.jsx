import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quizz.css';
const questions = [
  { question: "Where can you find the 'Help' section in an app?", options: ["Main menu", "Profile section", "At the bottom of the screen", "In the settings"], correct: 3 },
  { question: "How do you search for something in an app?", options: ["Look for it on the home screen", "Use the search bar at the top", "Ask someone for help", "Open every menu"], correct: 1 },
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
    setShowAnswer(true); 
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
      <h2 className="question-heading">Question {currentQuestion + 1}</h2>
      <p className="question-text">{questions[currentQuestion].question}</p>

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
              disabled={selectedAnswer !== null}
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
        className="btn-primary next-button"
        onClick={nextQuestion}
        disabled={selectedAnswer === null}
      >
        {currentQuestion < questions.length - 1 ? 'Next' : 'Finish Quiz'}
      </button>
    </div>
  );
};

export default Quiz;
