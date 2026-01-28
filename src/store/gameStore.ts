import { create } from 'zustand';
import type { GameState } from '../types/game';
import { europeCountries, getCountryById, TOTAL_COUNTRIES } from '../data/europeCountries';
import { generateQuestion } from '../utils/questionGenerator';

interface GameStore extends GameState {
  // Actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  
  // Gameplay
  submitAnswer: (answer: string) => boolean;
  skipQuestion: () => void;
  
  // Timer
  updateElapsedTime: (time: number) => void;
  
  // Helpers
  getAvailableBorders: () => string[];
  generateNewQuestion: () => void;
}

const WRONG_ANSWER_PENALTY = 30; // seconds
const SKIP_PENALTY = 45; // seconds

const getRandomStartingCountry = (): string => {
  // Filter countries that have at least one border (avoid islands)
  const countriesWithBorders = europeCountries.filter(c => c.borders.length > 0);
  const randomIndex = Math.floor(Math.random() * countriesWithBorders.length);
  return countriesWithBorders[randomIndex].id;
};

const initialState: GameState = {
  status: 'idle',
  claimedCountries: [],
  currentQuestion: null,
  targetCountryId: null,
  availableBorders: [],
  startTime: null,
  elapsedTime: 0,
  penaltyTime: 0,
  wrongAnswers: 0,
  skippedQuestions: 0,
  totalQuestions: 0
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  startGame: () => {
    const startingCountry = getRandomStartingCountry();
    const country = getCountryById(startingCountry);
    
    set({
      status: 'playing',
      claimedCountries: [startingCountry],
      startTime: Date.now(),
      elapsedTime: 0,
      penaltyTime: 0,
      wrongAnswers: 0,
      skippedQuestions: 0,
      totalQuestions: 0,
      availableBorders: country?.borders || []
    });

    // Generate first question
    get().generateNewQuestion();
  },

  pauseGame: () => {
    set({ status: 'paused' });
  },

  resumeGame: () => {
    set({ status: 'playing' });
  },

  resetGame: () => {
    set(initialState);
  },

  submitAnswer: (answer: string) => {
    const { targetCountryId, claimedCountries, totalQuestions } = get();
    
    if (!targetCountryId) return false;
    
    const targetCountry = getCountryById(targetCountryId);
    const isCorrect = answer.toLowerCase() === targetCountry?.name.toLowerCase();

    if (isCorrect) {
      const newClaimedCountries = [...claimedCountries, targetCountryId];
      
      // Check for win condition
      if (newClaimedCountries.length >= TOTAL_COUNTRIES) {
        set({
          status: 'won',
          claimedCountries: newClaimedCountries,
          currentQuestion: null,
          targetCountryId: null,
          totalQuestions: totalQuestions + 1
        });
        return true;
      }

      // Update claimed countries and generate new question
      set({
        claimedCountries: newClaimedCountries,
        totalQuestions: totalQuestions + 1
      });
      
      get().generateNewQuestion();
      return true;
    } else {
      // Wrong answer - add penalty
      set(state => ({
        penaltyTime: state.penaltyTime + WRONG_ANSWER_PENALTY,
        wrongAnswers: state.wrongAnswers + 1
      }));
      return false;
    }
  },

  skipQuestion: () => {
    set(state => ({
      penaltyTime: state.penaltyTime + SKIP_PENALTY,
      skippedQuestions: state.skippedQuestions + 1
    }));
    
    get().generateNewQuestion();
  },

  updateElapsedTime: (time: number) => {
    set({ elapsedTime: time });
  },

  getAvailableBorders: () => {
    const { claimedCountries } = get();
    
    // Get all borders from claimed countries
    const allBorders = new Set<string>();
    claimedCountries.forEach(countryId => {
      const country = getCountryById(countryId);
      country?.borders.forEach(borderId => {
        if (!claimedCountries.includes(borderId)) {
          allBorders.add(borderId);
        }
      });
    });
    
    return Array.from(allBorders);
  },

  generateNewQuestion: () => {
    const availableBorders = get().getAvailableBorders();
    
    if (availableBorders.length === 0) {
      // No more borders available - check for isolated countries
      const unclaimedCountries = europeCountries
        .filter(c => !get().claimedCountries.includes(c.id))
        .map(c => c.id);
      
      if (unclaimedCountries.length === 0) {
        set({ status: 'won' });
        return;
      }
      
      // Pick random unclaimed country (for islands like Iceland)
      const randomUnclaimed = unclaimedCountries[Math.floor(Math.random() * unclaimedCountries.length)];
      const question = generateQuestion(randomUnclaimed);
      
      set({
        currentQuestion: question,
        targetCountryId: randomUnclaimed,
        availableBorders: []
      });
      return;
    }
    
    // Pick random border country
    const randomBorder = availableBorders[Math.floor(Math.random() * availableBorders.length)];
    const question = generateQuestion(randomBorder);
    
    set({
      currentQuestion: question,
      targetCountryId: randomBorder,
      availableBorders
    });
  }
}));
