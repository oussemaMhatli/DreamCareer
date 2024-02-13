import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Keyboard, KeyboardResize, KeyboardResizeOptions } from '@capacitor/keyboard';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
onNavbarElementHidden($event: Event) {
throw new Error('Method not implemented.');
}
@ViewChild('contentContainer', { static: false }) contentContainer!: ElementRef;

  private lastY: number = 0;
  private threshold: number = 10; // A
  constructor() {
    this.configureKeyboard()
  }
  @Output() hideNavbarElement: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isElementHidden: boolean = false;

  ngOnInit() {
    this.setupKeyboardListeners();

  }
  setupKeyboardListeners() {

    Keyboard.addListener('keyboardWillShow', info => {
      alert('keyboard will show with height:');
      this.contentContainer.nativeElement.style.marginBottom =
      info.keyboardHeight + 'px';
    });
  }
//   handleScroll(event: CustomEvent) {
//     const currentY = event.detail.scrollTop;

//     if (Math.abs(currentY - this.lastY) > this.threshold) {
//       if (currentY > this.lastY) {
//         this.hideNavbarElement.emit(true);
//       } else {
//         this.hideNavbarElement.emit(false);
//       }

//       this.lastY = currentY;
//     }
//   }
configureKeyboard() {
  // Disable content resizing when the keyboard is opened
  const disableResizeOptions: KeyboardResizeOptions = {
    mode: KeyboardResize.None,
  };

  Keyboard.setResizeMode(disableResizeOptions);
}

}
