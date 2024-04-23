
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageRoutingModule } from './user-page-routing.module';
import { IonicModule } from '@ionic/angular';
import { TimerComponent } from 'src/app/modules/user-page/components/timer';
import { CardPaymentComponent } from './components/card-payment/card-payment.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    IonicModule,
    TimerComponent,
    CardPaymentComponent
  ]
})
export class UserPageModule { }
