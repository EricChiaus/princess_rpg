import './App.css';
import { PrincessUnicorn, RainbowCastle, Stone, Bat, Witch, Monster, TreasureBox, Heart } from './components';
import { useGameLogic } from './hooks/useGameLogic';

// Game constants
const GRID_SIZE = 8;
const CELL_SIZE = 120;

export default function App() {
  const {
    playerPosition,
    lives,
    gameState,
    obstacles,
    currentQuestion,
    showQuestion,
    selectedAnswer,
    initializeGame,
    handleObstacleClick,
    handleAnswerSelect,
    handleSubmitAnswer,
    isRoadCell,
  } = useGameLogic();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-green-400 to-blue-500 relative overflow-hidden">
      {/* Scenic Background Elements */}
      <div className="absolute inset-0">
        {/* Beach area */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-200 to-yellow-100 opacity-60"></div>
        {/* Forest areas */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-600 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-green-700 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-40 left-20 w-36 h-36 bg-green-600 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-32 right-10 w-28 h-28 bg-green-700 rounded-full opacity-30 blur-xl"></div>
        {/* Clouds */}
        <div className="absolute top-5 left-1/4 w-24 h-12 bg-white rounded-full opacity-40"></div>
        <div className="absolute top-8 right-1/3 w-32 h-16 bg-white rounded-full opacity-30"></div>
        <div className="absolute top-15 left-1/2 w-28 h-14 bg-white rounded-full opacity-35"></div>
      </div>

      {/* Header */}
      <div className="relative z-20 flex flex-col items-center pt-4 pb-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">Princess Unicorn Adventure</h1>
        <div className="flex justify-center gap-2 mb-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-8 h-8">
              <Heart filled={i < lives} />
            </div>
          ))}
        </div>
        <button
          onClick={initializeGame}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-bold shadow-lg"
        >
          Reset Game
        </button>
      </div>

      {/* Game Board - Fullscreen */}
      <div className="relative z-10 flex items-center justify-center flex-1 pb-24" style={{ height: 'calc(100vh - 200px)' }}>
        <div className="relative" style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}>
          {/* Game Board Grid - No Borders */}
          <div className="grid grid-cols-8 gap-0 absolute inset-0">
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
              const x = index % GRID_SIZE;
              const y = Math.floor(index / GRID_SIZE);
              const isPlayer = playerPosition.x === x && playerPosition.y === y;
              const isCastle = x === GRID_SIZE - 1 && y === 0;
              const isStart = x === 0 && y === GRID_SIZE - 1;
              const isRoad = isRoadCell(x, y);
              const obstacle = obstacles.find(obs => obs.position.x === x && obs.position.y === y && !obs.cleared);

              return (
                <div
                  key={index}
                  className={`relative ${
                    isRoad ? 'bg-yellow-200 bg-opacity-60' : 'bg-transparent'
                  } ${isStart ? 'bg-yellow-300 bg-opacity-80' : isCastle ? 'bg-purple-300 bg-opacity-80' : ''}`}
                  style={{ width: CELL_SIZE, height: CELL_SIZE }}
                >
                  {isRoad && (
                    <div className="absolute inset-0 border-l-2 border-r-2 border-yellow-400 border-opacity-30"></div>
                  )}
                  {isPlayer && <div className="absolute inset-0 z-20"><PrincessUnicorn /></div>}
                  {isCastle && !isPlayer && <div className="absolute inset-0 z-10"><RainbowCastle /></div>}
                  {obstacle && !isPlayer && (
                    <div 
                      className="absolute inset-0 z-10 cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => handleObstacleClick(obstacle.id)}
                    >
                      {obstacle.type === 'stone' && <Stone />}
                      {obstacle.type === 'bat' && <Bat />}
                      {obstacle.type === 'witch' && <Witch />}
                      {obstacle.type === 'monster' && <Monster />}
                      {obstacle.type === 'treasure' && <TreasureBox />}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Question Modal */}
      {showQuestion && currentQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-center mb-4">Math Question!</h2>
            <p className="text-xl text-center mb-6">{currentQuestion.question}</p>
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
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
                  {selectedAnswer === currentQuestion.correctAnswer ? 'Correct! 🎉' : 'Wrong! Try again! �'}
                </p>
                <button
                  onClick={handleSubmitAnswer}
                  className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-bold"
                >
                  {selectedAnswer === currentQuestion.correctAnswer ? 'Continue' : 'OK'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {gameState === 'gameOver' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Game Over! 😢</h2>
            <p className="text-lg mb-6">You ran out of lives. Try again!</p>
            <button
              onClick={initializeGame}
              className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-bold"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Victory Modal */}
      {gameState === 'victory' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-4">Victory! 🎉</h2>
            <p className="text-lg mb-6">Congratulations! You reached the castle!</p>
            <button
              onClick={initializeGame}
              className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-bold"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="relative z-20 mt-4 text-center text-white pb-4">
        <p className="text-sm">Click on obstacles along the yellow road to battle!</p>
        <p className="text-sm">Answer math questions to clear the path to the castle!</p>
        <p className="text-sm">Clear all obstacles to reach the rainbow castle! 🏰</p>
      </div>
    </div>
  );
}
