import { useState, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { europeCountries } from '../data/europeCountries';
import './QuestionPanel.css';

export const QuestionPanel = () => {
  const { currentQuestion, submitAnswer, skipQuestion, availableBorders, status } = useGameStore();
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong' | null; message: string }>({
    type: null,
    message: ''
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const lastQuestionId = useRef<string | null>(null);

  // Reset input when question changes (without useEffect)
  if (currentQuestion?.id !== lastQuestionId.current) {
    lastQuestionId.current = currentQuestion?.id ?? null;
    if (inputValue !== '' || feedback.type !== null) {
      setInputValue('');
      setFeedback({ type: null, message: '' });
    }
  }

  if (status !== 'playing' || !currentQuestion) {
    return null;
  }

  // Filter suggestions based on input
  const suggestions = inputValue.length > 0
    ? europeCountries
        .filter(c => c.name.toLowerCase().startsWith(inputValue.toLowerCase()))
        .slice(0, 5)
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    const isCorrect = submitAnswer(inputValue.trim());
    
    if (isCorrect) {
      setFeedback({ type: 'correct', message: '✓ Correct! Territory claimed!' });
      setTimeout(() => {
        setFeedback({ type: null, message: '' });
      }, 1500);
    } else {
      setFeedback({ type: 'wrong', message: '✗ Wrong answer! +30s penalty. Try again!' });
    }
    
    if (!isCorrect) {
      setInputValue('');
    }
  };

  const handleSkip = () => {
    skipQuestion();
    setInputValue('');
    setFeedback({ type: null, message: '' });
  };

  const handleSuggestionClick = (countryName: string) => {
    setInputValue(countryName);
    setShowSuggestions(false);
  };

  return (
    <div className="question-panel">
      <div className="question-header">
        <span className="question-type">{currentQuestion.type.replace('_', ' ')}</span>
        <span className="borders-hint">{availableBorders.length} possible answers</span>
      </div>

      {currentQuestion.imageUrl && (
        <div className="question-image-container">
          <img 
            src={currentQuestion.imageUrl} 
            alt="Question" 
            className="question-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
            }}
          />
        </div>
      )}

      <p className="question-text">{currentQuestion.question}</p>

      {feedback.type && (
        <div className={`feedback ${feedback.type}`}>
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="answer-form">
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Type country name..."
            className="answer-input"
            autoComplete="off"
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map(country => (
                <li 
                  key={country.id}
                  onClick={() => handleSuggestionClick(country.name)}
                  className="suggestion-item"
                >
                  {country.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="button-row">
          <button type="submit" className="submit-btn">
            Submit Answer
          </button>
          <button type="button" onClick={handleSkip} className="skip-btn">
            Skip (+45s)
          </button>
        </div>
      </form>
    </div>
  );
};
