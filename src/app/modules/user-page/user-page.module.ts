import { TimerComponent } from './components/timer/timer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageRoutingModule } from './user-page-routing.module';
import { IonicModule } from '@ionic/angular';
import { UserPageComponent } from './user-page.component';
import { NotificationsComponent } from './components';

@NgModule({
  declarations: [UserPageComponent, NotificationsComponent, TimerComponent],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    IonicModule,
    
  ]
})
export class UserPageModule { }
