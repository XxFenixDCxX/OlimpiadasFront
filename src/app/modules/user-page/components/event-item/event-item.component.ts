import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { UserPageComponent } from '../../user-page.component';
@Component({
  standalone: true,
  selector: 'app-event-item',
  imports: [IonicModule],
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
})
export class EventItemComponent {

  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() imagenUrl: string = '';
  @Input() fecha: string = '';
  @Input() id: number = 0;

  constructor( private userPage: UserPageComponent, private details: EventDetailsComponent) {
  }

  goToDetails() {
    this.details.eventId = this.id;
    this.userPage.optionSelected = 0;
  }
}
