import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageRoutingModule } from './user-page-routing.module';
import { IonicModule } from '@ionic/angular';
import { UserPageComponent } from './user-page.component';

@NgModule({
  declarations: [UserPageComponent],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    IonicModule
  ]
})
export class UserPageModule { }
