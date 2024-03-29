import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { interval, map } from 'rxjs';
import { IonIcon } from "@ionic/angular/standalone";

@Component({
  standalone: true,
  selector: 'app-timer',
  imports: [IonIcon],
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

  forWhatText = "Tiempo restante para el sorteo de los slots de compra";

  @Input() finishDateString: string = '2024-03-29 24:00:00';
  finishDate: Date = new Date();

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.time = {
      days: '00', hours: '00', minutes: '00', seconds: '00'
    };
    this.finishDate = new Date(this.finishDateString);

    this.start().subscribe(_ => () => {});
  }

  updateTime() {
    const diff = this.finishDate.getTime() - Date.now();

		var secs = Math.floor((diff/1000) % 60);
		var mins = Math.floor((diff/(1000*60)) % 60);
    var hours = Math.floor((diff/(1000*60*60)) % 24);
		var days = Math.floor((diff/(1000*60*60*24)) % 365);

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
