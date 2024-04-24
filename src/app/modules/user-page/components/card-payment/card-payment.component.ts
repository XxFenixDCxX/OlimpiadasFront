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

  products = [
    { name: 'Producto 1', description: 'baloncesto', price: 200 },
    { name: 'Producto 2', description: 'Futbol', price: 120 }
  ];

  total = this.products.reduce((sum, current) => sum + current.price, 0);

  constructor() { }

  ngOnInit() {}

}
