export type Exercise = {
  name: string;
  style: 'REPEATED' | 'TIMED';
  min: number;
  max: number;
  difficulty: 1 | 2 | 3;
}