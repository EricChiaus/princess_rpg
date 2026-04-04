import { useEffect, useCallback } from 'react';
import { useGameState } from './useGameState';

export const useGameLogic = () => {
  const {
    playerPosition,
    lives,
    gameState,
    obstacles,
    currentQuestion,
    showQuestion,
    selectedAnswer,
    roadPath,
    initializeGame,
    startBattle,
    handleAnswer,
    resolveBattle,
  } = useGameState();

  const isRoadCell = useCallback((x: number, y: number) => {
    return roadPath.some(pos => pos.x === x && pos.y === y);
  }, [roadPath]);

  const handleObstacleClick = useCallback((obstacleId: string) => {
    const obstacle = obstacles.find(obs => obs.id === obstacleId);
    if (!obstacle || obstacle.cleared || gameState !== 'playing') return;

    startBattle(obstacleId);
  }, [obstacles, gameState, startBattle]);

  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (currentQuestion === null || showQuestion === false) return;
    
    handleAnswer(answerIndex);
  }, [currentQuestion, showQuestion, handleAnswer]);

  const handleSubmitAnswer = useCallback(() => {
    resolveBattle();
  }, [resolveBattle]);

  // Check win condition
  useEffect(() => {
    if (gameState === 'playing') {
      const castlePosition = { x: 7, y: 0 }; // GRID_SIZE - 1, 0
      const allObstaclesCleared = obstacles.every(obs => obs.cleared);
      
      if (playerPosition.x === castlePosition.x && playerPosition.y === castlePosition.y && allObstaclesCleared) {
        // This would need to be handled in the useGameState hook
        // For now, the logic remains here but could be moved
        console.log('Victory! All obstacles cleared and castle reached!');
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
    isRoadCell,
  };
};
