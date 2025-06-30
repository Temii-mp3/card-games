import { Component, Input, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, cardType } from '../../models/card.model';

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
  @Input() isClickable?: boolean;

  getCardValue(): string {
    if (!this.card) {
      return ' ';
    }
    if (this.card.type == 'number') {
      return this.card.value?.toString() ?? '';
    }

    const displayMap: Record<Exclude<cardType, 'number'>, string> = {
      skip: 'Skip',
      reverse: 'Reverse',
      draw2: '+2',
      draw4: '+4',
      wild: 'Wild',
    };

    return displayMap[this.card.type];
  }
}
