import React from 'react';
import { motion } from 'framer-motion';
import GameCard, { CardProps } from './GameCard';

interface BoardPosition {
  card: CardProps | null;
  isValid: boolean;
}

interface GameBoardProps {
  board: (CardProps | null)[][];
  onCellClick: (row: number, col: number) => void;
  validMoves: boolean[][];
}

const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onCellClick,
  validMoves,
}) => {
  return (
    <div className="relative">
      {/* Board Background */}
      <div className="absolute inset-0 bg-dark-gray/50 rounded-xl border border-medium-gray/30 
                      backdrop-blur-sm shadow-inner-dark" />
      
      {/* Game Grid */}
      <div className="relative grid grid-cols-3 gap-4 p-6">
        {board.map((row, rowIndex) => (
          row.map((card, colIndex) => (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              whileHover={validMoves[rowIndex][colIndex] ? { scale: 1.02 } : {}}
              className={`relative aspect-[3/4] rounded-lg 
                ${validMoves[rowIndex][colIndex] ? 'cursor-pointer' : 'cursor-default'}
                ${validMoves[rowIndex][colIndex] ? 'border-2 border-gold/30' : 'border border-medium-gray/30'}
                bg-dark-bg/30 transition-colors duration-300
                ${validMoves[rowIndex][colIndex] ? 'hover:bg-gold/10' : ''}
              `}
              onClick={() => validMoves[rowIndex][colIndex] && onCellClick(rowIndex, colIndex)}
            >
              {card ? (
                <GameCard {...card} />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  {validMoves[rowIndex][colIndex] && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-8 h-8 border-2 border-gold/30 rounded-full"
                    />
                  )}
                </div>
              )}
            </motion.div>
          ))
        ))}
      </div>
    </div>
  );
};

export default GameBoard;