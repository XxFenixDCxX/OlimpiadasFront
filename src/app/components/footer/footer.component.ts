import { Component, OnInit } from '@angular/core';
import { IonToolbar, IonicModule } from '@ionic/angular';
import { IonFooter } from "@ionic/angular/standalone";

@Component({
  standalone: true,
  imports: [IonicModule],
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [IonicModule],
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}