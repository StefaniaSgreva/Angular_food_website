import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Header } from "./header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Angular_food_website';
}
