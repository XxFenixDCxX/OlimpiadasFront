import { Component, OnInit } from '@angular/core';
import { EventItemComponent } from '../event-item/event-item.component';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  standalone: true,
  selector: 'app-events-page',
  imports: [EventItemComponent,CommonModule],
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent  implements OnInit {
  eventos: any[] = [];
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAllEvents().subscribe(data => {
      this.eventos = data.map(evento => ({
        id: evento.id,
        titulo: evento.title,
        descripcion: evento.description,
        fecha: new Date(evento.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
        imagenUrl: evento.image
      }));
    });
  }
}
