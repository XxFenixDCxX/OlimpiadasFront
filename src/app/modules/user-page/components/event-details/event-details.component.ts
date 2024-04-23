import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  standalone: true,
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  eventId: number = 2; 
  eventSections: any[] = []; 

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadEventData();
    console.log(event)
  }

  loadEventData() {
    this.apiService.getEventSections(this.eventId).subscribe((sections: any[]) => {
      this.eventSections = sections;
    });
  }
}
