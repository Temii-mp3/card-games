import { Injectable, signal } from '@angular/core';
import { Card, cardColor, cardType } from '../../models/card.model';
import { skip } from 'rxjs';
import { Player } from '../../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  cardCount = 0;
  constructor() {}
  isWild = false;
  colors: cardColor[] = ['red', 'blue', 'green', 'yellow', 'wild'];
  types: cardType[] = ['draw2', 'draw4', 'skip', 'reverse', 'wild', 'number'];
  playerCards = signal<Card[]>([]);
  compCards = signal<Card[]>([]);
  discardTop = signal<Card[]>([]);
  currentTurn = signal<number>(0);
  cardReference: string = '';
  players: Player[] = [];

  getRandomColor(): cardColor {
    return this.colors[Math.floor(Math.random() * 4)];
  }

  /*used to randomly pick a card type, special cards are rarer to get 
  numbered cards are more common*/
  getRandomType(): any {
    const rand = Math.random() * 100; //  0–99.99

    if (rand < 5) return 'wild'; // 5%
    if (rand < 10) return 'draw4'; // 5%
    if (rand < 15) return 'skip'; // 5%
    if (rand < 20) return 'reverse'; // 5%
    if (rand < 25) return 'draw2'; // 5%
    return 'number'; // 75% chance
  }

  initializeGame() {
    this.cardCount = 0;
    this.discardTop().length = 0;
    const player1: Player = {
      id: '234',
      isAI: false,
      hand: [],
      skipNextTurn: false,
      drawBuffer: undefined,
    };

    const player2: Player = {
      id: '234',
      isAI: true,
      hand: [],
      skipNextTurn: false,
      drawBuffer: undefined,
    };

    this.players.push(player1, player2);
    for (
      let playerCount = 0;
      playerCount < this.players.length;
      playerCount++
    ) {
      for (let cards = 0; cards < 7; cards++) {
        const newCard = this.createCard();
        this.players[playerCount].hand.push(newCard);
        this.cardCount++;
      }
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
    this.currentTurn.update((i) => (i + 1) % this.players.length); //keeps turns within player array
  }

  checkPlayability() {
    const cardSet = this.players[this.currentTurn()].hand;
    for (const card of cardSet) {
      card.isPlayable = false;
    }
    const topCard: Card = this.discardTop()[this.discardTop().length - 1];

    for (const card of cardSet) {
      if (card.color == topCard.color || card.value == topCard.value) {
        card.isPlayable = true;
      }
      if (card.type == topCard.type && card.value == topCard.value) {
        card.isPlayable = true;
      }
      if (card.type == topCard.type && card.type != 'number') {
        card.isPlayable = true;
      }
      if (card.type == 'wild' || card.type == 'draw4') {
        card.isPlayable = true;
      }
    }
  }

  playCard(card: Card) {
    this.checkPlayability();
    if (card.isPlayable && this.currentTurn() == 'player') {
      switch (card.type) {
        case 'reverse':
          this.playerCards().splice(
            this.playerCards().findIndex((c) => c.id == card.id),
            1
          );
          this.discardTop().push(card);
          this.currentTurn.set('player');
          return;
        case 'skip':
          this.playerCards().splice(
            this.playerCards().findIndex((c) => c.id == card.id),
            1
          );
          this.discardTop().push(card);
          this.currentTurn.set('player');
          return;
        case 'draw2':
          this.playerCards().splice(
            this.playerCards().findIndex((c) => c.id == card.id),
            1
          );
          this.discardTop().push(card);
          this.currentTurn.set('player');
          for (let i = 0; i < 2; i++) {
            const newCard = this.createCard();
            this.compCards().push(newCard);
            this.cardCount++;
          }
          break;
        case 'draw4':
          this.playerCards().splice(
            this.playerCards().findIndex((c) => c.id == card.id),
            1
          );
          this.discardTop().push(card);
          this.isWild = true;
          this.cardReference = card.id;
          this.currentTurn.set('player');
          for (let i = 0; i < 3; i++) {
            const newCard = this.createCard();
            this.compCards().push(newCard);
            this.cardCount++;
          }
          return;
        case 'wild':
          this.playerCards().splice(
            this.playerCards().findIndex((c) => c.id == card.id),
            1
          );
          this.discardTop().push(card);
          this.isWild = true;
          this.cardReference = card.id;
          break;
        case 'number':
          break;
      }
      console.log('Player: ', card);
      this.playerCards().forEach((card) => {
        card.isPlayable = false;
      });
      this.checkWinner();
      this.currentTurn.set(this.nextTurn());
      this.computerPlay();
    }
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
        console.log('Comp: ', card);
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

  changeWildColor(event: Event) {
    console.log(this.cardReference);
    const newColor = (event.target as HTMLButtonElement).value as cardColor;
    const card = this.discardTop().find((c) => c.id == this.cardReference);
    console.log(card);
    if (card) {
      card.color = newColor;
    }

    // this.discardTop.set([...this.discardTop()]);
    console.log(card);
    this.isWild = false;
  }

  checkWild(card: Card): boolean {
    if (card.type == 'wild' || card.type == 'draw4') {
      return true;
    }
    return false;
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
      const newCard: Card = this.createCard();
      this.playerCards().push(newCard);
      this.cardCount++;
      this.currentTurn.set(this.nextTurn());
      this.computerPlay();
    } else if (player == 'computer' && this.currentTurn() == 'computer') {
      const newCard: Card = this.createCard();
      this.compCards().push(newCard);
      this.cardCount++;
      this.currentTurn.set(this.nextTurn());
    }
  }

  createCard(): Card {
    const type: cardType = this.getRandomType();
    let color: cardColor;
    let value: number | undefined;

    switch (type) {
      case 'number':
        color = this.getRandomColor();
        value = Math.floor(Math.random() * 10);
        break;
      case 'skip':
        color = this.getRandomColor();
        value = undefined;
        break;
      case 'reverse':
        color = this.getRandomColor();
        value = undefined;
        break;
      case 'draw2':
        color = this.getRandomColor();
        value = undefined;
        break;
      case 'draw4':
        color = 'black';
        value = undefined;
        break;
      case 'wild':
        color = 'wild';
        value = undefined;
    }
    const newCard: Card = {
      id: `card-${this.cardCount}`,
      color: color,
      type: type,
      value: value,
      isPlayable: false,
    };

    return newCard;
  }
}
