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

// Image Components - Replace with actual downloaded images
const PrincessUnicorn: React.FC<{ direction?: 'up' | 'down' | 'left' | 'right' }> = (_props) => (
  <div className="relative w-full h-full">
    <svg viewBox="0 0 36 36" className="w-full h-full">
      {/* Black hair (behind head) */}
      <path fill="#1A1A1A" d="M18 4c6 0 16 3 16 16s0 16-3 16-7-3-13-3-9.915 3-13 3c-3.343 0-3-12-3-16C2 7 12 4 18 4z"/>
      {/* Face */}
      <path fill="#FFDBB4" d="M6 19.562c0-8.526 5.373-15.438 12-15.438s12 6.912 12 15.438S24.627 35 18 35 6 28.088 6 19.562z"/>
      {/* Mouth */}
      <path fill="#DF1F32" d="M18 31c-2.347 0-3.575-1.16-3.707-1.293-.391-.391-.391-1.023 0-1.414.387-.388 1.013-.39 1.404-.01.051.047.806.717 2.303.717 1.519 0 2.273-.69 2.305-.719.399-.374 1.027-.363 1.408.029.379.393.38 1.011-.006 1.397C21.575 29.84 20.347 31 18 31z"/>
      {/* Nose */}
      <path fill="#C1694F" d="M19 26h-2c-.552 0-1-.447-1-1s.448-1 1-1h2c.553 0 1 .447 1 1s-.447 1-1 1z"/>
      {/* Black flowing hair */}
      <path fill="#1A1A1A" d="M3.064 25c-.03-.325-.064-.647-.064-1 0-5 3 .562 3-3 0-3.563 2-4 4-6l3-3s5 3 9 3 8 2 8 6 3-2 3 3c0 .355-.033.673-.058 1h1.049C34 23.523 34 21.868 34 20 34 7 24 2 18 2S2 7 2 20c0 1.158-.028 2.986.012 5h1.052z"/>
      {/* Crown */}
      <path fill="#A7A9AC" d="M8 6h20V5l-3-1-2-3-3 1-2-2-2 2-3-1-2 3-3 1z"/>
      <ellipse fill="#F1F2F2" cx="18" cy="3.5" rx="1" ry="1.5"/>
      <circle fill="#F1F2F2" cx="14" cy="4" r="1"/>
      <circle fill="#F1F2F2" cx="22" cy="4" r="1"/>
      {/* Eyes */}
      <path fill="#662113" d="M13 23c-.552 0-1-.447-1-1v-2c0-.553.448-1 1-1s1 .447 1 1v2c0 .553-.448 1-1 1zm10 0c-.553 0-1-.447-1-1v-2c0-.553.447-1 1-1s1 .447 1 1v2c0 .553-.447 1-1 1z"/>
    </svg>
  </div>
);

