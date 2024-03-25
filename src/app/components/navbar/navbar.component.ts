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

  constructor(private menu: MenuController) { }
  ngOnInit(){
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
