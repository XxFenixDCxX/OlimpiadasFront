import { Component } from '@angular/core';
import { SegmentService } from 'src/app/services/segment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  constructor(public segmentService: SegmentService) {}

  // Método para manejar el cambio en el segmento
  segmentChanged(event: CustomEvent) {
    const selectedValue = event.detail.value;
    this.segmentService.setSelectedSegment(selectedValue);
  }

}
