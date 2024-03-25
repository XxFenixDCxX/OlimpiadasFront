import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [IonicModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {
  constructor() { }
  ngOnInit(){}
}
