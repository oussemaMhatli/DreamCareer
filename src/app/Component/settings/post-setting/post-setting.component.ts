import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CommentEventService } from 'src/app/services/comment-event-service.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-setting',
  templateUrl: './post-setting.component.html',
  styleUrls: ['./post-setting.component.scss'],
})
export class PostSettingComponent  implements OnInit {
  @Input() postId!: string;
  @Output() refreshEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeEvent: EventEmitter<void> = new EventEmitter<void>();

username:any
token:any
  constructor(private postService:PostsService,
    private modalController: ModalController,
    private toastController: ToastController,

    private commentEventService:CommentEventService) { }
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.delete()
      },
    },
  ];

  setResult(ev:any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }
  ngOnInit() {
    this.token=localStorage.getItem("user")
    this.username=localStorage.getItem("usernme")
  }
async delete(){
this.postService.delete(this.token,this.postId,this.username).subscribe(async res=>{
  this.commentEventService.emitRefreshEvent();
  await this.showToasts("Post deleted successful",'success')
 this.closeModal()
})

}
closeModal() {
  this.commentEventService.emitCloseEvent();

}

async showToasts(msg:string,color:string) {
  const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: color,

  });
  toast.present();
}
}
