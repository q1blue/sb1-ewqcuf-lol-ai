import { Champion, ChampionRole } from '../core/Champion';

export interface StoryEvent {
  type: string;
  description: string;
  timestamp: number;
  participants: Champion[];
}

export class StoryManager {
  private events: StoryEvent[] = [];
  private currentState: GameState;

  constructor() {
    this.currentState = {
      phase: GamePhase.EARLY,
      timeElapsed: 0,
      intensity: 0
    };
  }

  public addEvent(event: StoryEvent): void {
    this.events.push(event);
    this.updateGameState(event);
  }

  private updateGameState(event: StoryEvent): void {
    // Update game state based on events
    this.currentState.timeElapsed = event.timestamp;
    this.updatePhase();
    this.updateIntensity(event);
  }

  private updatePhase(): void {
    if (this.currentState.timeElapsed > 20 * 60) { // 20 minutes
      this.currentState.phase = GamePhase.LATE;
    } else if (this.currentState.timeElapsed > 10 * 60) { // 10 minutes
      this.currentState.phase = GamePhase.MID;
    }
  }

  private updateIntensity(event: StoryEvent): void {
    switch (event.type) {
      case 'CHAMPION_FIGHT':
        this.currentState.intensity += 0.2;
        break;
      case 'OBJECTIVE_TAKEN':
        this.currentState.intensity += 0.3;
        break;
      default:
        this.currentState.intensity = Math.max(0, this.currentState.intensity - 0.1);
    }
    // Clamp intensity between 0 and 1
    this.currentState.intensity = Math.min(1, Math.max(0, this.currentState.intensity));
  }

  public getCurrentNarrative(): string {
    const recentEvents = this.events.slice(-3);
    return this.generateNarrative(recentEvents);
  }

  private generateNarrative(events: StoryEvent[]): string {
    return events.map(event => {
      const participants = event.participants
        .map(champion => champion.getRole())
        .join(' and ');
      return `${event.description} involving ${participants}`;
    }).join('. ');
  }
}

export enum GamePhase {
  EARLY = 'EARLY',
  MID = 'MID',
  LATE = 'LATE'
}

interface GameState {
  phase: GamePhase;
  timeElapsed: number;
  intensity: number;
}