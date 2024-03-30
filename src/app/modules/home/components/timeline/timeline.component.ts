import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef, public auth: AuthService) { }

  ngAfterViewInit(): void {
    if (this.isMobileDevice()) { // Verifica si es un dispositivo móvil
      const timelineEvents = this.elementRef.nativeElement.querySelectorAll('.timeline__event');
      timelineEvents.forEach((event: Element) => {
        event.classList.add('visible'); // Muestra todos los elementos directamente
      });
    } else { // Si no es un dispositivo móvil, activa la animación de desplazamiento
      const timelineEvents = this.elementRef.nativeElement.querySelectorAll('.timeline__event');
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // El porcentaje del elemento que debe ser visible para disparar el evento
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      timelineEvents.forEach((event: Element) => {
        observer.observe(event);
      });
    }
  }

  isMobileDevice(): boolean {
    return window.innerWidth <= 768; // Define el ancho máximo para considerarlo como dispositivo móvil
  }


  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }
}
