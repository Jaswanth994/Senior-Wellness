import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();

  // Fetch quiz questions from backend
  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/questions');
      setQuestions(response.data); // Set the questions from the backend
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();  // Fetch questions when the component mounts
  }, []);

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

  if (questions.length === 0) {
    return <p>Loading questions...</p>; // Handle case when questions are not loaded yet
  }

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
