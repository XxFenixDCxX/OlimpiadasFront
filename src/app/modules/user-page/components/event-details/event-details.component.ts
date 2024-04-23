import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  standalone: true,
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  eventId: number = 2; 
  eventSections: any[] = []; 
  title: string = '';
  price1: number = 0;
  price2: number = 0;
  descripcion: string = '';
  fecha: string = '20 de abril del 2024';
  imagenUrl: string = 'https://olympics.com/images/static/sports/pictograms/v2/ath.svg'
  eventDetails: any[]= [] ;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadSectionData();
    this.loadEventData();
  }

  loadSectionData() {
    this.apiService.getEventSections(this.eventId).subscribe((sections: any[]) => {
      this.eventSections = sections;
      console.log(this.eventSections);
      this.price1 = this.eventSections[3].price;
      this.price2 = this.eventSections[0].price;

    });
  }
  loadEventData() {
    // Carga los detalles del evento
    this.apiService.getEspecificEvent(this.eventId).subscribe((data => {
      this.title = data.title;
      this.descripcion = data.description;
      this.fecha = new Date(data.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
      this.imagenUrl = data.image;

      // Carga las secciones del evento
      this.loadSectionData();
    }));
  }

}
