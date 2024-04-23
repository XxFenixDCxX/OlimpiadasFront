import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from '../../user-page.component';

@Component({
  standalone: true,
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  cartItems: any[] = [
    { 
        name: "Eventos deportivos",
        description: "Atletismo ",
        quantity: 5,
        price: 44.00,
        totalPrice: 0, // Añade la propiedad totalPrice para el precio total del artículo
        image: "https://olympics.com/images/static/sports/pictograms/v2/ath.svg"
    },
    { 
        name: "Eventos deportivos",
        description: "Karate",
        quantity: 1,
        price: 44.00,
        totalPrice: 0, // Añade la propiedad totalPrice para el precio total del artículo
        image: "https://olympics.com/images/static/sports/pictograms/v2/kte.svg"
    },
    { 
        name: "Eventos deportivos",
        description: "Fútbol",
        quantity: 1,
        price: 44.00,
        totalPrice: 0, 
        image: "https://olympics.com/images/static/sports/pictograms/v2/fbl.svg"
    }
  ];

  constructor(private userPage: UserPageComponent) { }

  ngOnInit(): void {
    this.cartItems = this.userPage.carrito;
    this.calculateTotalPrices(); 

  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0); 
  }

  increaseQuantity(index: number): void {
    if (this.cartItems[index].quantity < 5) {
      this.cartItems[index].quantity++;
      this.calculateTotalPrices(); 
    }
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.calculateTotalPrices(); 
    }
  }

  calculateTotalPrices(): void {
    this.cartItems.forEach(item => {
      item.totalPrice = item.quantity * item.price;
    });
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1); 
    this.calculateTotalPrices(); 
  }
  goBack() {
    this.userPage.optionSelected = 2;

  }
}
