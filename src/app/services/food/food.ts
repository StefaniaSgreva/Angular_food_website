import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Food {
  constructor() { }

  getAll(): string[] {
    return [
      'img/foods/food1.webp',
      'img/foods/food2.webp',
      'img/foods/food3.webp',
      'img/foods/food4.webp',
      'img/foods/food5.webp',
    ];
  }
}
