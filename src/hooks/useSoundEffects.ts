import { useEffect, useRef } from 'react';
import { RefObject } from 'react';

type AudioRef = RefObject<HTMLAudioElement>;

export const useSoundEffects = () => {
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const battleWinRef = useRef<HTMLAudioElement | null>(null);
  const battleLoseRef = useRef<HTMLAudioElement | null>(null);
  const gameOverRef = useRef<HTMLAudioElement | null>(null);
  const castleReachRef = useRef<HTMLAudioElement | null>(null);
  const isAudioInitialized = useRef(false);

  useEffect(() => {
    // Initialize audio elements - support both MP3 and WAV formats
    bgMusicRef.current = new Audio('/sounds/background-music.mp3');
    battleWinRef.current = new Audio('/sounds/battle-win.mp3');
    battleLoseRef.current = new Audio('/sounds/battle-lose.mp3');
    gameOverRef.current = new Audio('/sounds/game-over.mp3');
    castleReachRef.current = new Audio('/sounds/castle-reach.mp3');

    // Try WAV fallback if MP3 doesn't exist
    const tryWavFallback = (audioRef: AudioRef, wavFile: string) => {
      if (audioRef.current) {
        audioRef.current.addEventListener('error', () => {
          console.log(`MP3 not found, trying WAV: ${wavFile}`);
          audioRef.current!.src = `/sounds/${wavFile}`;
          audioRef.current!.load();
        }, { once: true });
      }
    };

    // Apply WAV fallbacks (no battle-start sound anymore)
    tryWavFallback(bgMusicRef, 'background-music.wav');
    tryWavFallback(battleWinRef, 'battle-win.wav');
    tryWavFallback(battleLoseRef, 'battle_lose.wav'); // Note: underscore, not hyphen
    tryWavFallback(gameOverRef, 'game-over.wav');
    tryWavFallback(castleReachRef, 'castle_reach.wav'); // Note: underscore, not hyphen

    // Configure background music with proper looping
    if (bgMusicRef.current) {
      bgMusicRef.current.loop = true;
      bgMusicRef.current.volume = 0.2; // Lower background music to 20%
      
      // Ensure looping works even if the file doesn't support loop attribute
      bgMusicRef.current.addEventListener('ended', () => {
        if (bgMusicRef.current) {
          bgMusicRef.current.currentTime = 0;
          bgMusicRef.current.play().catch(() => {});
        }
      });
    }

    // Configure sound effects - higher volume to be heard over background music
    [
      battleWinRef.current,
      battleLoseRef.current,
      gameOverRef.current,
      castleReachRef.current
    ].forEach(audio => {
      if (audio) {
        audio.volume = 0.8; // Higher volume for sound effects (80%)
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

  const initializeAudio = () => {
    if (!isAudioInitialized.current) {
      // Load all audio files
      bgMusicRef.current?.load();
      battleWinRef.current?.load();
      battleLoseRef.current?.load();
      gameOverRef.current?.load();
      castleReachRef.current?.load();
      
      isAudioInitialized.current = true;
    }
  };

  const playBackgroundMusic = () => {
    initializeAudio();
    if (bgMusicRef.current) {
      const playPromise = bgMusicRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Background music play failed:', error);
        });
      }
    }
  };

  const stopBackgroundMusic = () => {
    bgMusicRef.current?.pause();
  };

  const playBattleWin = () => {
    initializeAudio();
    if (battleWinRef.current) {
      battleWinRef.current.currentTime = 0;
      console.log('Playing battle win sound...');
      const playPromise = battleWinRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log('Battle win sound played successfully'))
          .catch(error => console.log('Battle win sound failed:', error));
      }
    } else {
      console.log('Battle win audio not initialized');
    }
  };

  const playBattleLose = () => {
    initializeAudio();
    if (battleLoseRef.current) {
      battleLoseRef.current.currentTime = 0;
      console.log('Playing battle lose sound...');
      const playPromise = battleLoseRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log('Battle lose sound played successfully'))
          .catch(error => console.log('Battle lose sound failed:', error));
      }
    } else {
      console.log('Battle lose audio not initialized');
    }
  };

  const playGameOver = () => {
    initializeAudio();
    if (gameOverRef.current) {
      gameOverRef.current.currentTime = 0;
      console.log('Playing game over sound...');
      const playPromise = gameOverRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log('Game over sound played successfully'))
          .catch(error => console.log('Game over sound failed:', error));
      }
    } else {
      console.log('Game over audio not initialized');
    }
  };

  const playCastleReach = () => {
    initializeAudio();
    if (castleReachRef.current) {
      castleReachRef.current.currentTime = 0;
      console.log('Playing castle reach sound...');
      const playPromise = castleReachRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log('Castle reach sound played successfully'))
          .catch(error => console.log('Castle reach sound failed:', error));
      }
    } else {
      console.log('Castle reach audio not initialized');
    }
  };

  // Auto-initialize on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      initializeAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  return {
    playBackgroundMusic,
    stopBackgroundMusic,
    playBattleWin,
    playBattleLose,
    playGameOver,
    playCastleReach,
  };
};
