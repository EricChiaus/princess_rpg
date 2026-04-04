import React from 'react';

interface VictoryModalProps {
  onPlayAgain: () => void;
}

const VictoryModal: React.FC<VictoryModalProps> = ({ onPlayAgain }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Victory! 🎉</h2>
        <p className="text-lg mb-6">Congratulations! You reached the castle!</p>
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

export default VictoryModal;
