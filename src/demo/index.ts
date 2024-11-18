import { Champion, ChampionRole, Position } from '../core/Champion';
import { AStar } from '../ai/pathfinding/AStar';
import { StoryManager } from '../narrative/StoryManager';
import { CombatAnalyzer } from '../ai/tactical/CombatAnalyzer';

function initializeDemo() {
  const outputElement = document.getElementById('demo-output');
  if (!outputElement) return;

  // Create champions
  const hero = createChampion(ChampionRole.CARRY, { x: 0, y: 0 });
  const enemy = createChampion(ChampionRole.ASSASSIN, { x: 9, y: 9 });

  // Initialize systems
  const pathfinder = new AStar(10, 10);
  const storyManager = new StoryManager();
  const combatAnalyzer = new CombatAnalyzer();

  // Generate path
  const path = pathfinder.findPath(hero.getPosition(), enemy.getPosition());

  // Analyze combat
  const threatLevel = combatAnalyzer.calculateThreatLevel(hero, enemy);
  const shouldEngage = combatAnalyzer.shouldEngage(hero, enemy);

  // Create story event
  storyManager.addEvent({
    type: 'CHAMPION_FIGHT',
    description: 'A challenger approaches',
    timestamp: 0,
    participants: [hero, enemy]
  });

  // Display results
  const results = {
    heroStats: hero.getStats(),
    enemyStats: enemy.getStats(),
    path: path,
    threatAnalysis: {
      threatLevel,
      shouldEngage
    },
    narrative: storyManager.getCurrentNarrative()
  };

  outputElement.innerHTML = `
    <div class="results">
      <h2>Demo Results</h2>
      <pre>${JSON.stringify(results, null, 2)}</pre>
    </div>
  `;
}

function createChampion(role: ChampionRole, position: Position): Champion {
  return new Champion(
    {
      health: 100,
      mana: 100,
      attackDamage: 50,
      abilityPower: 0,
      armor: 30,
      magicResist: 30,
      moveSpeed: 325
    },
    position,
    role
  );
}

// Initialize demo when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeDemo);