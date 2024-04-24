import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private isBusy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isBusyObservable(){
    return this.isBusy.asObservable();
  }

  isBusySetData(data: boolean){
    this.isBusy.next(data);
  } 
}
