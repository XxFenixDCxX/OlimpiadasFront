import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/services/api.service';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { NavbarComponent } from 'src/app/components';
import { TimerComponent } from './components/timer';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  @ViewChild(TimerComponent) timer!: TimerComponent;
  options: String[] = ["2323", "2323", "22323"];
  isAuthenticated: boolean = false;
  isPurchasePeriod: boolean = false;
  optionSelected: number = 1;
  finishLotteryDateString: Date = new Date('2024-03-30 24:00:00')
  isTooSmall: boolean = false;

  constructor(private auth: AuthService, private router: Router, private api:ApiService, private navbar: NavbarComponent) {}

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
        var exist = false;
        this.api.getAllUsers().pipe(
          catchError(error => {
            if (error.status === 404) {
              this.auth.user$.subscribe(user => {
                this.api.createUser({sub: user?.sub, email: user?.email, username: user?.nickname}).subscribe();
              });
              return of([]);
            } else {
              return throwError(error);
            }
          })
        ).subscribe((data) => {
          this.auth.user$.subscribe(user => {
            var sub = user?.sub;
            data.forEach(element => {
              if(element.sub == sub) {
                exist = true;
                if(element.zones.lenght != 0){
                  if (new Date("2024-03-30 00:00:00") < new Date()) {
                    if (new Date(element.zones[0].start.date) <= new Date() && new Date() <= new Date(element.zones[0].end.date)){
                      this.isPurchasePeriod = true;
                      this.timer.finishDate = new Date(element.zones[0].end.date);
                      this.timer.forWhatText = "Tiempo restante para finalizar el primer periodo de compra"
                      return;
                    } else if (new Date(element.zones[1].start.date) <= new Date() && new Date() <= new Date(element.zones[1].end.date)){
                      this.isPurchasePeriod = true;
                      this.timer.finishDate = new Date(element.zones[1].end.date);
                      this.timer.forWhatText = "Tiempo restante para finalizar el segundo periodo de compra"
                      return;
                    } else if (new Date(element.zones[0].start.date) > new Date()) {
                      this.isPurchasePeriod = false;
                      this.timer.finishDate = new Date(element.zones[0].start.date);
                      this.timer.forWhatText = "Tiempo restante para el comienzo del primer periodo de compra"
                      return;
                    } else if (new Date(element.zones[1].start.date) > new Date()) {
                      this.isPurchasePeriod = false;
                      this.timer.finishDate = new Date(element.zones[1].start.date);
                      this.timer.forWhatText = "Tiempo restante para el comienzo del segundo periodo de compra"
                      return;
                    } else {
                      this.isPurchasePeriod = false;
                      this.timer.forWhatText = "Se ha filaizado el periodo de compra";
                      this.timer.finished = true;
                      return;
                    }
                  }
                }
              }
            });
            if(!exist && this.finishLotteryDateString > new Date()) {
              this.api.createUser({sub: user?.sub, email: user?.email, username: user?.nickname}).subscribe();
            } else if (!exist && this.finishLotteryDateString < new Date()) {
              this.router.navigate(['/home']);
              alert("El sorteo ha finalizado no es posible registrarse");
            }
          });
        });
      }
    });
    this.checkWindowSize();
  }

  logout() {
    this.auth.logout();
  }

  selectedOption(option: number){
    this.optionSelected = option;
  }
}
