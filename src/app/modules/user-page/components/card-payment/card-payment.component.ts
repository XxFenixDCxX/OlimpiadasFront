import { IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { UserPageComponent } from '../../user-page.component';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
@Component({
  standalone: true,
  imports: [CommonModule, IonIcon],
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss'],
})
export class CardPaymentComponent implements OnInit {

  purchasedElements = this.userPage.purchasedElements;
  total = this.purchasedElements.reduce((sum, current) => sum + current.price, 0);

  constructor(
    private userPage: UserPageComponent,
    @Inject(ApiService) private apiService: ApiService
  ) { }

  ngOnInit() { }

  async proceedToPay() {
    const sections = this.purchasedElements.map(item => ({
      [`section${item.idSection}`]: {
        id: item.idSection,
        slots: item.quantity
      }
    }));

    const purchaseData = {
      sections: sections,
      userId: this.userPage.userSub,
    };

    try {
      const response = await this.apiService.purchase(purchaseData);
      console.log('Compra exitosa:', response);
      alert('Compra realizada con éxito.');
    } catch (error) {
      console.error('Error realizando la compra:', error);
      alert('Error realizando la compra: ' + error);
    }
  }
}
