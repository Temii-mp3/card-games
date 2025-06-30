import { Injectable, signal } from '@angular/core';
import { Card, cardColor, cardType } from '../../models/card.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

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
        value: Math.floor(Math.random() * 10),
        isPlayable: false
      };
      this.playerCards().push(newCard);
    }

  for (let i = 7; i < 14; i++) {
      const newCard: Card = {
        id: `card-${i}`,
        color: this.getRandomColor(),
        type: this.getRandomType(),
        value: Math.floor(Math.random() * 10),
        isPlayable: false
      };
      this.compCards().push(newCard);
    }
    const initialCard: Card = {
    id: 'initial-card',
    color: this.getRandomColor(),
    type: this.getRandomType(),
    value: Math.floor(Math.random() * 10),
    isPlayable: false
  }
  this.discardTop().push(initialCard)

  this.gameStart()
  }

  onDrop(event: CdkDragDrop<Card[]>){

  }

  gameStart(){
    const topCard: Card = this.discardTop()[this.discardTop().length - 1]
    if(this.currentTurn() == 'player'){
      for(const card of this.playerCards()){
        if(card.color == topCard.color || card.value == topCard.value){
          card.isPlayable = true
        }
        if(card.type == topCard.type && card.value == topCard.value){
          card.isPlayable = true
        }
      }
      }
      for(const card of this.playerCards()){
        if(card.isPlayable == true){
          console.log(card) //debug
        }
    }
    }


  }



