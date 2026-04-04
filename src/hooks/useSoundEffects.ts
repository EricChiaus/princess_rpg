import { useEffect, useRef } from 'react';

export const useSoundEffects = () => {
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const battleWinRef = useRef<HTMLAudioElement | null>(null);
  const battleLoseRef = useRef<HTMLAudioElement | null>(null);
  const gameOverRef = useRef<HTMLAudioElement | null>(null);
  const castleReachRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio elements - support both MP3 and WAV formats
    bgMusicRef.current = new Audio('/sounds/background-music.mp3');
    battleWinRef.current = new Audio('/sounds/battle-win.mp3');
    battleLoseRef.current = new Audio('/sounds/battle-lose.mp3');
    gameOverRef.current = new Audio('/sounds/game-over.mp3');
    castleReachRef.current = new Audio('/sounds/castle-reach.mp3');

    // Try WAV fallback if MP3 doesn't exist
    const tryWavFallback = (audioRef: React.RefObject<HTMLAudioElement>, wavFile: string) => {
      if (audioRef.current) {
        audioRef.current.addEventListener('error', () => {
          console.log(`MP3 not found, trying WAV: ${wavFile}`);
          audioRef.current!.src = `/sounds/${wavFile}`;
        }, { once: true });
      }
    };

    // Apply WAV fallbacks (no battle-start sound anymore)
    tryWavFallback(bgMusicRef, 'background-music.wav');
    tryWavFallback(battleWinRef, 'battle-win.wav');
    tryWavFallback(battleLoseRef, 'battle-lose.wav');
    tryWavFallback(gameOverRef, 'game-over.wav');
    tryWavFallback(castleReachRef, 'castle-reach.wav');

    // Configure background music with proper looping
    if (bgMusicRef.current) {
      bgMusicRef.current.loop = true;
      bgMusicRef.current.volume = 0.3;
      
      // Preload the audio
      bgMusicRef.current.load();
      
      // Ensure looping works even if the file doesn't support loop attribute
      bgMusicRef.current.addEventListener('ended', () => {
        if (bgMusicRef.current) {
          bgMusicRef.current.currentTime = 0;
          bgMusicRef.current.play().catch(() => {
            // Handle autoplay restrictions
            console.log('Background music requires user interaction to start');
          });
        }
      });
    }

    // Configure sound effects
    [
      battleWinRef.current,
      battleLoseRef.current,
      gameOverRef.current,
      castleReachRef.current
    ].forEach(audio => {
      if (audio) {
        audio.volume = 0.5;
        audio.load(); // Preload sound effects
      }
    });

    return () => {
      // Cleanup
      bgMusicRef.current?.pause();
      bgMusicRef.current = null;
      battleWinRef.current = null;
      battleLoseRef.current = null;
      gameOverRef.current = null;
      castleReachRef.current = null;
    };
  }, []);

  const playBackgroundMusic = () => {
    if (bgMusicRef.current) {
      // Make sure audio is loaded before playing
      if (bgMusicRef.current.readyState === 0) {
        bgMusicRef.current.load();
      }
      
      const playPromise = bgMusicRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Background music play failed:', error);
          // Try to play on user interaction
          document.addEventListener('click', function playOnce() {
            bgMusicRef.current?.play().catch(() => {});
            document.removeEventListener('click', playOnce);
          }, { once: true });
        });
      }
    }
  };

  const stopBackgroundMusic = () => {
    bgMusicRef.current?.pause();
  };

  const playBattleWin = () => {
    if (battleWinRef.current) {
      battleWinRef.current.currentTime = 0;
      battleWinRef.current.play().catch(() => {});
    }
  };

  const playBattleLose = () => {
    if (battleLoseRef.current) {
      battleLoseRef.current.currentTime = 0;
      battleLoseRef.current.play().catch(() => {});
    }
  };

  const playGameOver = () => {
    if (gameOverRef.current) {
      gameOverRef.current.currentTime = 0;
      gameOverRef.current.play().catch(() => {});
    }
  };

  const playCastleReach = () => {
    if (castleReachRef.current) {
      castleReachRef.current.currentTime = 0;
      castleReachRef.current.play().catch(() => {});
    }
  };

  return {
    playBackgroundMusic,
    stopBackgroundMusic,
    playBattleWin,
    playBattleLose,
    playGameOver,
    playCastleReach,
  };
};
