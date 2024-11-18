import { Champion, Stats } from '../../core/Champion';

export class CombatAnalyzer {
  public calculateThreatLevel(champion: Champion, target: Champion): number {
    const targetStats = target.getStats();
    const championStats = champion.getStats();
    
    return this.calculateDamageOutput(targetStats) * 
           (1 - this.calculateDamageReduction(championStats));
  }

  private calculateDamageOutput(stats: Stats): number {
    return stats.attackDamage + (stats.abilityPower * 0.8);
  }

  private calculateDamageReduction(stats: Stats): number {
    const armorReduction = stats.armor / (100 + stats.armor);
    const magicReduction = stats.magicResist / (100 + stats.magicResist);
    return (armorReduction + magicReduction) / 2;
  }

  public shouldEngage(champion: Champion, target: Champion): boolean {
    const threatLevel = this.calculateThreatLevel(champion, target);
    const championHealth = champion.getStats().health;
    return threatLevel < championHealth * 0.4;
  }
}