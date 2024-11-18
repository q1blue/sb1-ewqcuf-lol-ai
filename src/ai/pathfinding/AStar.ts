import { Node, PathNode } from './Node';
import { Position } from '../../core/Champion';

export class AStar {
  private grid: PathNode[][];
  private openList: PathNode[];
  private closedList: PathNode[];

  constructor(width: number, height: number) {
    this.grid = Array(height).fill(null).map((_, y) => 
      Array(width).fill(null).map((_, x) => new PathNode(x, y))
    );
    this.openList = [];
    this.closedList = [];
  }

  public findPath(start: Position, end: Position): Position[] {
    this.openList = [];
    this.closedList = [];
    
    const startNode = this.grid[start.y][start.x];
    const endNode = this.grid[end.y][end.x];
    
    this.openList.push(startNode);

    while (this.openList.length > 0) {
      const currentNode = this.getLowestFNode();
      
      if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
        return this.reconstructPath(currentNode);
      }

      this.openList = this.openList.filter(node => node !== currentNode);
      this.closedList.push(currentNode);

      const neighbors = this.getNeighbors(currentNode);
      for (const neighbor of neighbors) {
        if (!neighbor.walkable || this.closedList.includes(neighbor)) {
          continue;
        }

        const gScore = currentNode.g + 1;
        const gScoreIsBest = !this.openList.includes(neighbor);

        if (gScoreIsBest) {
          neighbor.h = this.heuristic(neighbor, endNode);
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = currentNode;

          if (!this.openList.includes(neighbor)) {
            this.openList.push(neighbor);
          }
        }
      }
    }

    return [];
  }

  private getLowestFNode(): PathNode {
    return this.openList.reduce((lowest, node) => 
      node.f < lowest.f ? node : lowest
    );
  }

  private heuristic(a: Node, b: Node): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  private getNeighbors(node: PathNode): PathNode[] {
    const neighbors: PathNode[] = [];
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    for (const [dx, dy] of dirs) {
      const x = node.x + dx;
      const y = node.y + dy;

      if (this.isInBounds(x, y)) {
        neighbors.push(this.grid[y][x]);
      }
    }

    return neighbors;
  }

  private isInBounds(x: number, y: number): boolean {
    return y >= 0 && y < this.grid.length && x >= 0 && x < this.grid[0].length;
  }

  private reconstructPath(node: Node): Position[] {
    const path: Position[] = [];
    let current: Node | null = node;

    while (current) {
      path.unshift({ x: current.x, y: current.y });
      current = current.parent;
    }

    return path;
  }

  public updateGrid(obstacles: Position[]): void {
    // Reset grid
    for (const row of this.grid) {
      for (const node of row) {
        node.walkable = true;
      }
    }
    
    // Mark obstacles
    for (const pos of obstacles) {
      if (this.isInBounds(pos.x, pos.y)) {
        this.grid[pos.y][pos.x].walkable = false;
      }
    }
  }
}