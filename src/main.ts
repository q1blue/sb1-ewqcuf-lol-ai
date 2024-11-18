import { runDemo } from './demo/Demo';

// Run demo and display results
const demoResults = runDemo();
console.log('Demo Results:', demoResults);

// Export framework components
export * from './core/Champion';
export * from './core/Ability';
export * from './ai/pathfinding/AStar';
export * from './ai/tactical/CombatAnalyzer';
export * from './ai/DecisionMaker';
export * from './narrative/StoryManager';
export * from './ai/state/GameStateManager';