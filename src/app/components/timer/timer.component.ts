import { Component, Input, OnInit } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent  implements OnInit {

  time!: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  @Input() finishDateString: string = '2025-12-12';
  finishDate: Date = new Date();
  
  ngOnInit(): void {
    this.time = {
      days: 0, hours: 0, minutes: 0, seconds: 0
    };
    this.finishDate = new Date(this.finishDateString); 

    this.start().subscribe(_ => console.log("tik"));
  }

  updateTime() {
    
    const now = new Date();
    const diff = this.finishDate.getTime() - now.getTime();
    console.log(diff)

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(diff / (1000 * 60));
    const secs = Math.floor(diff / 1000);
    
    this.time.days = days;
    this.time.hours = hours - days * 24;
    this.time.minutes = mins - hours * 60;
    this.time.seconds = secs - mins * 60;
  }
  
  start() {
    return interval(1000).pipe(
      map((x: number) => {
        this.updateTime();
        return x;
      })
    );
  }
  constructor() { }


}
