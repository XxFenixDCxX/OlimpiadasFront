import { IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, IonIcon],
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss'],
})
export class CardPaymentComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
