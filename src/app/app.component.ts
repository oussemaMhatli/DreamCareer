import { Component } from '@angular/core';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.initializeApp();

  }
  ngOnInit(){
    Keyboard.addListener('keyboardWillShow', info => {
      alert('keyboard will show with height:');
      
    });
  }

  initializeApp() {
    // Wait for Capacitor to be ready
    document.addEventListener('deviceready', () => {
      // Disable keyboard resizing
      Keyboard.setResizeMode({
        mode: KeyboardResize.None
      }).catch(error => {
        console.error('Error setting keyboard resize mode:', error);
      });
    });
  }

}
