import { Component, Inject, OnInit } from '@angular/core';
import { CardComponent } from '../components/card/card.component';
import { Card, cardType, cardColor } from '../models/card.model';
import { GameService } from '../services/game.service';
@Component({
  selector: 'app-game',
  imports: [CardComponent],
  providers: [GameService],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{
  gameService = Inject(GameService)
  colors: cardColor[] = ['red', 'blue', 'green', 'yellow', 'wild'];
  types: cardType[] = []
  playerCard: Card[] = []
  compCard: Card[] = []
  discardTop: Card[] = []

  ngOnInit(): void {
    this.gameService
  }


  getRandomColor(): cardColor{
    return this.colors[Math.floor(Math.random() * 4)]
  }

  getRandomType(): any{
    return 'number'
  }

}
