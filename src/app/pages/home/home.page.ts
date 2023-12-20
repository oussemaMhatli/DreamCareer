import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
onNavbarElementHidden($event: Event) {
throw new Error('Method not implemented.');
}
  private lastY: number = 0;
  private threshold: number = 10; // A
  constructor() { }
  @Output() hideNavbarElement: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isElementHidden: boolean = false;

  ngOnInit() {
  }
  handleScroll(event: CustomEvent) {
    const currentY = event.detail.scrollTop;

    if (Math.abs(currentY - this.lastY) > this.threshold) {
      if (currentY > this.lastY) {
        this.hideNavbarElement.emit(true);
      } else {
        this.hideNavbarElement.emit(false);
      }

      this.lastY = currentY;
    }
  }
}
