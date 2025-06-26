export type cardColor = 'red' | 'blue' | 'green' | 'yellow' | 'wild'
export type cardType = 'number' | 'skip' | 'reverse' | 'draw2' | 'wild' | 'draw4'


export interface Card {
    id: string;
    color: cardColor;
    type: cardType;
    value?: number
}
