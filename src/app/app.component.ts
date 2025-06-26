import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { GameComponent } from "./game/game.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardComponent, GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'card-games';
}
