import { useEffect, useRef } from 'react';

export const useSoundEffects = () => {
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const battleStartRef = useRef<HTMLAudioElement | null>(null);
  const battleWinRef = useRef<HTMLAudioElement | null>(null);
  const battleLoseRef = useRef<HTMLAudioElement | null>(null);
  const gameOverRef = useRef<HTMLAudioElement | null>(null);
  const castleReachRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio elements
    bgMusicRef.current = new Audio('/sounds/background-music.mp3');
    battleStartRef.current = new Audio('/sounds/battle-start.mp3');
    battleWinRef.current = new Audio('/sounds/battle-win.mp3');
    battleLoseRef.current = new Audio('/sounds/battle-lose.mp3');
    gameOverRef.current = new Audio('/sounds/game-over.mp3');
    castleReachRef.current = new Audio('/sounds/castle-reach.mp3');

    // Configure background music
    if (bgMusicRef.current) {
      bgMusicRef.current.loop = true;
      bgMusicRef.current.volume = 0.3;
    }

    // Configure sound effects
    [
      battleStartRef.current,
      battleWinRef.current,
      battleLoseRef.current,
      gameOverRef.current,
      castleReachRef.current
    ].forEach(audio => {
      if (audio) {
        audio.volume = 0.5;
      }
    });

    return () => {
      // Cleanup
      bgMusicRef.current?.pause();
      bgMusicRef.current = null;
      battleStartRef.current = null;
      battleWinRef.current = null;
      battleLoseRef.current = null;
      gameOverRef.current = null;
      castleReachRef.current = null;
    };
  }, []);

  const playBackgroundMusic = () => {
    bgMusicRef.current?.play().catch(() => {
      // Handle autoplay restrictions
      console.log('Background music requires user interaction to start');
    });
  };

  const stopBackgroundMusic = () => {
    bgMusicRef.current?.pause();
  };

  const playBattleStart = () => {
    battleStartRef.current?.play().catch(() => {});
  };

  const playBattleWin = () => {
    battleWinRef.current?.play().catch(() => {});
  };

  const playBattleLose = () => {
    battleLoseRef.current?.play().catch(() => {});
  };

  const playGameOver = () => {
    gameOverRef.current?.play().catch(() => {});
  };

  const playCastleReach = () => {
    castleReachRef.current?.play().catch(() => {});
  };

  return {
    playBackgroundMusic,
    stopBackgroundMusic,
    playBattleStart,
    playBattleWin,
    playBattleLose,
    playGameOver,
    playCastleReach,
  };
};
