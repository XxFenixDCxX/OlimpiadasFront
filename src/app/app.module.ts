import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components';

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), NavbarComponent, SpinnerComponent, AppRoutingModule, AuthModule.forRoot({
    domain: 'olimpiadas.eu.auth0.com',
    clientId: '8pVwMYIOg4tpzic1dimziFK55wBs55LJ',
    authorizationParams: {
      redirect_uri: 'http://localhost:8100/userpage'
    }
  })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
