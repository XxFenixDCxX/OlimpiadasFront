
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageRoutingModule } from './user-page-routing.module';
import { IonicModule } from '@ionic/angular';
import { UserPageComponent } from './user-page.component';
import { NotificationsComponent } from './components';
import { TimerComponent } from 'src/app/components/timer';

@NgModule({
  declarations: [UserPageComponent, NotificationsComponent],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    IonicModule,
    TimerComponent  
  ]
})
export class UserPageModule { }
