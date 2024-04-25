import { TimerComponent } from './components/timer/timer.component';
import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/services/api.service';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, Subscription, from, of, throwError } from 'rxjs';
import { NavbarComponent } from 'src/app/components';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NotisComponent } from './components/notis/notis.component';
import { CardPaymentComponent } from './components/card-payment/card-payment.component';
import { EventsPageComponent } from './components/events-page/events-page.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import{PaymentResponseComponent} from './components/payment-response/payment-response.component';
import { SpinnerService } from 'src/app/services/spinner';
import { SpinnerComponent } from "../../components/spinner/spinner.component";

@Component({
  standalone: true,
  selector: 'app-user-page',
  imports: [IonicModule, TimerComponent, CommonModule, NotisComponent, CardPaymentComponent, EventsPageComponent, EventDetailsComponent, CarritoComponent, PaymentResponseComponent,SpinnerComponent],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
   
})
export class UserPageComponent implements OnInit, OnDestroy {
  @ViewChild(TimerComponent) timer!: TimerComponent;
  options: String[] = ["2323", "2323", "22323"];
  eventItemSelected: any = null;
  isAuthenticated: boolean = false;
  isPurchasePeriod: boolean = false;
  optionSelected: number = 1;
  finishLotteryDateString: Date = new Date('2025-03-30 24:00:00')
  isTooSmall: boolean = false;
  carrito: any[] = [];
  purchasedElements: any[] = [];
  userSub: string = '';
  paymentResponse: boolean = false;
  isBusy: boolean = false;
  spinner$: Subscription = new Subscription();

  constructor(private auth: AuthService, private router: Router, private api: ApiService, private navbar: NavbarComponent, private spinnerService: SpinnerService) { }

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
        let options = {
          audience: 'http://localhost/8100',
          scope: 'read:records',
          responseType: 'token',
          algorithm: 'HS256',
          detailedResponse: true
        }
        this.auth.getAccessTokenSilently(options).subscribe((token: any)=> {
          this.api.token = token.id_token;
          this.navbar.showNavbar = false;
          this.auth.user$.subscribe(user => {
            if (user?.sub != null) {
              this.userSub = user.sub;
              from(this.api.getEspecificUser(this.userSub)).pipe(
                switchMap((userObservable: Observable<any>) => userObservable.pipe(
                  catchError(error => {
                    if (error.status === 404) {
                      if (this.finishLotteryDateString < new Date()) {
                        this.router.navigate(['/home']);
                        alert("El sorteo ha finalizado no es posible registrarse");
                        return of([]);
                      }
                      return this.api.createUser({ sub: user.sub, email: user.email, username: user.nickname });
                    } else {
                      return throwError(error);
                    }
                  })
                ))
              ).subscribe();
            }
          });
        });
      }
    });
    this.checkWindowSize();
    this.spinner$ = this.spinnerService.isBusyObservable().subscribe({
      next: (result) => {
        this.isBusy = result;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  ngOnDestroy(): void {
    this.spinner$.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }

  selectedOption(option: number) {
    this.spinnerService.isBusySetData(false);
    this.optionSelected = option;
  }

  selectedTab: number = 1;

  setActiveTab(tabNumber: number): void {
    this.selectedTab = tabNumber;
  }

  getCarritoItemCount(): number {
    return this.carrito.length;
  }
}


