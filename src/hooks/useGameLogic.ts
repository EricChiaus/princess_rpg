import { useEffect, useCallback } from 'react';
import { useGameState } from './useGameState';
import { useSoundEffects } from './useSoundEffects';

export const useGameLogic = (soundEffectsEnabled: boolean) => {
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
    canClickObstacle,
    triggerVictory,
  } = useGameState();

  const {
    playBackgroundMusic,
    stopBackgroundMusic,
    playBattleWin,
    playBattleLose,
    playGameOver,
    playCastleReach,
  } = useSoundEffects();

  const isRoadCell = useCallback((x: number, y: number) => {
    return roadPath.some(pos => pos.x === x && pos.y === y);
  }, [roadPath]);

  const handleObstacleClick = useCallback((obstacleId: string) => {
    if (!canClickObstacle(obstacleId)) return;

    startBattle(obstacleId);
  }, [canClickObstacle, startBattle]);

  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (currentQuestion === null || showQuestion === false) return;
    
    handleAnswer(answerIndex);
  }, [currentQuestion, showQuestion, handleAnswer]);

  const handleSubmitAnswer = useCallback(() => {
    // Sound effects are now played in QuestionModal when answer is selected
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
      }
    } else if (gameState === 'gameOver' && soundEffectsEnabled) {
      playGameOver();
    } else if (gameState === 'victory' && soundEffectsEnabled) {
      playCastleReach();
    }
  }, [gameState, playerPosition, obstacles, soundEffectsEnabled, playGameOver, playCastleReach]);

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
    canClickObstacle,
    triggerVictory,
  };
};
