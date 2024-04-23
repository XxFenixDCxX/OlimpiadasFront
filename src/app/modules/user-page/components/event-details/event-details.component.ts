import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  standalone: true,
  imports: [IonicModule,CommonModule],
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  category = new FormControl('');

}
