import { useGameStore } from './store/gameStore';
import { Timer } from './components/Timer';
import { GameStats } from './components/GameStats';
import { QuestionPanel } from './components/QuestionPanel';
import { GameMap } from './components/GameMap';
import { StartScreen } from './components/StartScreen';
import { WinScreen } from './components/WinScreen';
import { getCountryById } from './data/europeCountries';
import './App.css';

function App() {
  const { status, claimedCountries } = useGameStore();

  // Get starting country name for display
  const startingCountry = claimedCountries[0] 
    ? getCountryById(claimedCountries[0])?.name 
    : null;

  return (
    <div className="app">
      <StartScreen />
      <WinScreen />

      {status === 'playing' && (
        <>
          <header className="game-header">
            <h1 className="logo">
              <span className="geo">geo</span>
              <span className="territorial">Territorial</span>
            </h1>
            {startingCountry && (
              <span className="starting-from">Started from: {startingCountry}</span>
            )}
          </header>

          <main className="game-layout">
            <aside className="sidebar">
              <Timer />
              <GameStats />
              <QuestionPanel />
            </aside>
            
            <section className="map-section">
              <GameMap />
            </section>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