const RainbowCastle: React.FC = () => (
  <div className="relative w-full h-full">
    <svg viewBox="0 0 36 36" className="w-full h-full">
      <defs>
        <linearGradient id="castleRainbow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B6B"/>
          <stop offset="20%" stopColor="#FF922B"/>
          <stop offset="40%" stopColor="#FAB005"/>
          <stop offset="60%" stopColor="#51CF66"/>
          <stop offset="80%" stopColor="#339AF0"/>
          <stop offset="100%" stopColor="#CC5DE8"/>
        </linearGradient>
        <linearGradient id="towerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B"/>
          <stop offset="50%" stopColor="#339AF0"/>
          <stop offset="100%" stopColor="#CC5DE8"/>
        </linearGradient>
      </defs>
      {/* Rainbow arcs above battlements (drawn first = behind castle) */}
      <path d="M7 17 Q18 4 29 17" fill="none" stroke="#FF6B6B" strokeWidth="1.4"/>
      <path d="M8 17 Q18 6 28 17" fill="none" stroke="#FF922B" strokeWidth="1.4"/>
      <path d="M9 17 Q18 8 27 17" fill="none" stroke="#FAB005" strokeWidth="1.4"/>
      <path d="M10 17 Q18 10 26 17" fill="none" stroke="#51CF66" strokeWidth="1.4"/>
      <path d="M11 17 Q18 12 25 17" fill="none" stroke="#339AF0" strokeWidth="1.4"/>
      <path d="M12 17 Q18 14 24 17" fill="none" stroke="#CC5DE8" strokeWidth="1.4"/>
      {/* Main wall — rainbow gradient */}
      <path fill="url(#castleRainbow)" d="M4 17h28v19H4z"/>
      {/* Battlements */}
      <path fill="#9C36B5" d="M6 13h23v5H6z"/>
      {/* Side towers — gradient */}
      <path fill="url(#towerGrad)" d="M1 12v22c0 1.104.896 2 2 2h4V12H1zm28 0v24h4c1.104 0 2-.896 2-2V12h-6z"/>
      {/* Door opening */}
      <path fill="#F2F9FF" d="M14 22h8v11h-8z"/>
      {/* Door arch */}
      <path fill="#9C36B5" d="M22 19c-.295 0-.558.391-.74 1h-6.52c-.183-.609-.445-1-.74-1-.552 0-1 1.344-1 3 0 1.657.448 3 1 3s1-1.343 1-3h6c0 1.657.447 3 1 3s1-1.343 1-3c0-1.656-.447-3-1-3z"/>
      {/* Brick details */}
      <path fill="#862E9C" d="M3 17h2v2H3zm6 3h2v2H9zm16 0h2v2h-2zM9 24h2v2H9zm16 0h2v2h-2zM3 21h2v2H3zm28-4h2v2h-2zm0 4h2v2h-2z"/>
      {/* Door frame */}
      <path fill="#F2F9FF" d="M13 22h10v4H13z"/>
      {/* Gate */}
      <path fill="#5F3DC4" d="M18 26c-1.104 0-2 .896-2 2v5h4v-5c0-1.104-.896-2-2-2z"/>
      {/* Base */}
      <path fill="#862E9C" d="M12 33h12v3H12z"/>
      {/* Tower peaked caps */}
      <path fill="#FF6B6B" d="M1 12h6S5 4 4 4s-3 8-3 8zm28 0h6s-2-8-3-8-3 8-3 8z"/>
      {/* Tower top accent */}
      <path fill="#F783AC" d="M8 14c0 .552-.448 1-1 1H1c-.552 0-1-.448-1-1s.448-1 1-1h6c.552 0 1 .448 1 1zm28 0c0 .552-.447 1-1 1h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1z"/>
    </svg>
  </div>
);

const Stone: React.FC = () => (
  <div className="relative w-full h-full">
    <img 
      src="/images/stone.png" 
      alt="Stone"
      className="w-full h-full object-contain"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        e.currentTarget.nextElementSibling?.classList.remove('hidden');
      }}
    />
    <svg viewBox="0 0 100 100" className="w-full h-full hidden">
      {/* Fallback SVG */}
      <ellipse cx="50" cy="50" rx="35" ry="25" fill="#6b7280" stroke="#374151" strokeWidth="3"/>
      <ellipse cx="40" cy="45" rx="12" ry="8" fill="#4b5563"/>
      <ellipse cx="60" cy="55" rx="10" ry="6" fill="#4b5563"/>
      <ellipse cx="45" cy="60" rx="8" ry="5" fill="#374151"/>
      <path d="M30 40 L35 55 L40 65" fill="none" stroke="#1f2937" strokeWidth="2"/>
      <path d="M65 35 L60 50 L55 60" fill="none" stroke="#1f2937" strokeWidth="2"/>
      <ellipse cx="25" cy="50" rx="8" ry="4" fill="#10b981" opacity="0.7"/>
      <ellipse cx="75" cy="45" rx="6" ry="3" fill="#10b981" opacity="0.7"/>
      <circle cx="35" cy="70" r="5" fill="#6b7280" stroke="#374151" strokeWidth="2"/>
      <circle cx="65" cy="30" r="4" fill="#6b7280" stroke="#374151" strokeWidth="2"/>
    </svg>
  </div>
);

