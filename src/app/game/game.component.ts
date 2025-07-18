import { Component, inject, Inject, OnInit } from '@angular/core';
import { CardComponent } from '../components/card/card.component';
import { GameService } from '../core/services/game.service';
import { CommonModule } from '@angular/common';
import { ColorpickerComponent } from '../components/colorpicker/colorpicker.component';
@Component({
  selector: 'app-game',
  imports: [CardComponent, CommonModule, ColorpickerComponent],
  providers: [GameService],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  gameService = inject(GameService);

  ngOnInit(): void {
    this.gameService.initializeGame();
  }
}
