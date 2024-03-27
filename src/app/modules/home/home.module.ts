import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PortadaComponent } from './components/portada/portada.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [HomeComponent, TimelineComponent, PortadaComponent, FooterComponent],
  imports: [
    CommonModule, HomeRoutingModule, IonicModule
  ]
})
export class HomeModule { }
