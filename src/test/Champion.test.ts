import { describe, it, expect } from 'vitest';
import { Champion, ChampionRole, Stats, Position } from '../core/Champion';

describe('Champion', () => {
  const defaultStats: Stats = {
    health: 100,
    mana: 100,
    attackDamage: 50,
    abilityPower: 0,
    armor: 30,
    magicResist: 30,
    moveSpeed: 325
  };

  const defaultPosition: Position = { x: 0, y: 0 };

  it('should create a champion with correct initial values', () => {
    const champion = new Champion(defaultStats, defaultPosition, ChampionRole.CARRY);
    
    expect(champion.getStats()).toEqual(defaultStats);
    expect(champion.getPosition()).toEqual(defaultPosition);
    expect(champion.getRole()).toBe(ChampionRole.CARRY);
  });

  it('should handle ability usage correctly', () => {
    const champion = new Champion(defaultStats, defaultPosition, ChampionRole.MAGE);
    const target: Position = { x: 100, y: 100 };
    
    // Test ability usage without any abilities added
    expect(champion.useAbility('Q', target)).toBe(false);
  });
});