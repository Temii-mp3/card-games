import { Card } from './card.model';

export type Player = {
  id: string;
  isAI: boolean;
  hand?: Card[];
  skipNextTurn?: boolean;
  drawBuffer?: number;
};
