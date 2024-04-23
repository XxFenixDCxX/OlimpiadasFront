import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { UserPageComponent } from '../../user-page.component';
@Component({
  standalone: true,
  selector: 'app-event-item',
  imports: [IonicModule,EventDetailsComponent],
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
})
export class EventItemComponent implements OnInit {

  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() imagenUrl: string = '';
  @Input() fecha: string = '';

  constructor( private userPage: UserPageComponent) { }

  ngOnInit() {}

  goToDetails() {
    this.userPage.optionSelected = 0;
  }
}
