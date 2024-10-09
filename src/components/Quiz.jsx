import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quizz.css';
import Header from '../Header';
import '../App.css';

const questions = [
  { question: "Where can you find the 'Help' section in an app?", options: ["Main menu", "Profile section", "At the bottom of the screen", "In the settings"], correct: 3 },
  { question: "How do you search for something in an app?", options: ["Look for it on the home screen", "Use the search bar at the top", "Ask someone for help", "Open every menu"], correct: 1 },
  { question: "What is the first step to create a new account?", options: ["Fill in your profile", "Click on 'Log In'", "Find and click 'Sign Up'", "Open the settings"], correct: 2 },
  { question: "How can you access the main menu of the app?", options: ["Swipe left on the screen", "Tap the home icon", "Click on the three horizontal lines (hamburger menu)", "Press the home button"], correct: 2 },
  { question: "To update your profile information, you should:", options: ["Go to the home page", "Access the settings", "Click on your profile picture", "Log out first"], correct: 2 },
  { question: "Which option allows you to send a message to someone?", options: ["The 'Call' button", "The 'Message' icon", "The 'Share' option", "The 'Home' button"], correct: 1 },
  { question: "Where do you usually find notification settings?", options: ["Under 'Help'", "In the app's settings", "In the main menu", "On the home screen"], correct: 1 },
  { question: "To track your activity in the app, you should look for:", options: ["The 'Progress' tab", "The 'Home' button", "The 'Settings' menu", "The 'Help' section"], correct: 0 },
  { question: "What does the submit button typically look like?", options: ["A cross", "A down arrow", "A circle", "A rectangle labeled 'Submit'"], correct: 3 },
  { question: "How do you log out of the app?", options: ["Close the app", "Click on your profile and select 'Log Out'", "Restart your device", "Clear the app cache"], correct: 1 },
  { question: "To install a new app, you should go to:", options: ["The main menu", "The app store", "The settings", "The help section"], correct: 1 },
  { question: "How can you check notifications in the app?", options: ["Open the app every time", "Look for a bell icon or notification badge", "Wait for someone to notify you", "Go to the settings"], correct: 1 },
  { question: "To add an event to the calendar, you typically:", options: ["Click on the calendar icon and select 'Add Event'", "Call someone to do it", "Send an email", "Write it down"], correct: 0 },
  { question: "To share content from the app, you would usually look for:", options: ["The 'Print' option", "The 'Share' icon", "The 'Save' button", "The 'Edit' option"], correct: 1 },
  { question: "How do you provide feedback or report an issue in the app?", options: ["Look for 'Feedback' in the settings", "Call customer support", "Write a review on the app store", "Close the app"], correct: 0 }
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
        disabled={currentQuestion === questions.length - 1} // Disable skip on the last question
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