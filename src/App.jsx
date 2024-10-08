import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Quiz from './components/Quiz.jsx';
import Results from './components/Results.jsx';
import ArticlePage from './components/articelpage.jsx'; //
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/article-page" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App;
