import { useGameStore } from '../store/gameStore';
import './StartScreen.css';

export const StartScreen = () => {
  const { status, startGame } = useGameStore();

  if (status !== 'idle') {
    return null;
  }

  return (
    <div className="start-overlay">
      <div className="start-modal">
        <div className="start-header">
          <h1 className="game-title">
            <span className="geo">geo</span>
            <span className="territorial">Territorial</span>
          </h1>
          <p className="game-subtitle">Conquer Europe, One Country at a Time</p>
        </div>

        <div className="game-rules">
          <h3>How to Play</h3>
          <ul>
            <li>
              <span className="rule-icon">🎯</span>
              Start from a random European country
            </li>
            <li>
              <span className="rule-icon">❓</span>
              Answer questions about bordering countries
            </li>
            <li>
              <span className="rule-icon">🗺️</span>
              Claim territories by guessing correctly
            </li>
            <li>
              <span className="rule-icon">⏱️</span>
              Complete the map as fast as possible
            </li>
          </ul>

          <div className="penalties-info">
            <h4>Penalties</h4>
            <div className="penalty-row">
              <span className="penalty-type wrong">Wrong Answer</span>
              <span className="penalty-cost">+30 seconds</span>
            </div>
            <div className="penalty-row">
              <span className="penalty-type skip">Skip Question</span>
              <span className="penalty-cost">+45 seconds</span>
            </div>
          </div>
        </div>

        <button className="start-btn" onClick={startGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};
