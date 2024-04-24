import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
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

  constructor(private userPage: UserPageComponent) {}

  goToDetails() {
    this.userPage.eventItemSelected = {titulo: this.titulo, descripcion: this.descripcion, imagenUrl: this.imagenUrl, fecha: this.fecha, id: this.id};
    this.userPage.optionSelected = 0;
  }
}
