import { Injectable, signal } from '@angular/core';
import { Card, cardColor, cardType } from '../../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  cardCount = 0;
  constructor() {}

  colors: cardColor[] = ['red', 'blue', 'green', 'yellow', 'wild'];
  types: cardType[] = [];
  playerCards = signal<Card[]>([]);
  compCards = signal<Card[]>([]);
  discardTop = signal<Card[]>([]);
  currentTurn = signal<string>('player');

  getRandomColor(): cardColor {
    return this.colors[Math.floor(Math.random() * 4)];
  }

  getRandomType(): any {
    return 'number';
  }

  initializeGame() {
    this.cardCount = 0;
    this.discardTop().length = 0;
    for (this.cardCount; this.cardCount < 7; this.cardCount++) {
      const newCard: Card = {
        id: `card-${this.cardCount}`,
        color: this.getRandomColor(),
        type: this.getRandomType(),
        value: Math.floor(Math.random() * 10),
        isPlayable: false,
      };
      this.playerCards().push(newCard);
    }

    for (this.cardCount = 0; this.cardCount < 7; this.cardCount++) {
      const newCard: Card = {
        id: `card-${this.cardCount}`,
        color: this.getRandomColor(),
        type: this.getRandomType(),
        value: Math.floor(Math.random() * 10),
        isPlayable: false,
      };
      this.compCards().push(newCard);
    }
    const initialCard: Card = {
      id: 'initial-card',
      color: this.getRandomColor(),
      type: this.getRandomType(),
      value: Math.floor(Math.random() * 10),
      isPlayable: false,
    };
    this.discardTop().push(initialCard);
    this.checkPlayability();
  }

  nextTurn() {
    return this.currentTurn() == 'player' ? 'computer' : 'player';
  }

  checkPlayability() {
    const topCard: Card = this.discardTop()[this.discardTop().length - 1];
    if (this.currentTurn() == 'player') {
      for (const card of this.playerCards()) {
        if (card.color == topCard.color || card.value == topCard.value) {
          card.isPlayable = true;
        }
        if (card.type == topCard.type && card.value == topCard.value) {
          card.isPlayable = true;
        }
      }
    } else {
      for (const card of this.compCards()) {
        if (card.color == topCard.color || card.value == topCard.value) {
          card.isPlayable = true;
        }
        if (card.type == topCard.type && card.value == topCard.value) {
          card.isPlayable = true;
        }
      }
    }
  }

  playCard(card: Card) {
    this.checkPlayability();
    if (card.isPlayable && this.currentTurn() == 'player') {
      this.playerCards().splice(
        this.playerCards().findIndex((c) => c.id == card.id),
        1
      );
      this.discardTop().push(card);
      this.playerCards().forEach((card) => {
        card.isPlayable = false;
      });
    }
    this.checkWinner();
    this.currentTurn.set(this.nextTurn());
    console.log(this, this.currentTurn());
    this.computerPlay();
  }

  computerPlay() {
    this.checkPlayability();
    let hasCard: boolean = false;
    for (const card of this.compCards()) {
      if (card.isPlayable) {
        this.compCards().splice(
          this.compCards().findIndex((c) => c.id == card.id),
          1
        );
        this.discardTop().push(card);
        this.compCards().forEach((card) => {
          card.isPlayable = false;
        });
        this.currentTurn.set(this.nextTurn());
        hasCard = true;
        this.checkWinner();
        break;
      }
    }
    if (!hasCard) {
      this.drawCard('computer');
    }
  }

  checkWinner() {
    if (!this.playerCards().length) {
      alert('Player has won');
      let ans = prompt('Do you want to play again?')?.toLowerCase();
      while (ans != 'yes' && ans != 'no') {
        alert('you must enter a value');
        ans = prompt('Do you want to play again?')?.toLowerCase();
      }
      if (ans == 'yes') {
        this.initializeGame();
      } else if (ans == 'no') {
        alert('Goodbye');
      }
    } else if (!this.compCards().length) {
      alert('Computer has won');
      let ans = prompt('Do you want to play again?')?.toLowerCase();
      while (ans != 'yes' && ans != 'no') {
        alert('you must enter a value');
        ans = prompt('Do you want to play again?')?.toLowerCase();
      }
      if (ans == 'yes') {
        this.initializeGame();
      } else if (ans == 'no') {
        alert('Goodbye');
      }
    }
  }

  drawCard(player: string) {
    if (player == 'player' && this.currentTurn() == 'player') {
      const newCard: Card = {
        id: `card-${this.cardCount}}`,
        color: this.getRandomColor(),
        type: this.getRandomType(),
        value: Math.floor(Math.random() * 10),
        isPlayable: false,
      };
      this.playerCards().push(newCard);
      this.cardCount++;
      this.currentTurn.set(this.nextTurn());
      this.computerPlay();
    } else if (player == 'computer' && this.currentTurn() == 'computer') {
      const newCard: Card = {
        id: `card-${this.cardCount}}`,
        color: this.getRandomColor(),
        type: this.getRandomType(),
        value: Math.floor(Math.random() * 10),
        isPlayable: false,
      };
      this.compCards().push(newCard);
      this.cardCount++;
      this.currentTurn.set(this.nextTurn());
    }
  }
}
