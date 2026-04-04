import React from 'react';

interface GameOverModalProps {
  onPlayAgain: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ onPlayAgain }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Game Over! 😢</h2>
        <p className="text-lg mb-6">You ran out of lives. Try again!</p>
        <button
          onClick={onPlayAgain}
          className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-bold"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
