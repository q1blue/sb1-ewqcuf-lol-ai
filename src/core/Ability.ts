import { Champion, Position } from './Champion';

export interface AbilityStats {
  damage: number;
  manaCost: number;
  cooldown: number;
  range: number;
}

export abstract class Ability {
  protected stats: AbilityStats;
  private lastUsed: number = 0;

  constructor(stats: AbilityStats) {
    this.stats = stats;
  }

  public isOnCooldown(): boolean {
    return Date.now() - this.lastUsed < this.stats.cooldown;
  }

  public abstract execute(caster: Champion, target: Position): boolean;

  protected updateCooldown(): void {
    this.lastUsed = Date.now();
  }
}