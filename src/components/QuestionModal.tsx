import React from 'react';
import { Question } from '../types';

interface QuestionModalProps {
  currentQuestion: Question | null;
  selectedAnswer: number | null;
  showQuestion: boolean;
  onAnswerSelect: (index: number) => void;
  onSubmitAnswer: () => void;
  playBattleWin?: () => void;
  playBattleLose?: () => void;
  soundEffectsEnabled?: boolean;
}

const QuestionModal: React.FC<QuestionModalProps> = ({
  currentQuestion,
  selectedAnswer,
  showQuestion,
  onAnswerSelect,
  onSubmitAnswer,
  playBattleWin,
  playBattleLose,
  soundEffectsEnabled = true,
}) => {
  if (!showQuestion || !currentQuestion) return null;

  const handleAnswerClick = (index: number) => {
    // Play sound effect immediately when answer is selected
    if (soundEffectsEnabled && playBattleWin && playBattleLose) {
      if (index === currentQuestion.correctAnswer) {
        console.log('Playing battle win sound on answer selection');
        playBattleWin();
      } else {
        console.log('Playing battle lose sound on answer selection');
        playBattleLose();
      }
    }
    
    onAnswerSelect(index);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-center mb-4">Math Question!</h2>
        <p className="text-xl text-center mb-6">{currentQuestion.question}</p>
        <div className="grid grid-cols-2 gap-3">
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={`p-3 rounded-lg font-bold transition-colors ${
                selectedAnswer === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
              disabled={selectedAnswer !== null}
            >
              {answer}
            </button>
          ))}
        </div>
        {selectedAnswer !== null && (
          <div className="mt-4 text-center">
            <p className={`text-lg font-bold mb-3 ${
              selectedAnswer === currentQuestion.correctAnswer 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {selectedAnswer === currentQuestion.correctAnswer ? 'Correct! 🎉' : 'Wrong! Try again! 💪'}
            </p>
            <button
              onClick={onSubmitAnswer}
              className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-bold"
            >
              {selectedAnswer === currentQuestion.correctAnswer ? 'Continue' : 'OK'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionModal;
