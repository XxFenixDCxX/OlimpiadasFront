import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserPageComponent } from '../../user-page.component';
@Component({
  standalone  : true,
  selector: 'app-payment-response',
  imports: [ CommonModule ],
  templateUrl: './payment-response.component.html',
  styleUrls: ['./payment-response.component.scss'],
})
export class PaymentResponseComponent  implements OnInit {

  constructor(private userPage : UserPageComponent) {
    
   }
   isSuccess: boolean = this.userPage.paymentResponse; 

  ngOnInit() {}

}
