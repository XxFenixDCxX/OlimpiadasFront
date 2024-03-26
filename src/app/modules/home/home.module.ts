import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule, HomeRoutingModule, IonicModule
  ]
})
export class HomeModule { }
