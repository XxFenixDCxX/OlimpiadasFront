import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PortadaComponent } from './components/portada/portada.component';



@NgModule({
  declarations: [HomeComponent, TimelineComponent, PortadaComponent],
  imports: [
    CommonModule, HomeRoutingModule, IonicModule
  ]
})
export class HomeModule { }
