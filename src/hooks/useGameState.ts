import { useState, useCallback } from 'react';
import { Position, Obstacle, GameState, Question } from '../types';
import { generateRandomRoad, generateObstacles } from './useRoadGeneration';
import { generateQuestion } from './useMathQuestions';

const GRID_SIZE = 8;
const MAX_LIVES = 3;

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

  const startBattle = useCallback((obstacleId: string) => {
    setCurrentBattlingObstacle(obstacleId);
    setCurrentQuestion(generateQuestion());
    setShowQuestion(true);
    setSelectedAnswer(null);
  }, []);

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
  };
};
