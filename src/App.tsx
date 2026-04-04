import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

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
const CELL_SIZE = 80;
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

// SVG Components
const PrincessUnicorn: React.FC<{ direction?: 'up' | 'down' | 'left' | 'right' }> = ({ direction = 'up' }) => (
  <svg viewBox="0 0 60 60" className="w-full h-full">
    {/* Unicorn body */}
    <ellipse cx="30" cy="35" rx="15" ry="12" fill="#fff" stroke="#333" strokeWidth="1"/>
    {/* Unicorn head */}
    <ellipse cx="30" cy="20" rx="10" ry="8" fill="#fff" stroke="#333" strokeWidth="1"/>
    {/* Horn */}
    <path d="M30 15 L28 8 L32 8 Z" fill="#ffd700" stroke="#333" strokeWidth="1"/>
    {/* Princess on top */}
    <circle cx="30" cy="10" r="5" fill="#ffb3d9" stroke="#333" strokeWidth="1"/>
    {/* Princess crown */}
    <path d="M27 8 L28 5 L30 6 L32 5 L33 8" fill="#ffd700" stroke="#333" strokeWidth="1"/>
    {/* Eyes */}
    <circle cx="27" cy="18" r="1" fill="#000"/>
    <circle cx="33" cy="18" r="1" fill="#000"/>
    {/* Legs */}
    <rect x="20" y="40" width="3" height="8" fill="#fff" stroke="#333" strokeWidth="1"/>
    <rect x="25" y="40" width="3" height="8" fill="#fff" stroke="#333" strokeWidth="1"/>
    <rect x="32" y="40" width="3" height="8" fill="#fff" stroke="#333" strokeWidth="1"/>
    <rect x="37" y="40" width="3" height="8" fill="#fff" stroke="#333" strokeWidth="1"/>
    {/* Mane */}
    <path d="M35 20 Q40 25 38 30" fill="#ffb3d9" stroke="#333" strokeWidth="1"/>
  </svg>
);

const RainbowCastle: React.FC = () => (
  <svg viewBox="0 0 60 60" className="w-full h-full">
    {/* Castle base */}
    <rect x="10" y="30" width="40" height="25" fill="#ddd" stroke="#333" strokeWidth="1"/>
    {/* Towers */}
    <rect x="5" y="25" width="10" height="30" fill="#ccc" stroke="#333" strokeWidth="1"/>
    <rect x="45" y="25" width="10" height="30" fill="#ccc" stroke="#333" strokeWidth="1"/>
    {/* Tower tops */}
    <path d="M5 25 L10 15 L15 25" fill="#ff6b6b" stroke="#333" strokeWidth="1"/>
    <path d="M45 25 L50 15 L55 25" fill="#4ecdc4" stroke="#333" strokeWidth="1"/>
    {/* Main tower top */}
    <path d="M20 30 L30 10 L40 30" fill="#ffe66d" stroke="#333" strokeWidth="1"/>
    {/* Rainbow flag */}
    <rect x="28" y="5" width="2" height="5" fill="#333"/>
    <rect x="30" y="5" width="15" height="3" fill="#ff0000"/>
    <rect x="30" y="8" width="15" height="3" fill="#ff8800"/>
    <rect x="30" y="11" width="15" height="3" fill="#ffff00"/>
    {/* Door */}
    <rect x="25" y="40" width="10" height="15" fill="#8b4513" stroke="#333" strokeWidth="1"/>
    {/* Windows */}
    <rect x="15" y="35" width="5" height="5" fill="#87ceeb" stroke="#333" strokeWidth="1"/>
    <rect x="40" y="35" width="5" height="5" fill="#87ceeb" stroke="#333" strokeWidth="1"/>
  </svg>
);

const Stone: React.FC = () => (
  <svg viewBox="0 0 60 60" className="w-full h-full">
    <ellipse cx="30" cy="30" rx="20" ry="15" fill="#888" stroke="#333" strokeWidth="2"/>
    <ellipse cx="25" cy="28" rx="5" ry="3" fill="#666"/>
    <ellipse cx="35" cy="32" rx="4" ry="2" fill="#666"/>
  </svg>
);

const Bat: React.FC = () => (
  <svg viewBox="0 0 60 60" className="w-full h-full">
    {/* Bat body */}
    <ellipse cx="30" cy="30" rx="8" ry="12" fill="#4a4a4a" stroke="#333" strokeWidth="1"/>
    {/* Wings */}
    <path d="M22 25 Q10 20 5 25 Q10 30 22 28" fill="#6a6a6a" stroke="#333" strokeWidth="1"/>
    <path d="M38 25 Q50 20 55 25 Q50 30 38 28" fill="#6a6a6a" stroke="#333" strokeWidth="1"/>
    {/* Eyes */}
    <circle cx="27" cy="28" r="2" fill="#ff0000"/>
    <circle cx="33" cy="28" r="2" fill="#ff0000"/>
    {/* Fangs */}
    <path d="M28 33 L27 35 L29 33" fill="#fff"/>
    <path d="M32 33 L31 35 L33 33" fill="#fff"/>
  </svg>
);

