import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Quizz.css';
import Header from '../Header';
import '../App.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();

  // Fetch questions from backend on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Failed to fetch quiz questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  // Handle answer selection
  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const handleSkip = () => {
    setShowAnswer(false);
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/results', { state: { score } });
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

  if (questions.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className='App'>
      <Header />
      <div className="quiz-container">
        <h2 className="question-heading">Question {currentQuestion + 1}</h2>
        <div className="question-box">
          <p className="question-text">{questions[currentQuestion].question}</p>
        </div>

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
          className="btn-primary skip-button"
          onClick={handleSkip}
          disabled={currentQuestion === questions.length - 1}
        >
          Skip
        </button>

        <button
          className="btn-primary next-button"
          onClick={nextQuestion}
          disabled={selectedAnswer === null}
        >
          {currentQuestion < questions.length - 1 ? 'Next' : 'Finish Quiz'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
