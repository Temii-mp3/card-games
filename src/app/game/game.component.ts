import { Component, inject, Inject, OnInit } from '@angular/core';
import { CardComponent } from '../components/card/card.component';
import { Card, cardType, cardColor } from '../models/card.model';
import { GameService } from '../core/services/game.service';
@Component({
  selector: 'app-game',
  imports: [CardComponent],
  providers: [GameService],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{
  gameService = inject(GameService)


  ngOnInit(): void {
    this.gameService.initializeGame()
  }
}