const Bat: React.FC = () => (
  <div className="relative w-full h-full">
    <img 
      src="/images/bat.png" 
      alt="Bat"
      className="w-full h-full object-contain"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        e.currentTarget.nextElementSibling?.classList.remove('hidden');
      }}
    />
    <svg viewBox="0 0 100 100" className="w-full h-full hidden">
      {/* Fallback SVG */}
      <ellipse cx="50" cy="50" rx="15" ry="20" fill="#1f2937" stroke="#111827" strokeWidth="3"/>
      <path d="M35 45 Q10 30 5 45 Q10 55 35 50" fill="#374151" stroke="#111827" strokeWidth="3"/>
      <path d="M65 45 Q90 30 95 45 Q90 55 65 50" fill="#374151" stroke="#111827" strokeWidth="3"/>
      <path d="M25 40 Q15 35 10 40" fill="none" stroke="#111827" strokeWidth="2"/>
      <path d="M75 40 Q85 35 90 40" fill="none" stroke="#111827" strokeWidth="2"/>
      <circle cx="50" cy="30" r="12" fill="#1f2937" stroke="#111827" strokeWidth="3"/>
      <path d="M40 25 L38 15 L45 22" fill="#1f2937" stroke="#111827" strokeWidth="2"/>
      <path d="M60 25 L62 15 L55 22" fill="#1f2937" stroke="#111827" strokeWidth="2"/>
      <circle cx="44" cy="28" r="3" fill="#ef4444"/>
      <circle cx="56" cy="28" r="3" fill="#ef4444"/>
      <circle cx="45" cy="27" r="1" fill="#ffffff"/>
      <circle cx="57" cy="27" r="1" fill="#ffffff"/>
      <path d="M47 35 L46 40 L48 35" fill="#ffffff"/>
      <path d="M53 35 L52 40 L54 35" fill="#ffffff"/>
      <circle cx="5" cy="45" r="2" fill="#ef4444"/>
      <circle cx="95" cy="45" r="2" fill="#ef4444"/>
    </svg>
  </div>
);

const Witch: React.FC = () => (
  <div className="relative w-full h-full">
    <img 
      src="/images/witch.png" 
      alt="Witch"
      className="w-full h-full object-contain"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        e.currentTarget.nextElementSibling?.classList.remove('hidden');
      }}
    />
    <svg viewBox="0 0 100 100" className="w-full h-full hidden">
      {/* Fallback SVG */}
      <rect x="40" y="50" width="20" height="30" fill="#4c1d95" stroke="#2e1065" strokeWidth="3" rx="5"/>
      <path d="M35 70 Q50 85 65 70 L60 50 L40 50 Z" fill="#6b21a8" stroke="#2e1065" strokeWidth="3"/>
      <circle cx="50" cy="30" r="15" fill="#86efac" stroke="#16a34a" strokeWidth="3"/>
      <path d="M35 30 L50 5 L65 30" fill="#1e293b" stroke="#0f172a" strokeWidth="3"/>
      <path d="M40 30 L50 15 L60 30" fill="#475569" stroke="#0f172a" strokeWidth="2"/>
      <rect x="48" y="25" width="4" height="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
      <circle cx="44" cy="28" r="2" fill="#1f2937"/>
      <circle cx="56" cy="28" r="2" fill="#1f2937"/>
      <circle cx="60" cy="32" r="2" fill="#16a34a"/>
      <path d="M50 35 L48 38" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
      <path d="M45 40 Q50 43 55 40" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
      <rect x="65" y="60" width="4" height="25" fill="#92400e" stroke="#451a03" strokeWidth="2"/>
      <path d="M69 60 Q85 55 90 65 Q85 70 69 65" fill="#fbbf24" stroke="#92400e" strokeWidth="2"/>
      <path d="M85 55 L88 50 L90 55" fill="#f59e0b"/>
      <path d="M87 57 L90 52 L92 57" fill="#f59e0b"/>
      <path d="M86 59 L89 54 L91 59" fill="#f59e0b"/>
      <circle cx="38" cy="55" r="4" fill="#86efac" stroke="#16a34a" strokeWidth="2"/>
      <circle cx="62" cy="55" r="4" fill="#86efac" stroke="#16a34a" strokeWidth="2"/>
    </svg>
  </div>
);

