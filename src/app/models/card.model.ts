export type cardColor = 'red' | 'blue' | 'green' | 'yellow' | 'wild' | 'black';
export type cardType =
  | 'number'
  | 'skip'
  | 'reverse'
  | 'draw2'
  | 'wild'
  | 'draw4';

export interface Card {
  id: string;
  color: cardColor;
  isPlayable: boolean;
  type: cardType;
  value?: number;
}
