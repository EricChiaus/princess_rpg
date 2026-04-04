import { Position, Obstacle, ObstacleType } from '../types';

const GRID_SIZE = 8;

// Generate random road path with branches
export const generateRandomRoad = (): Position[] => {
  const road: Position[] = [];
  let currentX = 0;
  let currentY = GRID_SIZE - 1;
  const visitedPositions = new Set<string>();
  
  road.push({ x: currentX, y: currentY });
  visitedPositions.add(`${currentX},${currentY}`);
  
  while (currentX < GRID_SIZE - 1 || currentY > 0) {
    // Generate branches occasionally
    if (Math.random() < 0.3 && road.length > 3) {
      // Create a branch
      const branchLength = Math.floor(Math.random() * 3) + 2; // 2-4 cells long
      let branchX = currentX;
      let branchY = currentY;
      
      for (let i = 0; i < branchLength; i++) {
        // Random direction for branch (avoid going back to main path)
        const directions = [];
        if (branchX > 0 && !visitedPositions.has(`${branchX-1},${branchY}`)) directions.push('left');
        if (branchX < GRID_SIZE - 1 && !visitedPositions.has(`${branchX+1},${branchY}`)) directions.push('right');
        if (branchY > 0 && !visitedPositions.has(`${branchX},${branchY-1}`)) directions.push('up');
        if (branchY < GRID_SIZE - 1 && !visitedPositions.has(`${branchX},${branchY+1}`)) directions.push('down');
        
        if (directions.length === 0) break;
        
        const direction = directions[Math.floor(Math.random() * directions.length)];
        
        switch (direction) {
          case 'left': branchX--; break;
          case 'right': branchX++; break;
          case 'up': branchY--; break;
          case 'down': branchY++; break;
        }
        
        const posKey = `${branchX},${branchY}`;
        if (!visitedPositions.has(posKey)) {
          road.push({ x: branchX, y: branchY });
          visitedPositions.add(posKey);
        }
      }
    }
    
    // Continue main path toward castle
    const canGoRight = currentX < GRID_SIZE - 1;
    const canGoUp = currentY > 0;
    
    if (canGoRight && canGoUp) {
      // Random choice between right and up, but favor right to reach castle
      if (Math.random() < 0.7) {
        currentX++;
      } else {
        currentY--;
      }
    } else if (canGoRight) {
      currentX++;
    } else if (canGoUp) {
      currentY--;
    } else {
      break; // No more moves available
    }
    
    const posKey = `${currentX},${currentY}`;
    if (!visitedPositions.has(posKey)) {
      road.push({ x: currentX, y: currentY });
      visitedPositions.add(posKey);
    }
  }
  
  return road;
};

// Generate obstacles on road with higher density but reduced treasure chests
export const generateObstacles = (road: Position[]): Obstacle[] => {
  const obstacleTypes: ObstacleType[] = ['stone', 'bat', 'witch', 'monster', 'treasure'];
  const obstacles: Obstacle[] = [];
  
  // Place obstacles on almost all road positions (except start)
  const availablePositions = road.slice(1); // Exclude start position
  
  // Higher density: place obstacles on 70-90% of available positions
  const obstacleCount = Math.floor(availablePositions.length * (0.7 + Math.random() * 0.2));
  const selectedPositions: Position[] = [];
  
  // Shuffle available positions
  const shuffledPositions = [...availablePositions].sort(() => Math.random() - 0.5);
  
  // Track treasure chest count to limit them
  let treasureChestCount = 0;
  const maxTreasureChests = Math.max(1, Math.floor(shuffledPositions.length * 0.1)); // Max 10% treasure chests
  
  for (let i = 0; i < obstacleCount && i < shuffledPositions.length; i++) {
    const position = shuffledPositions[i];
    
    // Select obstacle type with reduced probability for treasure chests
    let obstacleType: ObstacleType;
    
    if (treasureChestCount >= maxTreasureChests) {
      // No more treasure chests allowed, choose from other types
      const nonTreasureTypes = obstacleTypes.filter(type => type !== 'treasure');
      obstacleType = nonTreasureTypes[Math.floor(Math.random() * nonTreasureTypes.length)];
    } else {
      // Normal selection but with lower treasure chest probability
      const random = Math.random();
      if (random < 0.05) { // 5% chance for treasure chest (reduced from 20%)
        obstacleType = 'treasure';
        treasureChestCount++;
      } else if (random < 0.30) { // 25% chance for stone
        obstacleType = 'stone';
      } else if (random < 0.55) { // 25% chance for bat
        obstacleType = 'bat';
      } else if (random < 0.80) { // 25% chance for witch
        obstacleType = 'witch';
      } else { // 20% chance for monster
        obstacleType = 'monster';
      }
    }
    
    selectedPositions.push(position);
    obstacles.push({
      id: `obstacle-${position.x}-${position.y}`,
      type: obstacleType,
      position,
      cleared: false
    });
  }
  
  return obstacles;
};
