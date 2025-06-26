import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }





initializeGame(){
  if(this.playerCard || this.compCard){
    this.playerCard = []
    this.compCard = []
  }
  for (let i = 0; i < 7; i++) {
      const newCard: Card = {
        id: `card-${i}`,
        color: this.getRandomColor(),
        type: this.getRandomType(),
        value: Math.floor(Math.random() * 10)
      };
      this.playerCard.push(newCard);
    }

  for (let i = 7; i < 14; i++) {
      const newCard: Card = {
        id: `card-${i}`,
        color: this.getRandomColor(),
        type: this.getRandomType(),
        value: Math.floor(Math.random() * 10)
      };
      this.compCard.push(newCard);
    }



    const initialCard: Card = {
    id: 'initial-card',
    color: this.getRandomColor(),
    type: this.getRandomType(),
    value: Math.floor(Math.random() * 10)
  }
  this.discardTop.push(initialCard)
  }
  
}
