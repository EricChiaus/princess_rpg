import { useState, useCallback } from 'react';
import { Position, Obstacle, GameState, Question } from '../types';
import { generateRandomRoad, generateObstacles } from './useRoadGeneration';
import { generateQuestion } from './useMathQuestions';

const GRID_SIZE = 8;
const MAX_LIVES = 3;

// Map obstacle types to difficulty levels
const obstacleDifficulty: Record<string, 'easy' | 'medium' | 'hard' | 'expert' | 'master'> = {
  'spider': 'easy',
  'bat': 'medium', 
  'witch': 'hard',
  'treasure': 'expert',
  'monster': 'master'
};

// Check if position is reachable from player position along road
const isPositionReachable = (playerPos: Position, targetPos: Position, road: Position[], obstacles: Obstacle[]): boolean => {
  // Create a set of reachable positions using BFS, but stop at first uncleared obstacle
  const reachable = new Set<string>();
  const queue: Position[] = [playerPos];
  const visited = new Set<string>();
  
  visited.add(`${playerPos.x},${playerPos.y}`);
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    const currentKey = `${current.x},${current.y}`;
    
    // Add current position to reachable set
    reachable.add(currentKey);
    
    // Check if there's an uncleared obstacle at current position
    const obstacleAtCurrent = obstacles.find(obs => 
      obs.position.x === current.x && 
      obs.position.y === current.y && 
      !obs.cleared
    );
    
    // If there's an uncleared obstacle here, don't explore further from this position
    if (obstacleAtCurrent) {
      continue;
    }
    
    // Find all adjacent road positions
    const adjacentPositions = [
      { x: current.x - 1, y: current.y },
      { x: current.x + 1, y: current.y },
      { x: current.x, y: current.y - 1 },
      { x: current.x, y: current.y + 1 }
    ];
    
    for (const adj of adjacentPositions) {
      const adjKey = `${adj.x},${adj.y}`;
      
      // Check if adjacent position is on the road and not visited
      if (!visited.has(adjKey) && road.some(pos => pos.x === adj.x && pos.y === adj.y)) {
        visited.add(adjKey);
        queue.push(adj);
      }
    }
  }
  
  // Check if target position is in reachable set
  const targetKey = `${targetPos.x},${targetPos.y}`;
  return reachable.has(targetKey);
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
    const { road, mainRoad } = generateRandomRoad();
    const newObstacles = generateObstacles(road, mainRoad);
    
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
    if (!isPositionReachable(playerPosition, obstacle.position, roadPath, obstacles)) {
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
        const newPosition = obstacle.position;
        setPlayerPosition(newPosition);
        
        // Check if player can reach castle after moving
        const castlePosition = { x: 7, y: 0 }; // GRID_SIZE - 1, 0
        if (isPositionReachable(newPosition, castlePosition, roadPath, obstacles.map(obs => 
          obs.id === currentBattlingObstacle 
            ? { ...obs, cleared: true }
            : obs
        ))) {
          setGameState('victory');
        }
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
  }, [selectedAnswer, currentQuestion, currentBattlingObstacle, lives, obstacles, roadPath]);

  // Check if an obstacle can be clicked (reachable)
  const canClickObstacle = useCallback((obstacleId: string): boolean => {
    const obstacle = obstacles.find(obs => obs.id === obstacleId);
    if (!obstacle || obstacle.cleared || gameState !== 'playing') return false;
    
    return isPositionReachable(playerPosition, obstacle.position, roadPath, obstacles);
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
