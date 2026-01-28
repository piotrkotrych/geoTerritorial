// Game Types

export interface Country {
  id: string;
  name: string;
  capital: string;
  borders: string[];
  coordinates: [number, number]; // [lat, lng] center point
}

export interface Question {
  id: string;
  countryId: string;
  type: QuestionType;
  question: string;
  imageUrl?: string;
  hint?: string;
}

export type QuestionType = 
  | 'flag'
  | 'capital_photo'
  | 'landmark'
  | 'river'
  | 'geography';

export type GameStatus = 
  | 'idle'
  | 'playing'
  | 'paused'
  | 'won';

export interface GameState {
  status: GameStatus;
  claimedCountries: string[];
  currentQuestion: Question | null;
  targetCountryId: string | null;
  availableBorders: string[];
  startTime: number | null;
  elapsedTime: number;
  penaltyTime: number;
  wrongAnswers: number;
  skippedQuestions: number;
  totalQuestions: number;
}

export interface GameStats {
  totalTime: number;
  countriesClaimed: number;
  wrongAnswers: number;
  skippedQuestions: number;
  accuracy: number;
}
