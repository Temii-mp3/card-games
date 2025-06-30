import { Component, inject, Inject, OnInit } from '@angular/core';
import { CardComponent } from '../components/card/card.component';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { GameService } from '../core/services/game.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-game',
  imports: [CardComponent, CommonModule, CdkDrag, CdkDropList],
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
