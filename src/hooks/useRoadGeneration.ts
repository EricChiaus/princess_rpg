import { Position, Obstacle, ObstacleType } from '../types';

const GRID_SIZE = 8;

// Generate random road path
export const generateRandomRoad = (): Position[] => {
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
export const generateObstacles = (road: Position[]): Obstacle[] => {
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
