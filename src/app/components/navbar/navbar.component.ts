import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SegmentService } from 'src/app/services/segment.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})



export class NavbarComponent {
  selectedSegment: string = 'all'
  showNavbar: boolean = true;

  constructor(private segmentService: SegmentService) {}

  segmentChanged(event: CustomEvent) {
    const selectedValue = event.detail.value;
    this.segmentService.setSelectedSegment(selectedValue);
  }
}
