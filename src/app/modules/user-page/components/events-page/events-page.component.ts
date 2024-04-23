import { Component, OnInit } from '@angular/core';
import { EventItemComponent } from '../event-item/event-item.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-events-page',
  imports: [EventItemComponent,CommonModule],
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent  implements OnInit {
  eventos = [
    { titulo: 'Concierto', descripcion: 'Nombre del lugar 1', fecha: '22 de abril, 2024', imagenUrl: 'https://olympics.com/images/static/sports/pictograms/v2/ath.svg' },
    { titulo: 'Festival', descripcion: 'Nombre del lugar 2', fecha: '23 de abril, 2024', imagenUrl: 'https://olympics.com/images/static/sports/pictograms/v2/bkb.svg' },
    { titulo: 'Conferencia', descripcion: 'Nombre del lugar 3', fecha: '24 de abril, 2024', imagenUrl: 'https://olympics.com/images/static/sports/pictograms/v2/kte.svg' },
    { titulo: 'Festival', descripcion: 'Nombre del lugar 2', fecha: '23 de abril, 2024', imagenUrl: 'https://olympics.com/images/static/sports/pictograms/v2/bkb.svg' },
    { titulo: 'Conferencia', descripcion: 'Nombre del lugar 3', fecha: '24 de abril, 2024', imagenUrl: 'https://olympics.com/images/static/sports/pictograms/v2/fbl.svg' }
  ];

  constructor() { }

  ngOnInit() {
    console.log(this.eventos)
  }

}
