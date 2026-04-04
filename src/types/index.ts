export type Position = { x: number; y: number };
export type ObstacleType = 'stone' | 'bat' | 'witch' | 'monster' | 'treasure';
export type GameState = 'playing' | 'gameOver' | 'victory';

export interface Obstacle {
  id: string;
  type: ObstacleType;
  position: Position;
  cleared: boolean;
}

export interface Question {
  question: string;
  answers: string[];
  correctAnswer: number;
}
