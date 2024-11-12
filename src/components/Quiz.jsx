import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './Quiz.css';
import Header from '../Header';

const Quiz = () => {
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  // Check if user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });
    return unsubscribe;
  }, [auth, navigate]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://senior-wellness-1.onrender.com/api/quizzes/${category}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Failed to fetch quiz questions:', error);
      }
    };
    fetchQuestions();
  }, [category]);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const nextQuestion = async () => {
    setShowAnswer(false);
    setSelectedAnswer(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const user = auth.currentUser;
      if (user) {
        await saveQuizResult(user.uid, category, score);
      }
      navigate('/results', { state: { score, category } });
    }
  };

  const saveQuizResult = async (uid, category, score) => {
    try {
      await axios.post('https://senior-wellness-1.onrender.com/api/quiz-results/add', {
        uid,
        category,
        score,
      });
      console.log('Quiz result saved successfully.');
    } catch (error) {
      console.error('Failed to save quiz result:', error);
    }
  };

  const handleSkip = () => {
    setShowAnswer(false);
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/results', { state: { score, category } });
    }
  };

  if (questions.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className='App'>
      <Header />
      <div className="quiz-container">
        {/* Quiz content */}
        <h2 className="question-heading">Question {currentQuestion + 1}</h2>
        <div className="question-box">
          <p className="question-text">{questions[currentQuestion].question}</p>
        </div>
        <div className="options">
          {questions[currentQuestion].options.map((option, index) => {
            const isCorrect = index === questions[currentQuestion].correct;
            const isSelected = selectedAnswer === index;
            const optionClass = showAnswer && isCorrect ? 'option correct' : isSelected && !isCorrect ? 'option incorrect' : 'option';

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

        <button className="btn-primary skip-button" onClick={handleSkip} disabled={currentQuestion === questions.length - 1}>
          Skip
        </button>

        <button className="btn-primary next-button" onClick={nextQuestion} disabled={selectedAnswer === null}>
          {currentQuestion < questions.length - 1 ? 'Next' : 'Finish Quiz'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
