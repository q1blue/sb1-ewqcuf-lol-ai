export interface Stats {
  health: number;
  mana: number;
  attackDamage: number;
  abilityPower: number;
  armor: number;
  magicResist: number;
  moveSpeed: number;
}

export interface Position {
  x: number;
  y: number;
}

export class Champion {
  private stats: Stats;
  private position: Position;
  private abilities: Map<string, Ability>;
  private role: ChampionRole;

  constructor(stats: Stats, position: Position, role: ChampionRole) {
    this.stats = stats;
    this.position = position;
    this.abilities = new Map();
    this.role = role;
  }

  public getStats(): Stats {
    return { ...this.stats };
  }

  public getPosition(): Position {
    return { ...this.position };
  }

  public getRole(): ChampionRole {
    return this.role;
  }

  public addAbility(key: string, ability: Ability): void {
    this.abilities.set(key, ability);
  }

  public useAbility(key: string, target: Position): boolean {
    const ability = this.abilities.get(key);
    if (!ability || ability.isOnCooldown()) {
      return false;
    }
    return ability.execute(this, target);
  }
}

export enum ChampionRole {
  TANK = 'TANK',
  SUPPORT = 'SUPPORT',
  CARRY = 'CARRY',
  ASSASSIN = 'ASSASSIN',
  MAGE = 'MAGE'
}