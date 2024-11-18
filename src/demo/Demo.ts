import { Champion, ChampionRole } from '../core/Champion';
import { AStar } from '../ai/pathfinding/AStar';
import { StoryManager } from '../narrative/StoryManager';

// Create demo champions
const champion = new Champion(
  {
    health: 100,
    mana: 100,
    attackDamage: 50,
    abilityPower: 0,
    armor: 30,
    magicResist: 30,
    moveSpeed: 325
  },
  { x: 0, y: 0 },
  ChampionRole.CARRY
);

// Initialize pathfinding
const pathfinder = new AStar(10, 10);

// Initialize story manager
const storyManager = new StoryManager();

// Demo functionality
export function runDemo() {
  // Add a story event
  storyManager.addEvent({
    type: 'CHAMPION_FIGHT',
    description: 'Champion enters the battlefield',
    timestamp: 0,
    participants: [champion]
  });

  // Find a path
  const path = pathfinder.findPath({ x: 0, y: 0 }, { x: 9, y: 9 });

  return {
    champion: champion.getStats(),
    path,
    narrative: storyManager.getCurrentNarrative()
  };
}