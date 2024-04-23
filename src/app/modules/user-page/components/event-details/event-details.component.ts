import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserPageComponent } from '../../user-page.component';

@Component({
  standalone: true,
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  eventId: number = 2;
  eventSections: any[] = [];

  constructor(private apiService: ApiService, private userPage: UserPageComponent) { }

  ngOnInit() {
    console.log('titulo',this.userPage.eventItemSelected['titulo']);
    this.loadEventData();
  }

  loadEventData() {
    this.apiService.getEventSections(this.eventId).subscribe((sections: any[]) => {
      this.eventSections = sections;
    });
  }
}
