import { IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { UserPageComponent } from '../../user-page.component';
import { ApiService } from 'src/app/services/api.service';
import { first, firstValueFrom, Observable } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner';
@Component({
  standalone: true,
  imports: [CommonModule, IonIcon],
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss'],
})
export class CardPaymentComponent{

  purchasedElements = this.userPage.purchasedElements;
  total = this.purchasedElements.reduce((sum, current) => sum + current.totalPrice, 0);

  constructor(
    private userPage: UserPageComponent,
    @Inject(ApiService) private apiService: ApiService,
    private spinnerService: SpinnerService,
  ) { }

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
      this.spinnerService.isBusySetData(true);
      const response = await firstValueFrom(await this.apiService.purchase(purchaseData));
      alert('Compra realizada con éxito.');
      this.userPage.carrito = [];
      this.spinnerService.isBusySetData(false);
      this.userPage.paymentResponse = true;
      this.userPage.optionSelected = 6;
    } catch (error: any) {
      console.error('Error realizando la compra:', error);
      alert(`Error realizando la compra: ${error.message}`);
      this.spinnerService.isBusySetData(false);
      this.userPage.paymentResponse = false;
      this.userPage.optionSelected = 6;
    }
  }
}
