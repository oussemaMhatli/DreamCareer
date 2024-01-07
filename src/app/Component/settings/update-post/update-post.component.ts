import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss'],
})
export class UpdatePostComponent  implements OnInit {
  isFileHidden: boolean = true;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  closeModal() {
    this.modalController.dismiss();
  }
  showFileInput() {
    //this.fileInput.nativeElement.click();
    this.isFileHidden = !this.isFileHidden;
    console.log(this.isFileHidden);
  }

  handleFileInput(event: any) {
    // Handle the file input change event if needed
    const files = event.target.files;
    console.log(files);
  }
}
