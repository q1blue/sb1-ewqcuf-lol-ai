import { describe, it, expect } from 'vitest';
import { AStar } from '../ai/pathfinding/AStar';
import { Position } from '../core/Champion';

describe('AStar', () => {
  const width = 10;
  const height = 10;

  it('should find path in empty grid', () => {
    const pathfinder = new AStar(width, height);
    const start: Position = { x: 0, y: 0 };
    const end: Position = { x: 9, y: 9 };

    const path = pathfinder.findPath(start, end);
    expect(path.length).toBeGreaterThan(0);
    expect(path[0]).toEqual(start);
    expect(path[path.length - 1]).toEqual(end);
  });

  it('should handle obstacles', () => {
    const pathfinder = new AStar(width, height);
    const obstacles: Position[] = [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 }
    ];

    pathfinder.updateGrid(obstacles);
    const start: Position = { x: 0, y: 0 };
    const end: Position = { x: 2, y: 1 };

    const path = pathfinder.findPath(start, end);
    expect(path.length).toBeGreaterThan(0);
    expect(path[0]).toEqual(start);
    expect(path[path.length - 1]).toEqual(end);
  });
});