const Witch: React.FC = () => (
  <svg viewBox="0 0 60 60" className="w-full h-full">
    {/* Witch body */}
    <rect x="25" y="30" width="10" height="15" fill="#4a0080" stroke="#333" strokeWidth="1"/>
    {/* Head */}
    <circle cx="30" cy="25" r="8" fill="#90ee90" stroke="#333" strokeWidth="1"/>
    {/* Hat */}
    <path d="M22 25 L30 10 L38 25" fill="#4a0080" stroke="#333" strokeWidth="1"/>
    {/* Eyes */}
    <circle cx="27" cy="23" r="1" fill="#000"/>
    <circle cx="33" cy="23" r="1" fill="#000"/>
    {/* Nose */}
    <path d="M30 26 L28 28" stroke="#333" strokeWidth="1"/>
    {/* Broom */}
    <rect x="35" y="35" width="2" height="15" fill="#8b4513" stroke="#333" strokeWidth="1"/>
    <path d="M37 35 Q45 32 48 35" fill="#daa520" stroke="#333" strokeWidth="1"/>
  </svg>
);

const Monster: React.FC = () => (
  <svg viewBox="0 0 60 60" className="w-full h-full">
    {/* Monster body */}
    <ellipse cx="30" cy="35" rx="15" ry="12" fill="#90ee90" stroke="#333" strokeWidth="1"/>
    {/* Spikes */}
    <path d="M20 30 L18 25 L22 28" fill="#228b22"/>
    <path d="M40 30 L42 25 L38 28" fill="#228b22"/>
    <path d="M30 25 L28 20 L32 23" fill="#228b22"/>
    {/* Eyes */}
    <circle cx="25" cy="32" r="3" fill="#ff0000"/>
    <circle cx="35" cy="32" r="3" fill="#ff0000"/>
    <circle cx="25" cy="32" r="1" fill="#000"/>
    <circle cx="35" cy="32" r="1" fill="#000"/>
    {/* Mouth */}
    <path d="M25 38 Q30 42 35 38" fill="#ff0000" stroke="#333" strokeWidth="1"/>
    {/* Teeth */}
    <rect x="27" y="38" width="2" height="3" fill="#fff"/>
    <rect x="31" y="38" width="2" height="3" fill="#fff"/>
  </svg>
);

const TreasureBox: React.FC = () => (
  <svg viewBox="0 0 60 60" className="w-full h-full">
    {/* Treasure box */}
    <rect x="15" y="30" width="30" height="20" fill="#8b4513" stroke="#333" strokeWidth="2"/>
    {/* Lid */}
    <path d="M15 30 Q30 20 45 30" fill="#daa520" stroke="#333" strokeWidth="2"/>
    {/* Lock */}
    <rect x="28" y="35" width="4" height="6" fill="#333"/>
    <circle cx="30" cy="33" r="2" fill="#ffd700"/>
    {/* Sparkles */}
    <circle cx="20" cy="25" r="2" fill="#ffd700" className="animate-sparkle"/>
    <circle cx="40" cy="25" r="2" fill="#ffd700" className="animate-sparkle"/>
    <circle cx="30" cy="20" r="2" fill="#ffd700" className="animate-sparkle"/>
  </svg>
);

const Heart: React.FC<{ filled?: boolean }> = ({ filled = true }) => (
  <svg viewBox="0 0 30 30" className={`w-full h-full ${filled ? 'text-red-500' : 'text-gray-300'}`}>
    <path d="M15 25 C15 25, 3 15, 3 8 C3 4, 6 1, 10 1 C13 1, 15 3, 15 5 C15 3, 17 1, 20 1 C24 1, 27 4, 27 8 C27 15, 15 25, 15 25 Z" 
          fill={filled ? "currentColor" : "none"} 
          stroke="currentColor" 
          strokeWidth="2"/>
  </svg>
);

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
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Princess Unicorn Adventure</h1>
        <div className="flex justify-center gap-2 mb-2">
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
            <div key={i} className="w-8 h-8">
              <Heart filled={i < lives} />
            </div>
          ))}
        </div>
        <button
          onClick={initializeGame}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-bold"
        >
          Reset Game
        </button>
      </div>

      {/* Game Board */}
      <div className="relative bg-green-200 rounded-lg shadow-2xl border-4 border-green-600">
        <div className="grid grid-cols-8 gap-0" style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}>
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
                className={`relative border ${
                  isRoad ? 'border-yellow-600 bg-yellow-100' : 'border-green-400 bg-green-300'
                } ${isStart ? 'bg-yellow-200' : isCastle ? 'bg-purple-200' : ''}`}
                style={{ width: CELL_SIZE, height: CELL_SIZE }}
              >
                {isPlayer && <div className="absolute inset-0 z-20"><PrincessUnicorn /></div>}
                {isCastle && !isPlayer && <div className="absolute inset-0 z-10"><RainbowCastle /></div>}
                {obstacle && !isPlayer && (
                  <div 
                    className="absolute inset-0 z-10 cursor-pointer hover:opacity-80 transition-opacity"
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
      <div className="mt-4 text-center text-white">
        <p className="text-sm">Click on obstacles along the yellow road to battle!</p>
        <p className="text-sm">Answer math questions to clear the path to the castle!</p>
        <p className="text-sm">Clear all obstacles to reach the rainbow castle! 🏰</p>
      </div>
    </div>
  );
}
