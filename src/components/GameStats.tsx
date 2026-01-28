import { useGameStore } from '../store/gameStore';
import { TOTAL_COUNTRIES } from '../data/europeCountries';
import './GameStats.css';

export const GameStats = () => {
  const { 
    claimedCountries, 
    wrongAnswers, 
    skippedQuestions, 
    totalQuestions,
    availableBorders 
  } = useGameStore();

  const progress = (claimedCountries.length / TOTAL_COUNTRIES) * 100;
  const accuracy = totalQuestions > 0 
    ? Math.round(((totalQuestions - wrongAnswers) / totalQuestions) * 100)
    : 100;

  return (
    <div className="game-stats">
      <div className="stat-item">
        <span className="stat-label">Progress</span>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
          <span className="progress-text">
            {claimedCountries.length}/{TOTAL_COUNTRIES}
          </span>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-box">
          <span className="stat-number">{availableBorders.length}</span>
          <span className="stat-desc">Available Borders</span>
        </div>
        
        <div className="stat-box">
          <span className="stat-number accuracy">{accuracy}%</span>
          <span className="stat-desc">Accuracy</span>
        </div>

        <div className="stat-box">
          <span className="stat-number wrong">{wrongAnswers}</span>
          <span className="stat-desc">Wrong</span>
        </div>

        <div className="stat-box">
          <span className="stat-number skipped">{skippedQuestions}</span>
          <span className="stat-desc">Skipped</span>
        </div>
      </div>
    </div>
  );
};
