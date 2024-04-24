import { TimerComponent } from './components/timer/timer.component';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/services/api.service';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { NavbarComponent } from 'src/app/components';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NotisComponent } from './components/notis/notis.component';
import { CardPaymentComponent } from './components/card-payment/card-payment.component';
import { EventsPageComponent } from './components/events-page/events-page.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { CarritoComponent } from './components/carrito/carrito.component';

@Component({
  standalone: true,
  selector: 'app-user-page',
  imports: [IonicModule, TimerComponent, CommonModule, NotisComponent, CardPaymentComponent, EventsPageComponent, EventDetailsComponent , CarritoComponent],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  @ViewChild(TimerComponent) timer!: TimerComponent;
  options: String[] = ["2323", "2323", "22323"];
  eventItemSelected: any = null;
  isAuthenticated: boolean = false;
  isPurchasePeriod: boolean = false;
  optionSelected: number = 1;
  finishLotteryDateString: Date = new Date('2024-03-30 24:00:00')
  isTooSmall: boolean = false;
  carrito: any[] = [];
  purchasedElements: any[] = [];

  constructor(private auth: AuthService, private router: Router, private api: ApiService, private navbar: NavbarComponent) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    this.isTooSmall = window.innerWidth < 768;
  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
      if (!this.isAuthenticated) {
        this.router.navigate(['/home']);
      } else {
        this.navbar.showNavbar = false;
        this.auth.user$.subscribe(user => {
          if (user?.sub != null) {
            this.api.getEspecificUser(user.sub).pipe(
              catchError(error => {
                if (error.status === 404) {
                  if (this.finishLotteryDateString < new Date()) {
                    this.router.navigate(['/home']);
                    alert("El sorteo ha finalizado no es posible registrarse");
                    return of([]);
                  }
                  this.api.createUser({ sub: user.sub, email: user.email, username: user.nickname }).subscribe();
                  return of([]);
                } else {
                  return throwError(error);
                }
              })
            );
          }
        });
      }
    });
    this.checkWindowSize();
  }

  logout() {
    this.auth.logout();
  }

  selectedOption(option: number) {
    this.optionSelected = option;
  }
}
