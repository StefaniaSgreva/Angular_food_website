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

  // Inietta il servizio Router per la navigazione
  constructor(private router: Router) {}

  // Metodo del lifecycle hook chiamato dopo l'inizializzazione della view
  ngAfterViewInit(): void {
    this.navLinks = document.querySelectorAll('nav a');

    // Inizializza l'indicatore con un leggero ritardo per assicurarsi che il DOM sia pronto
    setTimeout(() => this.updateActiveState(), 0);

    // Aggiorna quando cambia la route
    this.router.events
      // Filtra solo gli eventi di completamento navigazione
      .pipe(filter(event => event instanceof NavigationEnd))
      // Quando la navigazione è completata, aggiorna lo stato attivo
      .subscribe(() => this.updateActiveState());
  }

  // Gestore del click sui link
  handleClick(event: Event): void {
    event.preventDefault();
    const target = event.target as HTMLElement;
    this.activateLink(target);
  }

  // Aggiorna lo stato attivo in base alla route corrente
  private updateActiveState(): void {
    const activeLink = document.querySelector('nav a.active') as HTMLElement;
    if (activeLink) {
      this.activateLink(activeLink, false);
    }
  }

  // Attiva un link specifico
  private activateLink(link: HTMLElement, animate: boolean = true): void {
    // Rimuovi le classi active da tutti i link
    this.navLinks.forEach(item => item.classList.remove('active'));

    // Aggiunge la classe 'active' al link corrente
    link.classList.add('active');

    // Posiziona l'indicatore
    this.positionIndicator(link, animate);
  }

  // Posiziona e anima l'indicatore
  private positionIndicator(link: HTMLElement, animate: boolean): void {
    const indicator = this.indicator.nativeElement;
    indicator.style.left = `${link.offsetLeft}px`;
    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.display = 'block';

    // Applica effetti di animazione se richiesto
    if (animate) {
      // Effetto di cambio colore casuale
      indicator.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
      // Aggiunge la classe per le animazioni CSS
      indicator.classList.add('change');
    }
  }
}
