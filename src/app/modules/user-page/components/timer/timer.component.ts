import { Component, Input, OnInit } from '@angular/core';
import { catchError, from, interval, map } from 'rxjs';
import { IonIcon } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { UserPageComponent } from '../../user-page.component';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/services/api.service';
import { EventsPageComponent } from '../events-page/events-page.component';

@Component({
  standalone: true,
  selector: 'app-timer',
  imports: [IonIcon, CommonModule,EventsPageComponent],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {

  time!: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };

  finished: boolean = false;

  forWhatText = "Tiempo restante para el comienzo del sorteo de los slots de compra";

  @Input() finishDateString: string = '2024-03-01 00:00:00';
  finishDate: Date = new Date();

  constructor(private user: UserPageComponent, private auth: AuthService, private api: ApiService, public userPage: UserPageComponent) { }

  ngOnInit(): void {
    this.time = {
      days: '00', hours: '00', minutes: '00', seconds: '00'
    };
    this.finishDate = new Date(this.finishDateString);
    this.start().subscribe(_ => () => { });
    this.auth.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      var isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.auth.user$.subscribe(user => {
          if (user?.sub != null) {
            this.api.getEspecificUser(user.sub).then(response => response.subscribe((user: any) => {
              if (user.zones.lenght != 0) {
                if (new Date("2024-03-30 00:00:00") < new Date()) {
                  if (new Date(user.zones[0].start) <= new Date() && new Date() <= new Date(user.zones[0].end)) {
                    this.userPage.isPurchasePeriod = true;
                    this.finishDate = new Date(user.zones[0].end);
                    this.forWhatText = "Tiempo restante para finalizar el primer periodo de compra"
                    return;
                  } else if (new Date(user.zones[1].start) <= new Date() && new Date() <= new Date(user.zones[1].end)) {
                    this.userPage.isPurchasePeriod = true;
                    this.finishDate = new Date(user.zones[1].end);
                    this.forWhatText = "Tiempo restante para finalizar el segundo periodo de compra"
                    return;
                  } else if (new Date(user.zones[0].start) > new Date()) {
                    this.userPage.isPurchasePeriod = false;
                    this.finishDate = new Date(user.zones[0].start);
                    this.forWhatText = "Tiempo restante para el comienzo del primer periodo de compra"
                    return;
                  } else if (new Date(user.zones[1].start) > new Date()) {
                    this.userPage.isPurchasePeriod = false;
                    this.finishDate = new Date(user.zones[1].start);
                    this.forWhatText = "Tiempo restante para el comienzo del segundo periodo de compra"
                    return;
                  } else {
                    this.userPage.isPurchasePeriod = false;
                    this.forWhatText = "Se ha filaizado el periodo de compra";
                    this.finished = true;
                    return;
                  }
                }
              }
            }));
          }
        });
      }
    });
  }


  updateTime() {
    const diff = this.finishDate.getTime() - Date.now();

    if (diff <= 0) {
      this.finished = true;
      this.userPage.isPurchasePeriod = false;
      this.forWhatText = "Se ha finalizado el periodo de compra";
      return;
    }

    var secs = Math.floor((diff / 1000) % 60);
    var mins = Math.floor((diff / (1000 * 60)) % 60);
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 365);

    this.time.days = this.padLeft(days);
    this.time.hours = this.padLeft(hours);
    this.time.minutes = this.padLeft(mins);
    this.time.seconds = this.padLeft(secs);
  }


  padLeft(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  start() {
    return interval(1000).pipe(
      map((x: number) => {
        this.updateTime();
        return x;
      })
    );
  }
}
