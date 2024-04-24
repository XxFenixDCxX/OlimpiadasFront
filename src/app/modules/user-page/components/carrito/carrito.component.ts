import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from '../../user-page.component';
import { ApiService } from 'src/app/services/api.service';
import { finalize } from 'rxjs';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-carrito',
  imports: [CommonModule,IonicModule],
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

  constructor(
    private userPage: UserPageComponent,
    @Inject(ApiService) private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.cartItems = this.userPage.carrito;
    this.calculateTotalPrices(); 
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0); 
  }
  getTotalPriceWithTax(): number {
    return this.cartItems.reduce((total, item) => (total + item.totalPrice)*1.21, 0); 
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


  goToThePaymentPage() {
    this.userPage.purchasedElements = this.userPage.carrito ; 
    this.cartItems = [];
    this.userPage.carrito = [];
    this.userPage.optionSelected = 5;

  }
  validAndProceed() {
    if (this.cartItems.length === 0) {
      alert('Su carrito está vacío.');
      return;
    }
  
    this.goToThePaymentPage();


  }
  
}
