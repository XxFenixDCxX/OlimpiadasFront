import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController } from '@ionic/angular';
import { SegmentService } from 'src/app/services/segment.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [IonicModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  selectedSegment: string = 'all'

  constructor(private segmentService: SegmentService) {}

  // Método para manejar el cambio en el segmento
  segmentChanged(event: CustomEvent) {
    const selectedValue = event.detail.value;
    this.segmentService.setSelectedSegment(selectedValue);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollFunction();
  }

  scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      document.getElementById("navbar")!.style.padding = "30px 10px";
      document.getElementById("logo")!.style.fontSize = "25px";
    } else {
      document.getElementById("navbar")!.style.padding = "80px 10px";
      document.getElementById("logo")!.style.fontSize = "35px";
    }
  }
}