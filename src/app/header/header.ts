import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements AfterViewInit {
  @ViewChild('indicator', { static: true }) indicator!: ElementRef;
  private navLinks!: NodeListOf<HTMLElement>;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.navLinks = document.querySelectorAll('nav a');

    // Inizializza l'indicatore sulla route corrente
    setTimeout(() => this.updateActiveState(), 0);

    // Aggiorna quando cambia la route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateActiveState());
  }

  handleClick(event: Event): void {
    event.preventDefault();
    const target = event.target as HTMLElement;
    this.activateLink(target);
  }

  private updateActiveState(): void {
    const activeLink = document.querySelector('nav a.active') as HTMLElement;
    if (activeLink) {
      this.activateLink(activeLink, false);
    }
  }

  private activateLink(link: HTMLElement, animate: boolean = true): void {
    // Rimuovi le classi active da tutti i link
    this.navLinks.forEach(item => item.classList.remove('active'));

    // Aggiungi al link corrente
    link.classList.add('active');

    // Posiziona l'indicatore
    this.positionIndicator(link, animate);
  }

  private positionIndicator(link: HTMLElement, animate: boolean): void {
    const indicator = this.indicator.nativeElement;
    indicator.style.left = `${link.offsetLeft}px`;
    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.display = 'block';

    if (animate) {
      indicator.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
      indicator.classList.add('change');
    }
  }
}
