import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from '../../user-page.component';
import { ApiService } from 'src/app/services/api.service';
import { Observable, catchError, finalize, from, of, switchMap, tap } from 'rxjs';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-carrito',
  imports: [CommonModule,IonicModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private userPage: UserPageComponent,
    @Inject(ApiService) private apiService: ApiService
  ) { }

  ngOnInit(): void {
    console.log(this.userPage.userSub);
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
    this.userPage.setActiveTab(2);
    this.userPage.optionSelected = 2;
  }


  goToThePaymentPage() {
    this.userPage.purchasedElements = this.userPage.carrito ;
    this.cartItems = [];
    this.userPage.optionSelected = 5;

  }
  validAndProceed() {
    if (this.cartItems.length === 0) {
      alert('Su carrito está vacío.');
      return;
    }

    const data = {
      sub: this.userPage.userSub,
      sections: this.cartItems.map(item => ({ id: item.idSection, slots: item.quantity }))
    };

    this.apiService.validateShopCart(data).then((response) => {
      response.subscribe({
        next: () => {
          this.goToThePaymentPage();
          this.userPage.setActiveTab(0);
        },
        error: (error: any) => {
          if (error.status === 400) {
            alert(error.error.error);
          }
        }
      });
    });
  }
}
