export interface Node {
  x: number;
  y: number;
  f: number;
  g: number;
  h: number;
  walkable: boolean;
  parent: Node | null;
}

export class PathNode implements Node {
  public f: number = 0;
  public g: number = 0;
  public h: number = 0;
  public parent: Node | null = null;

  constructor(
    public x: number,
    public y: number,
    public walkable: boolean = true
  ) {}
}