// src/components/Quiz.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  { question: "Lorem ipsum dolor sit amet?", options: ["Lorem", "Ipsum", "Dolor", "Sit"], correct: 0 },
  // { question: "Consectetur adipiscing elit?", options: ["A", "B", "C", "D"], correct: 2 },
  // Add more questions here...
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
    } else {
      setShowAnswer(true);
    }
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
    <div className="container">
      <h2>Question {currentQuestion + 1}</h2>
      <p>{questions[currentQuestion].question}</p>
      <div className="list-group">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={`list-group-item list-group-item-action 
              ${selectedAnswer === index && index === questions[currentQuestion].correct ? 'list-group-item-success' : ''}
              ${selectedAnswer === index && index !== questions[currentQuestion].correct ? 'list-group-item-danger' : ''}`}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
          >
            {option}
          </button>
        ))}
      </div>

      {showAnswer && (
        <div className="alert alert-info mt-3">
          Correct Answer: {questions[currentQuestion].options[questions[currentQuestion].correct]}
        </div>
      )}

      <button className="btn btn-primary mt-3" onClick={nextQuestion} disabled={selectedAnswer === null}>
        {currentQuestion < questions.length - 1 ? 'Next' : 'Finish Quiz'}
      </button>
    </div>
  );
};

export default Quiz;
