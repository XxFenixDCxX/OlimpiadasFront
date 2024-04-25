import { Component, OnInit } from '@angular/core';
import { EventItemComponent } from '../event-item/event-item.component';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { map, Observable } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-events-page',
  imports: [EventItemComponent,CommonModule,IonicModule],
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent  implements OnInit {
  eventos: any[] = [];
  constructor(private api: ApiService, private spinnerService: SpinnerService) { }
  async ngOnInit() {
    try {
      this.spinnerService.isBusySetData(true);
      (await this.api.getAllEvents()).pipe(
        map((data: any[]) => {
          return data.map((evento: { id: number, title: string, description: string, date: string, image: string }) => ({
            id: evento.id,
            titulo: evento.title,
            descripcion: evento.description,
            fecha: new Date(evento.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
            imagenUrl: evento.image
          }));
        })
      ).subscribe({
        next: (data) => {
          this.eventos = data;
          this.spinnerService.isBusySetData(false);
        },
        error: (error) => {
          console.error(error);
          this.spinnerService.isBusySetData(false);
        }
      });
    } catch (error: any) {
      console.error('Error fetching events:', error);
      alert(`Error fetching events: ${error.message}`);
      this.spinnerService.isBusySetData(false);
    }
  }
}
