import './App.css';
import { 
  PrincessUnicorn, 
  RainbowCastle, 
  Spider, 
  Bat, 
  Witch, 
  Monster, 
  TreasureBox, 
  Heart,
  QuestionModal,
  GameOverModal,
  VictoryModal
} from './components';
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
    canClickObstacle,
  } = useGameLogic();

  const handleCastleClick = () => {
    if (gameState === 'playing') {
      const castlePosition = { x: 7, y: 0 }; // GRID_SIZE - 1, 0
      // Check if player can reach castle
      if (isRoadCell(castlePosition.x, castlePosition.y)) {
        // Check if path is clear (no uncleared obstacles blocking)
        const hasPathToCastle = obstacles.every(obs => {
          if (obs.cleared) return true;
          // Check if this obstacle blocks the path to castle
          return !(obs.position.x === castlePosition.x && obs.position.y === castlePosition.y);
        });
        
        if (hasPathToCastle) {
          // Trigger victory
          setTimeout(() => {
            // This will be handled by the existing victory logic
            console.log('Castle clicked and reachable!');
          }, 100);
        }
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-green-400 to-blue-500 relative overflow-hidden">
      {/* Scenic Background Elements */}
      <div className="absolute inset-0">
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
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">Princess Elvia Adventure</h1>
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
                  {isCastle && !isPlayer && (
                    <div 
                      className="absolute inset-0 z-10 cursor-pointer hover:scale-110 transition-transform"
                      onClick={handleCastleClick}
                    >
                      <RainbowCastle />
                    </div>
                  )}
                  {obstacle && !isPlayer && (
                    <div 
                      className={`absolute inset-0 z-10 transition-transform ${
                        canClickObstacle(obstacle.id) 
                          ? 'cursor-pointer hover:scale-110' 
                          : 'cursor-not-allowed opacity-60'
                      }`}
                      onClick={() => canClickObstacle(obstacle.id) && handleObstacleClick(obstacle.id)}
                    >
                      {obstacle.type === 'spider' && <Spider />}
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
      <QuestionModal
        currentQuestion={currentQuestion}
        selectedAnswer={selectedAnswer}
        showQuestion={showQuestion}
        onAnswerSelect={handleAnswerSelect}
        onSubmitAnswer={handleSubmitAnswer}
      />

      {/* Game Over Modal */}
      {gameState === 'gameOver' && (
        <GameOverModal onPlayAgain={initializeGame} />
      )}

      {/* Victory Modal */}
      {gameState === 'victory' && (
        <VictoryModal onPlayAgain={initializeGame} />
      )}
    </div>
  );
}
