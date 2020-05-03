export interface CellType {
  id: string;
  x: number;
  y: number;
  value: number;
  previousPosition?: { x: number; y: number };
  status: 'ALIVE' | 'MERGED';
}
