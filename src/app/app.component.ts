import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpinnerService } from './services/spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isBusy: boolean = false;
  spinner$: Subscription = new Subscription(); 
  constructor(private spinnerService: SpinnerService) {}
  
  ngOnInit(): void {
    this.spinner$ = this.spinnerService.isBusyObservable().subscribe({
      next: (result) => {
        this.isBusy = result;
      },
      error: () => {
        console.error();
      }
    })
  }

  ngOnDestroy(): void {
    this.spinner$.unsubscribe();
  }
}
