// src/providers/GameProvider.tsx
import { createContext, useContext, useReducer } from 'react';
import { generateClient } from 'aws-amplify/data';
import { schema } from '../../../amplify/data/schema';

const client = generateClient<typeof schema>();

interface GameState {
  currentMatch: Match | null;
  selectedCard: PlayerCard | null;
  validMoves: boolean[][];
  // ... other game state
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}>({ /* initial state */ });

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};