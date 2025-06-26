import { Component } from '@angular/core';
import { CardComponent } from '../components/card/card.component';
import { Card, cardType, cardColor } from '../models/card.model';
@Component({
  selector: 'app-game',
  imports: [CardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  colors: cardColor[] = ['red', 'blue', 'green', 'yellow', 'wild'];
  types: cardType[] = []
  playerCard: Card[] = []
  compCard: Card[] = []
  discardTop: Card[] = []


  getRandomColor(): cardColor{
    return this.colors[Math.floor(Math.random() * 4)]
  }

  getRandomType(): any{
    return 'number'
  }

}
