import { useState, useCallback } from 'react';
import { Position, Obstacle, GameState, Question } from '../types';
import { generateRandomRoad, generateObstacles } from './useRoadGeneration';
import { generateQuestion } from './useMathQuestions';

const GRID_SIZE = 8;
const MAX_LIVES = 3;

// Map obstacle types to difficulty levels
const obstacleDifficulty: Record<string, 'easy' | 'medium' | 'hard' | 'expert' | 'master'> = {
  'stone': 'easy',
  'bat': 'medium', 
  'witch': 'hard',
  'treasure': 'expert',
  'monster': 'master'
};

// Check if position is reachable from player position along road
const isPositionReachable = (playerPos: Position, targetPos: Position, road: Position[]): boolean => {
  const playerIndex = road.findIndex(pos => pos.x === playerPos.x && pos.y === playerPos.y);
  const targetIndex = road.findIndex(pos => pos.x === targetPos.x && pos.y === targetPos.y);
  
  // If either position is not on the road, it's not reachable
  if (playerIndex === -1 || targetIndex === -1) return false;
  
  // Target is reachable if it's at or after the player position on the road
  return targetIndex >= playerIndex;
};

export const useGameState = () => {
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 0, y: GRID_SIZE - 1 });
  const [lives, setLives] = useState(MAX_LIVES);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentBattlingObstacle, setCurrentBattlingObstacle] = useState<string | null>(null);
  const [roadPath, setRoadPath] = useState<Position[]>([]);

  const initializeGame = useCallback(() => {
    const { road } = generateRandomRoad();
    const newObstacles = generateObstacles(road);
    
    setPlayerPosition({ x: 0, y: GRID_SIZE - 1 });
    setLives(MAX_LIVES);
    setGameState('playing');
    setObstacles(newObstacles);
    setCurrentQuestion(null);
    setShowQuestion(false);
    setSelectedAnswer(null);
    setCurrentBattlingObstacle(null);
    setRoadPath(road);
  }, []);

  const startBattle = useCallback((obstacleId: string) => {
    const obstacle = obstacles.find(obs => obs.id === obstacleId);
    if (!obstacle) return;
    
    // Check if obstacle is reachable
    if (!isPositionReachable(playerPosition, obstacle.position, roadPath)) {
      return; // Don't allow battle if not reachable
    }
    
    const difficulty = obstacleDifficulty[obstacle.type];
    setCurrentQuestion(generateQuestion(difficulty));
    setCurrentBattlingObstacle(obstacleId);
    setShowQuestion(true);
    setSelectedAnswer(null);
  }, [obstacles, playerPosition, roadPath]);

  const handleAnswer = useCallback((answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  }, []);

  const resolveBattle = useCallback(() => {
    if (selectedAnswer === null || currentQuestion === null || currentBattlingObstacle === null) return;

    if (selectedAnswer === currentQuestion.correctAnswer) {
      // Correct answer - clear obstacle and move player
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

  // Check if an obstacle can be clicked (reachable)
  const canClickObstacle = useCallback((obstacleId: string): boolean => {
    const obstacle = obstacles.find(obs => obs.id === obstacleId);
    if (!obstacle || obstacle.cleared || gameState !== 'playing') return false;
    
    return isPositionReachable(playerPosition, obstacle.position, roadPath);
  }, [obstacles, playerPosition, roadPath, gameState]);

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
    currentBattlingObstacle,
    
    // Actions
    initializeGame,
    startBattle,
    handleAnswer,
    resolveBattle,
    canClickObstacle,
  };
};