const Monster: React.FC = () => (
  <div className="relative w-full h-full">
    <img 
      src="/images/monster.png" 
      alt="Monster"
      className="w-full h-full object-contain"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        e.currentTarget.nextElementSibling?.classList.remove('hidden');
      }}
    />
    <svg viewBox="0 0 100 100" className="w-full h-full hidden">
      {/* Fallback SVG */}
      <ellipse cx="50" cy="55" rx="30" ry="25" fill="#86efac" stroke="#16a34a" strokeWidth="3"/>
      <path d="M30 50 L25 35 L35 45" fill="#16a34a"/>
      <path d="M70 50 L75 35 L65 45" fill="#16a34a"/>
      <path d="M50 40 L45 25 L55 35" fill="#16a34a"/>
      <path d="M40 45 L35 30 L45 40" fill="#16a34a"/>
      <path d="M60 45 L65 30 L55 40" fill="#16a34a"/>
      <ellipse cx="50" cy="35" rx="25" ry="20" fill="#86efac" stroke="#16a34a" strokeWidth="3"/>
      <circle cx="40" cy="30" r="8" fill="#ffffff" stroke="#16a34a" strokeWidth="3"/>
      <circle cx="60" cy="30" r="8" fill="#ffffff" stroke="#16a34a" strokeWidth="3"/>
      <circle cx="40" cy="30" r="4" fill="#ef4444"/>
      <circle cx="60" cy="30" r="4" fill="#ef4444"/>
      <circle cx="41" cy="28" r="2" fill="#1f2937"/>
      <circle cx="61" cy="28" r="2" fill="#1f2937"/>
      <path d="M35 45 Q50 55 65 45" fill="#ef4444" stroke="#16a34a" strokeWidth="3"/>
      <rect x="42" y="45" width="4" height="6" fill="#ffffff" stroke="#16a34a" strokeWidth="2"/>
      <rect x="48" y="45" width="4" height="6" fill="#ffffff" stroke="#16a34a" strokeWidth="2"/>
      <rect x="54" y="45" width="4" height="6" fill="#ffffff" stroke="#16a34a" strokeWidth="2"/>
      <ellipse cx="25" cy="50" rx="8" ry="15" fill="#86efac" stroke="#16a34a" strokeWidth="3" transform="rotate(-30 25 50)"/>
      <ellipse cx="75" cy="50" rx="8" ry="15" fill="#86efac" stroke="#16a34a" strokeWidth="3" transform="rotate(30 75 50)"/>
      <circle cx="20" cy="60" r="3" fill="#16a34a"/>
      <circle cx="80" cy="60" r="3" fill="#16a34a"/>
      <circle cx="18" cy="55" r="2" fill="#16a34a"/>
      <circle cx="82" cy="55" r="2" fill="#16a34a"/>
      <rect x="35" y="75" width="8" height="15" fill="#86efac" stroke="#16a34a" strokeWidth="3" rx="4"/>
      <rect x="57" y="75" width="8" height="15" fill="#86efac" stroke="#16a34a" strokeWidth="3" rx="4"/>
      <ellipse cx="39" cy="90" rx="6" ry="4" fill="#16a34a"/>
      <ellipse cx="61" cy="90" rx="6" ry="4" fill="#16a34a"/>
    </svg>
  </div>
);

const TreasureBox: React.FC = () => (
  <div className="relative w-full h-full">
    <img 
      src="/images/treasure-box.png" 
      alt="Treasure Box"
      className="w-full h-full object-contain"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        e.currentTarget.nextElementSibling?.classList.remove('hidden');
      }}
    />
    <svg viewBox="0 0 100 100" className="w-full h-full hidden">
      {/* Fallback SVG */}
      <rect x="20" y="50" width="60" height="40" fill="#92400e" stroke="#451a03" strokeWidth="4" rx="5"/>
      <rect x="25" y="55" width="50" height="30" fill="#78350f" stroke="#451a03" strokeWidth="2" rx="3"/>
      <rect x="20" y="60" width="60" height="5" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
      <rect x="20" y="75" width="60" height="5" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
      <path d="M20 50 Q50 30 80 50" fill="#fbbf24" stroke="#451a03" strokeWidth="4"/>
      <path d="M25 50 Q50 35 75 50" fill="#f59e0b" stroke="#451a03" strokeWidth="2"/>
      <rect x="45" y="60" width="10" height="12" fill="#1f2937" stroke="#111827" strokeWidth="3" rx="2"/>
      <circle cx="50" cy="55" r="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
      <circle cx="50" cy="55" r="2" fill="#1f2937"/>
      <path d="M50 57 Q48 59 48 62 Q48 65 50 65 Q52 65 52 62 Q52 59 50 57" fill="#1f2937"/>
      <circle cx="30" cy="40" r="4" fill="#fbbf24" className="animate-sparkle"/>
      <circle cx="70" cy="40" r="4" fill="#fbbf24" className="animate-sparkle"/>
      <circle cx="50" cy="25" r="4" fill="#fbbf24" className="animate-sparkle"/>
      <circle cx="35" cy="30" r="3" fill="#10b981" className="animate-sparkle"/>
      <circle cx="65" cy="30" r="3" fill="#10b981" className="animate-sparkle"/>
      <circle cx="25" cy="50" r="2" fill="#ef4444" className="animate-sparkle"/>
      <circle cx="75" cy="50" r="2" fill="#ef4444" className="animate-sparkle"/>
      <circle cx="35" cy="48" r="3" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
      <circle cx="65" cy="48" r="3" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
      <circle cx="50" cy="45" r="3" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
    </svg>
  </div>
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
