import { Component, OnInit } from '@angular/core';
import {Food} from '../services/food/food';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home implements OnInit {
  foods: string[] = [];

  constructor(private food: Food) {}

  ngOnInit(): void {
    this.foods = this.food.getAll();
  }

  private loadFoods(): void {
    try {
      this.foods = this.food.getAll();
    } catch (error) {
      console.error('Error loading foods:', error);
      this.foods = []; // Fallback empty array
    }
  }
}
