import { useGameStore } from '../store/gameStore';
import { TOTAL_COUNTRIES, getCountryById } from '../data/europeCountries';
import { formatTime } from '../utils/timeFormatter';
import './WinScreen.css';

export const WinScreen = () => {
  const { 
    status, 
    elapsedTime, 
    penaltyTime, 
    wrongAnswers, 
    skippedQuestions,
    totalQuestions,
    claimedCountries,
    resetGame 
  } = useGameStore();

  if (status !== 'won') {
    return null;
  }

  const totalTime = elapsedTime + (penaltyTime * 1000);
  const accuracy = totalQuestions > 0 
    ? Math.round(((totalQuestions - wrongAnswers) / totalQuestions) * 100)
    : 100;

  // Get starting country (first claimed)
  const startingCountry = claimedCountries[0] 
    ? getCountryById(claimedCountries[0])?.name 
    : 'Unknown';

  return (
    <div className="win-overlay">
      <div className="win-modal">
        <div className="win-header">
          <span className="trophy">🏆</span>
          <h1>Congratulations!</h1>
          <p>You've conquered all of Europe!</p>
        </div>

        <div className="win-stats">
          <div className="final-time">
            <span className="time-label">Final Time</span>
            <span className="time-value">{formatTime(totalTime)}</span>
          </div>

          <div className="stats-grid">
            <div className="stat">
              <span className="stat-value">{TOTAL_COUNTRIES}</span>
              <span className="stat-label">Countries</span>
            </div>
            <div className="stat">
              <span className="stat-value">{accuracy}%</span>
              <span className="stat-label">Accuracy</span>
            </div>
            <div className="stat">
              <span className="stat-value">{wrongAnswers}</span>
              <span className="stat-label">Wrong</span>
            </div>
            <div className="stat">
              <span className="stat-value">{skippedQuestions}</span>
              <span className="stat-label">Skipped</span>
            </div>
          </div>

          <div className="starting-info">
            Started from: <strong>{startingCountry}</strong>
          </div>

          {penaltyTime > 0 && (
            <div className="penalty-info">
              Total penalties: <span className="penalty-amount">+{penaltyTime}s</span>
            </div>
          )}
        </div>

        <button className="play-again-btn" onClick={resetGame}>
          Play Again
        </button>
      </div>
    </div>
  );
};
