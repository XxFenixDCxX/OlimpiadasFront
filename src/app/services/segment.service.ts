import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SegmentService {

  private selectedSegment: string = 'all';

  getSelectedSegment(): string {
    return this.selectedSegment;
  }

  setSelectedSegment(segment: string): void {
    this.selectedSegment = segment;
  }
}
