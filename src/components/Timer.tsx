import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { formatTime } from '../utils/timeFormatter';
import './Timer.css';

export const Timer = () => {
  const { status, startTime, elapsedTime, penaltyTime, updateElapsedTime } = useGameStore();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (status === 'playing' && startTime) {
      intervalRef.current = window.setInterval(() => {
        const now = Date.now();
        updateElapsedTime(now - startTime);
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status, startTime, updateElapsedTime]);

  const totalTime = elapsedTime + (penaltyTime * 1000);

  return (
    <div className="timer-container">
      <div className="timer-main">
        <span className="timer-label">Time</span>
        <span className="timer-value">{formatTime(totalTime)}</span>
      </div>
      {penaltyTime > 0 && (
        <div className="timer-penalty">
          <span className="penalty-label">Penalties</span>
          <span className="penalty-value">+{penaltyTime}s</span>
        </div>
      )}
    </div>
  );
};
