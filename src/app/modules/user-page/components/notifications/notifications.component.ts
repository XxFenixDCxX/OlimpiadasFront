import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent  implements OnInit {

  @Input() dropdownItems: string[] = ["Notificacion1","Notificacion2","Notificacion4","Notificacion5"];
  @Input() buttonText: string = 'Notificaciones';
  showDropdown: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectItem(item: string) {
    console.log('Selected Item:', item);
    this.showDropdown = false;
  }

  constructor() { }

  ngOnInit() {}

}
