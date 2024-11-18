import { describe, it, expect } from 'vitest';
import { StoryManager, GamePhase } from '../narrative/StoryManager';
import { Champion, ChampionRole } from '../core/Champion';

describe('StoryManager', () => {
  const defaultStats = {
    health: 100,
    mana: 100,
    attackDamage: 50,
    abilityPower: 0,
    armor: 30,
    magicResist: 30,
    moveSpeed: 325
  };

  const defaultPosition = { x: 0, y: 0 };

  it('should track game phase correctly', () => {
    const storyManager = new StoryManager();
    const champion = new Champion(defaultStats, defaultPosition, ChampionRole.CARRY);

    const event = {
      type: 'CHAMPION_FIGHT',
      description: 'An epic duel',
      timestamp: 15 * 60, // 15 minutes
      participants: [champion]
    };

    storyManager.addEvent(event);
    const narrative = storyManager.getCurrentNarrative();
    
    expect(narrative).toContain('epic duel');
    expect(narrative).toContain('CARRY');
  });
});