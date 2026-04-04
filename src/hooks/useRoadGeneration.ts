import { Position, Obstacle, ObstacleType } from '../types';

const GRID_SIZE = 8;

// Check if a position is adjacent to any position in a set
const isAdjacentToSet = (pos: Position, positionSet: Set<string>): boolean => {
  const { x, y } = pos;
  const adjacentPositions = [
    `${x-1},${y}`, `${x+1},${y}`, `${x},${y-1}`, `${x},${y+1}`
  ];
  
  return adjacentPositions.some(adjPos => positionSet.has(adjPos));
};

// Generate random road path with non-adjacent branches
export const generateRandomRoad = (): { road: Position[], mainRoad: Position[] } => {
  const road: Position[] = [];
  const mainRoad: Position[] = [];
  let currentX = 0;
  let currentY = GRID_SIZE - 1;
  const visitedPositions = new Set<string>();
  const mainRoadPositions = new Set<string>();
  
  road.push({ x: currentX, y: currentY });
  mainRoad.push({ x: currentX, y: currentY });
  visitedPositions.add(`${currentX},${currentY}`);
  mainRoadPositions.add(`${currentX},${currentY}`);
  
  while (currentX < GRID_SIZE - 1 || currentY > 0) {
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
      mainRoad.push({ x: currentX, y: currentY });
      visitedPositions.add(posKey);
      mainRoadPositions.add(posKey);
    }
  }
  
  // Generate branches that are not adjacent to main road
  if (mainRoad.length > 3) {
    const branchCount = Math.floor(Math.random() * 3) + 1; // 1-3 branches
    
    for (let branchIndex = 0; branchIndex < branchCount; branchIndex++) {
      // Select a random position from main road to branch from
      const branchStartIndex = Math.floor(Math.random() * (mainRoad.length - 2)) + 1; // Not start or end
      const branchStart = mainRoad[branchStartIndex];
      
      // Try to find a valid branch starting point (first tile can be adjacent)
      let branchX = branchStart.x;
      let branchY = branchStart.y;
      let attempts = 0;
      const maxAttempts = 10;
      
      // Try to find a position for branch
      while (attempts < maxAttempts) {
        const directions = [];
        if (branchX > 0 && !visitedPositions.has(`${branchX-1},${branchY}`)) {
          directions.push({ x: -1, y: 0 });
        }
        if (branchX < GRID_SIZE - 1 && !visitedPositions.has(`${branchX+1},${branchY}`)) {
          directions.push({ x: 1, y: 0 });
        }
        if (branchY > 0 && !visitedPositions.has(`${branchX},${branchY-1}`)) {
          directions.push({ x: 0, y: -1 });
        }
        if (branchY < GRID_SIZE - 1 && !visitedPositions.has(`${branchX},${branchY+1}`)) {
          directions.push({ x: 0, y: 1 });
        }
        
        if (directions.length === 0) break;
        
        const direction = directions[Math.floor(Math.random() * directions.length)];
        branchX += direction.x;
        branchY += direction.y;
        
        const posKey = `${branchX},${branchY}`;
        if (!visitedPositions.has(posKey)) {
          road.push({ x: branchX, y: branchY });
          visitedPositions.add(posKey);
          break;
        }
        
        attempts++;
      }
      
      // Extend the branch (subsequent tiles cannot be adjacent to main road)
      const branchLength = Math.floor(Math.random() * 3) + 2; // 2-4 cells long
      for (let i = 1; i < branchLength; i++) {
        const directions = [];
        if (branchX > 0 && !visitedPositions.has(`${branchX-1},${branchY}`) && !isAdjacentToSet({ x: branchX-1, y: branchY }, mainRoadPositions)) {
          directions.push({ x: -1, y: 0 });
        }
        if (branchX < GRID_SIZE - 1 && !visitedPositions.has(`${branchX+1},${branchY}`) && !isAdjacentToSet({ x: branchX+1, y: branchY }, mainRoadPositions)) {
          directions.push({ x: 1, y: 0 });
        }
        if (branchY > 0 && !visitedPositions.has(`${branchX},${branchY-1}`) && !isAdjacentToSet({ x: branchX, y: branchY-1 }, mainRoadPositions)) {
          directions.push({ x: 0, y: -1 });
        }
        if (branchY < GRID_SIZE - 1 && !visitedPositions.has(`${branchX},${branchY+1}`) && !isAdjacentToSet({ x: branchX, y: branchY+1 }, mainRoadPositions)) {
          directions.push({ x: 0, y: 1 });
        }
        
        if (directions.length === 0) break;
        
        const direction = directions[Math.floor(Math.random() * directions.length)];
        branchX += direction.x;
        branchY += direction.y;
        
        const posKey = `${branchX},${branchY}`;
        if (!visitedPositions.has(posKey)) {
          road.push({ x: branchX, y: branchY });
          visitedPositions.add(posKey);
        }
      }
    }
  }
  
  return { road, mainRoad };
};

// Generate obstacles on road with higher density but reduced treasure chests
export const generateObstacles = (road: Position[], mainRoad: Position[]): Obstacle[] => {
  const obstacleTypes: ObstacleType[] = ['spider', 'bat', 'witch', 'monster', 'treasure'];
  const obstacles: Obstacle[] = [];
  
  // Find castle position (last position on main road)
  const castlePosition = mainRoad[mainRoad.length - 1];
  
  // Place obstacles on almost all road positions (except start and castle)
  const availablePositions = road.filter(pos => 
    !(pos.x === 0 && pos.y === 7) && // Exclude start position
    !(pos.x === castlePosition.x && pos.y === castlePosition.y) // Exclude castle position
  );
  
  // Higher density: place obstacles on 35-45% of available positions (half of previous 70-90%)
  const obstacleCount = Math.floor(availablePositions.length * (0.35 + Math.random() * 0.1));
  const selectedPositions: Position[] = [];
  
  // Shuffle available positions
  const shuffledPositions = [...availablePositions].sort(() => Math.random() - 0.5);
  
  // Track treasure chest count to limit them
  let treasureChestCount = 0;
  const maxTreasureChests = Math.max(1, Math.floor(shuffledPositions.length * 0.2)); // Max 20% treasure chests (increased)
  
  for (let i = 0; i < obstacleCount && i < shuffledPositions.length; i++) {
    const position = shuffledPositions[i];
    
    // Select obstacle type with adjusted treasure chest probability
    let obstacleType: ObstacleType;
    
    if (treasureChestCount >= maxTreasureChests) {
      // No more treasure chests allowed, choose from other types
      const nonTreasureTypes = obstacleTypes.filter(type => type !== 'treasure');
      obstacleType = nonTreasureTypes[Math.floor(Math.random() * nonTreasureTypes.length)];
    } else {
      // Normal selection but with higher treasure chest probability
      const random = Math.random();
      if (random < 0.15) { // 15% chance for treasure chest (increased from 5%)
        obstacleType = 'treasure';
        treasureChestCount++;
      } else if (random < 0.40) { // 25% chance for spider
        obstacleType = 'spider';
      } else if (random < 0.65) { // 25% chance for bat
        obstacleType = 'bat';
      } else if (random < 0.90) { // 25% chance for witch
        obstacleType = 'witch';
      } else { // 10% chance for monster
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
