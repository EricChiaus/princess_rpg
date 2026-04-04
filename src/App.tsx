import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { PrincessUnicorn, RainbowCastle, Stone, Bat, Witch, Monster, TreasureBox, Heart } from './components';

// Types
type Position = { x: number; y: number };
type ObstacleType = 'stone' | 'bat' | 'witch' | 'monster' | 'treasure';
type GameState = 'playing' | 'gameOver' | 'victory';

interface Obstacle {
  id: string;
  type: ObstacleType;
  position: Position;
  cleared: boolean;
}

interface Question {
  question: string;
  answers: string[];
  correctAnswer: number;
}

// Game constants
const GRID_SIZE = 8;
const CELL_SIZE = 120;
const MAX_LIVES = 3;

// Math question generator
const generateQuestion = (): Question => {
  const operations = ['+', '-', '*'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  let a: number, b: number, answer: number;

  switch (operation) {
    case '+':
      a = Math.floor(Math.random() * 20) + 1;
      b = Math.floor(Math.random() * 20) + 1;
      answer = a + b;
      break;
    case '-':
      a = Math.floor(Math.random() * 20) + 10;
      b = Math.floor(Math.random() * a);
      answer = a - b;
      break;
    case '*':
      a = Math.floor(Math.random() * 10) + 1;
      b = Math.floor(Math.random() * 10) + 1;
      answer = a * b;
      break;
    default:
      a = 1; b = 1; answer = 2;
  }

  const correctAnswer = answer;
  const answers = [correctAnswer.toString()];
  
  // Generate 3 wrong answers
  while (answers.length < 4) {
    const wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;
    if (wrongAnswer !== correctAnswer && wrongAnswer > 0 && !answers.includes(wrongAnswer.toString())) {
      answers.push(wrongAnswer.toString());
    }
  }

  // Shuffle answers
  answers.sort(() => Math.random() - 0.5);
  const correctIndex = answers.indexOf(correctAnswer.toString());

  return {
    question: `${a} ${operation} ${b} = ?`,
    answers,
    correctAnswer: correctIndex
  };
};

export default function App() {
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 0, y: GRID_SIZE - 1 });
  const [lives, setLives] = useState(MAX_LIVES);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentBattlingObstacle, setCurrentBattlingObstacle] = useState<string | null>(null);

  // Initialize game
  const initializeGame = useCallback(() => {
    setPlayerPosition({ x: 0, y: GRID_SIZE - 1 });
    setLives(MAX_LIVES);
    setGameState('playing');
    setCurrentQuestion(null);
    setShowQuestion(false);
    setSelectedAnswer(null);
    setCurrentBattlingObstacle(null);
    
    // Generate random obstacles on the road
    const newObstacles: Obstacle[] = [];
    const obstacleTypes: ObstacleType[] = ['stone', 'bat', 'witch', 'monster', 'treasure'];
    
    // Define the road path from bottom-left to top-right
    const roadPath: Position[] = [
      // Start moving right along bottom
      { x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 },
      // Move up
      { x: 3, y: 6 }, { x: 3, y: 5 }, { x: 3, y: 4 },
      // Move right
      { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 },
      // Move up to top
      { x: 6, y: 3 }, { x: 6, y: 2 }, { x: 6, y: 1 },
      // Move to castle
      { x: 7, y: 1 }, { x: 7, y: 0 }
    ];
    
    // Place obstacles randomly on the road (excluding start and end)
    const availablePositions = roadPath.filter(pos => 
      !(pos.x === 0 && pos.y === 7) && !(pos.x === 7 && pos.y === 0)
    );
    
    const usedPositions = new Set<string>();
    const numObstacles = Math.min(6, availablePositions.length);
    
    for (let i = 0; i < numObstacles; i++) {
      let position: Position;
      let attempts = 0;
      do {
        position = availablePositions[Math.floor(Math.random() * availablePositions.length)];
        attempts++;
      } while (usedPositions.has(`${position.x},${position.y}`) && attempts < 20);
      
      if (attempts < 20) {
        usedPositions.add(`${position.x},${position.y}`);
        newObstacles.push({
          id: `obstacle-${i}`,
          type: obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)],
          position,
          cleared: false
        });
      }
    }
    
    setObstacles(newObstacles);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Handle obstacle click (battle)
  const handleObstacleClick = useCallback((obstacleId: string) => {
    if (gameState !== 'playing' || showQuestion) return;

    const obstacle = obstacles.find(obs => obs.id === obstacleId && !obs.cleared);
    if (!obstacle) return;

    setCurrentBattlingObstacle(obstacleId);
    const question = generateQuestion();
    setCurrentQuestion(question);
    setShowQuestion(true);
    setSelectedAnswer(null);
  }, [gameState, showQuestion, obstacles]);

  // Handle answer selection
  const handleAnswer = useCallback((answerIndex: number) => {
    if (!currentQuestion || !showQuestion || !currentBattlingObstacle) return;

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    setTimeout(() => {
      const obstacle = obstacles.find(obs => obs.id === currentBattlingObstacle);

      if (obstacle) {
        const updatedObstacles = obstacles.map(obs => 
          obs.id === obstacle.id ? { ...obs, cleared: true } : obs
        );
        setObstacles(updatedObstacles);

        if (isCorrect) {
          if (obstacle.type === 'treasure') {
            setLives(prev => Math.min(prev + 1, MAX_LIVES));
          }
        } else {
          if (obstacle.type !== 'treasure') {
            const newLives = lives - 1;
            setLives(newLives);
            if (newLives <= 0) {
              setGameState('gameOver');
              return;
            }
          }
        }
      }

      setCurrentBattlingObstacle(null);
      setShowQuestion(false);
      setCurrentQuestion(null);
      setSelectedAnswer(null);
    }, 1000);
  }, [currentQuestion, showQuestion, currentBattlingObstacle, obstacles, lives]);

  // Check victory condition
  useEffect(() => {
    if (gameState === 'playing') {
      // Check if all obstacles on the path are cleared
      const roadPath: Position[] = [
        { x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 },
        { x: 3, y: 6 }, { x: 3, y: 5 }, { x: 3, y: 4 },
        { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 },
        { x: 6, y: 3 }, { x: 6, y: 2 }, { x: 6, y: 1 },
        { x: 7, y: 1 }, { x: 7, y: 0 }
      ];

      const hasRemainingObstacles = obstacles.some(obs => 
        !obs.cleared && roadPath.some(pos => pos.x === obs.position.x && pos.y === obs.position.y)
      );

      if (!hasRemainingObstacles && obstacles.length > 0) {
        setGameState('victory');
      }
    }
  }, [obstacles, gameState]);

  // Define the road path for rendering
  const roadPath: Position[] = [
    { x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 },
    { x: 3, y: 6 }, { x: 3, y: 5 }, { x: 3, y: 4 },
    { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 },
    { x: 6, y: 3 }, { x: 6, y: 2 }, { x: 6, y: 1 },
    { x: 7, y: 1 }, { x: 7, y: 0 }
  ];

  const isRoadCell = (x: number, y: number) => {
    return roadPath.some(pos => pos.x === x && pos.y === y);
  };

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
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
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
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`p-3 rounded-lg font-bold transition-all ${
                    selectedAnswer === index
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {answer}
                </button>
              ))}
            </div>
            {selectedAnswer !== null && (
              <p className={`text-center mt-4 font-bold ${
                selectedAnswer === currentQuestion.correctAnswer ? 'text-green-600' : 'text-red-600'
              }`}>
                {selectedAnswer === currentQuestion.correctAnswer ? 'Correct! 🎉' : 'Wrong! 💔'}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {gameState === 'gameOver' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Game Over!</h2>
            <p className="text-xl mb-4">The princess lost all her hearts!</p>
            <button
              onClick={initializeGame}
              className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-bold"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Victory Modal */}
      {gameState === 'victory' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <h2 className="text-3xl font-bold text-purple-600 mb-4 animate-bounce">Victory! 🎉</h2>
            <p className="text-xl mb-4">The princess reached the rainbow castle!</p>
            <div className="text-6xl mb-4 animate-sparkle">👑</div>
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
