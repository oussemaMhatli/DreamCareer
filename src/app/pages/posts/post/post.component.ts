import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Posts';
import { formatDistanceToNow } from 'date-fns';
import { SettingMenuComponent } from '../../home/setting-menu/setting-menu.component';
import { ModalController, PopoverController } from '@ionic/angular';
import { ImageModalComponent } from 'src/app/Component/Modal/image-modal/image-modal.component';
import { ComentsModalComponent } from 'src/app/Component/Modal/coments-modal/coments-modal.component';
import { CommentsService } from 'src/app/services/comments.service';
import { PostsService } from 'src/app/services/posts.service';
import { PostSettingComponent } from 'src/app/Component/settings/post-setting/post-setting.component';
import { CommentEventService } from 'src/app/services/comment-event-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent  implements OnInit {

  @Input() post!: Post;
  likeslength!:number;
  paragraph: string = ``;
  showFullParagraph: boolean = false;
  liked:boolean=false;
  username:any
  token:any
  constructor(
    public popoverCtrl: PopoverController,
    private modalController: ModalController,
    private postService:PostsService,
    private commentEventService:CommentEventService
  ) { }

  ngOnInit() {
  console.log(this.post)

    this.likeslength=this.getLikeCount();
   this.paragraph=this.post.caption;
   this.username=localStorage.getItem("username")
   this.token=localStorage.getItem("user")
   this.commentEventService.closeModal$.subscribe(() => {
this.closePopover()
  });
  }

  toggleParagraph() {
    this.showFullParagraph = !this.showFullParagraph;
  }

  getDisplayedParagraph(): string {
    return this.showFullParagraph ? this.paragraph : this.paragraph.slice(0, 60) ;
  }

  getToggleLabel(): string {
    return this.showFullParagraph ? 'Read less' : 'Read more';
  }
  getLikeCount(): number {
console.log('count', Object.values(this.post.likes).filter((liked) => liked).length)
    return Object.values(this.post.likes).filter((liked) => liked).length;

  }
  formatTimeDifference(date: string): string {
    const parsedDate = new Date(date);
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  }
  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
        component: PostSettingComponent,
        componentProps: {
          postId: this.post._id
        },

        event: ev,
        animated: true,
        showBackdrop: true,
        //cssClass:'popover'
      });
      await popover.dismiss();
    return await popover.present();
  }

  closePopover() {
    // Close the popover
    this.popoverCtrl.dismiss();
  }
  like(){
    this.liked=!this.liked;
    this.postService.like(this.token,this.post._id,this.username).subscribe(res=>{
      console.log(res,"toufa l7arb tabda era7a")
      this.getLikeCount()
    })
  }
  async openImageModal(imageUrl: string) {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: {
        imageUrl: imageUrl,
      },
    });
    return await modal.present();
  }
  async openComentsModal() {
    const modal = await this.modalController.create({
      component: ComentsModalComponent,
      componentProps: {
        postId: this.post._id,
      },
    });
    return await modal.present();    }
}
