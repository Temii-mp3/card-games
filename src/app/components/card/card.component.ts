import { Component, Input, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, cardType } from '../../models/card.model';
import { skip } from 'rxjs';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() number?: number;
  @Input() isFaceUp?: boolean;
  @Input() card!: Card;
  @Input() isWild?: boolean;

  // getCardValue(): string {
  //   if (!this.card) {
  //     return ' ';
  //   }
  //   if (this.card.type == 'number') {
  //     return this.card.value?.toString() ?? '';
  //   }

  //   const displayMap: Record<Exclude<cardType, 'number'>, string> = {
  //     skip: 'Skip',
  //     reverse: 'Reverse',
  //     draw2: '+2',
  //     draw4: '+4',
  //     wild: 'Wild',
  //   };

  //   return displayMap[this.card.type];
  // }

  //gets the number-word of number cards, returns nothing if value is undefined
  getValueWord(value: number | undefined): string | undefined {
    if (value == undefined) {
      return;
    } else {
      const numberWords = [
        'zero',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
      ];
      return numberWords[value];
    }
  }

  //returns specific src to render depending card type/color/value
  getCardImage(): string {
    if (!this.isFaceUp) {
      return 'assets/cards/luno.png';
    }
    switch (this.card.type) {
      case 'draw4':
        if (this.card.color === 'black') {
          return 'assets/cards/pick4.png';
        } else {
          return `assets/cards/draw4_${this.card.color}.png`;
        }

      case 'wild':
        if (this.card.color === 'wild') {
          return 'assets/cards/change_color.png';
        } else {
          return `assets/cards/wild_${this.card.color}.png`;
        }
      case 'draw2':
        const color = this.card.color.toLowerCase();
        return `assets/cards/plus_2_${color}.png`;
      case 'reverse':
        const reverseColor = this.card.color.toLowerCase();
        return `assets/cards/reverse_${reverseColor}.png`;
      case 'skip':
        const skipColor = this.card.color.toLowerCase();
        return `assets/cards/skip_${skipColor}.png`;
      default: {
        const color = this.card.color.toLowerCase();
        return `assets/cards/${this.getValueWord(
          this.card.value
        )}_${color}.png`;
      }
    }
  }
}
