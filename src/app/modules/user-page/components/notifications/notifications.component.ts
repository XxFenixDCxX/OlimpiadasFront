import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {

  @Input() dropdownItems: string[] = ["Notificacion1","Notificacion2","Notificacion4","Notificacion5"];


  selectItem(item: string) {
    console.log('Selected Item:', item);
  }

  constructor() { }


}
