import { Injectable, signal } from '@angular/core';
import { Card, cardColor, cardType } from '../../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  colors: cardColor[] = ['red', 'blue', 'green', 'yellow', 'wild'];
  types: cardType[] = []
 playerCards = signal<Card[]>([])
 compCards = signal<Card[]>([])
 discardTop = signal<Card[]>([])
 currentTurn = signal<'player' | 'computer'>('player')


  getRandomColor(): cardColor{
    return this.colors[Math.floor(Math.random() * 4)]
  }

  getRandomType(): any{
    return 'number'
  }

initializeGame(){
  for (let i = 0; i < 7; i++) {
      const newCard: Card = {
        id: `card-${i}`,
        color: this.getRandomColor(),
        type: this.getRandomType(),
        value: Math.floor(Math.random() * 10)
      };
      this.playerCards().push(newCard);
    }

  for (let i = 7; i < 14; i++) {
      const newCard: Card = {
        id: `card-${i}`,
        color: this.getRandomColor(),
        type: this.getRandomType(),
        value: Math.floor(Math.random() * 10)
      };
      this.compCards().push(newCard);
    }
    const initialCard: Card = {
    id: 'initial-card',
    color: this.getRandomColor(),
    type: this.getRandomType(),
    value: Math.floor(Math.random() * 10)
  }
  this.discardTop().push(initialCard)

  this.gameStart()
  }

  gameStart(){
    if(this.currentTurn() == 'player'){
    }
  }


}
