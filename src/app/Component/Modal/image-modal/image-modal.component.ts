import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent  implements OnInit {

  @Input() imageUrl: string='';

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }
  ngOnInit() {
    console.log('Image URL:', this.imageUrl);

  }

}
