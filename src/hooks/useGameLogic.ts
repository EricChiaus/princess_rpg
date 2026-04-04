import { useState, useEffect, useCallback } from 'react';
import { Position, Obstacle, ObstacleType, GameState, Question } from '../types';

const GRID_SIZE = 8;
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

  const answers = [answer.toString()];
  while (answers.length < 4) {
    const wrongAnswer = answer + Math.floor(Math.random() * 10) - 5;
    if (!answers.includes(wrongAnswer.toString()) && wrongAnswer > 0) {
      answers.push(wrongAnswer.toString());
    }
  }
  answers.sort(() => Math.random() - 0.5);
  const correctIndex = answers.indexOf(answer.toString());

  return {
    question: `${a} ${operation} ${b} = ?`,
    answers,
    correctAnswer: correctIndex
  };
};

// Generate random road path
const generateRandomRoad = (): Position[] => {
  const road: Position[] = [];
  let currentX = 0;
  let currentY = GRID_SIZE - 1;
  
  road.push({ x: currentX, y: currentY });
  
  while (currentX < GRID_SIZE - 1 || currentY > 0) {
    const canGoRight = currentX < GRID_SIZE - 1;
    const canGoUp = currentY > 0;
    
    if (canGoRight && canGoUp) {
      // Random choice between right and up
      if (Math.random() < 0.6) {
        currentX++;
      } else {
        currentY--;
      }
    } else if (canGoRight) {
      currentX++;
    } else if (canGoUp) {
      currentY--;
    }
    
    road.push({ x: currentX, y: currentY });
  }
  
  return road;
};

// Generate obstacles on road
const generateObstacles = (road: Position[]): Obstacle[] => {
  const obstacleTypes: ObstacleType[] = ['stone', 'bat', 'witch', 'monster', 'treasure'];
  const obstacles: Obstacle[] = [];
  
  // Don't place obstacles at start or end
  const availablePositions = road.slice(1, -1);
  
  // Place 3-5 random obstacles on the road
  const obstacleCount = Math.floor(Math.random() * 3) + 3;
  const selectedPositions: Position[] = [];
  
  for (let i = 0; i < obstacleCount && i < availablePositions.length; i++) {
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    const position = availablePositions[randomIndex];
    
    if (!selectedPositions.some(pos => pos.x === position.x && pos.y === position.y)) {
      selectedPositions.push(position);
      obstacles.push({
        id: `obstacle-${position.x}-${position.y}`,
        type: obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)],
        position,
        cleared: false
      });
    }
  }
  
  return obstacles;
};

export const useGameLogic = () => {
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 0, y: GRID_SIZE - 1 });
  const [lives, setLives] = useState(MAX_LIVES);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentBattlingObstacle, setCurrentBattlingObstacle] = useState<string | null>(null);
  const [roadPath, setRoadPath] = useState<Position[]>([]);

  const isRoadCell = useCallback((x: number, y: number) => {
    return roadPath.some(pos => pos.x === x && pos.y === y);
  }, [roadPath]);

  const initializeGame = useCallback(() => {
    const newRoad = generateRandomRoad();
    const newObstacles = generateObstacles(newRoad);
    
    setPlayerPosition({ x: 0, y: GRID_SIZE - 1 });
    setLives(MAX_LIVES);
    setGameState('playing');
    setObstacles(newObstacles);
    setCurrentQuestion(null);
    setShowQuestion(false);
    setSelectedAnswer(null);
    setCurrentBattlingObstacle(null);
    setRoadPath(newRoad);
  }, []);

  const handleObstacleClick = useCallback((obstacleId: string) => {
    const obstacle = obstacles.find(obs => obs.id === obstacleId);
    if (!obstacle || obstacle.cleared || gameState !== 'playing') return;

    setCurrentBattlingObstacle(obstacleId);
    setCurrentQuestion(generateQuestion());
    setShowQuestion(true);
    setSelectedAnswer(null);
  }, [obstacles, gameState]);

  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (currentQuestion === null || showQuestion === false) return;
    
    setSelectedAnswer(answerIndex);
  }, [currentQuestion, showQuestion]);

  const handleSubmitAnswer = useCallback(() => {
    if (selectedAnswer === null || currentQuestion === null || currentBattlingObstacle === null) return;

    if (selectedAnswer === currentQuestion.correctAnswer) {
      // Correct answer - clear obstacle
      setObstacles(prev => prev.map(obs => 
        obs.id === currentBattlingObstacle 
          ? { ...obs, cleared: true }
          : obs
      ));
      
      // Move player to obstacle position
      const obstacle = obstacles.find(obs => obs.id === currentBattlingObstacle);
      if (obstacle) {
        setPlayerPosition(obstacle.position);
      }
    } else {
      // Wrong answer - lose a life
      const newLives = lives - 1;
      setLives(newLives);
      
      if (newLives <= 0) {
        setGameState('gameOver');
      }
    }

    setShowQuestion(false);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setCurrentBattlingObstacle(null);
  }, [selectedAnswer, currentQuestion, currentBattlingObstacle, lives, obstacles]);

  const movePlayer = useCallback(() => {
    if (gameState !== 'playing') return;

    // Find next road position
    const currentIndex = roadPath.findIndex(pos => 
      pos.x === playerPosition.x && pos.y === playerPosition.y
    );

    if (currentIndex < roadPath.length - 1) {
      const nextPosition = roadPath[currentIndex + 1];
      
      // Check if next position has an uncleared obstacle
      const obstacle = obstacles.find(obs => 
        obs.position.x === nextPosition.x && 
        obs.position.y === nextPosition.y && 
        !obs.cleared
      );

      if (!obstacle) {
        setPlayerPosition(nextPosition);
      }
    }
  }, [gameState, roadPath, playerPosition, obstacles]);

  // Check win condition
  useEffect(() => {
    if (gameState === 'playing') {
      const castlePosition = { x: GRID_SIZE - 1, y: 0 };
      const allObstaclesCleared = obstacles.every(obs => obs.cleared);
      
      if (playerPosition.x === castlePosition.x && playerPosition.y === castlePosition.y && allObstaclesCleared) {
        setGameState('victory');
      }
    }
  }, [playerPosition, obstacles, gameState]);

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return {
    // State
    playerPosition,
    lives,
    gameState,
    obstacles,
    currentQuestion,
    showQuestion,
    selectedAnswer,
    roadPath,
    
    // Actions
    initializeGame,
    handleObstacleClick,
    handleAnswerSelect,
    handleSubmitAnswer,
    movePlayer,
    isRoadCell,
  };
};
