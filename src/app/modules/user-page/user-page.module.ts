
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageRoutingModule } from './user-page-routing.module';
import { IonicModule } from '@ionic/angular';
import { TimerComponent } from 'src/app/modules/user-page/components/timer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    IonicModule,
    TimerComponent
  ]
})
export class UserPageModule { }
