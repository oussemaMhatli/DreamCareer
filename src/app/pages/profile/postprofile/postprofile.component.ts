import { Component, Input, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { formatDistanceToNow } from 'date-fns';
import { ComentsModalComponent } from 'src/app/Component/Modal/coments-modal/coments-modal.component';
import { ImageModalComponent } from 'src/app/Component/Modal/image-modal/image-modal.component';
import { PostSettingComponent } from 'src/app/Component/settings/post-setting/post-setting.component';
import { Post } from 'src/app/models/Posts';
import { CommentEventService } from 'src/app/services/Events/comment-event-service.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-postprofile',
  templateUrl: './postprofile.component.html',
  styleUrls: ['./postprofile.component.scss'],
})
export class PostprofileComponent  implements OnInit {


  @Input() post!: Post;
  likeslength!:number;
  paragraph: string = ``;
  showFullParagraph: boolean = false;
  liked!:boolean;
  username:any
  token:any
  onePost!:Post

  constructor(
    public popoverCtrl: PopoverController,
    private modalController: ModalController,
    private postService:PostsService,
    private commentEventService:CommentEventService
  ) { }

  ngOnInit() {
  console.log(this.post)
    this.onePost=this.post
    console.log("loula",this.onePost)
    this.likeslength=this.getLikeCount(this.post);
   this.paragraph=this.post.caption;
   this.username=localStorage.getItem("username")
   this.token=localStorage.getItem("user")
   this.searchLiked(this.post,"oussema")
   this.commentEventService.closeModal$.subscribe(() => {
this.closePopover()
  });
  }

  toggleParagraph() {
    this.showFullParagraph = !this.showFullParagraph;
  }
  searchLiked(post: Post, username: any) {
   if(post.likes && post.likes[username]){
    this.liked=true
    console.log("xxxxxxxxxxxxxxxx")
   }else{
    this.liked=false
    console.log("yyyyyyyyyyyyyyyyyy")

   }
  }

  getDisplayedParagraph(): string {
    return this.showFullParagraph ? this.paragraph : this.paragraph.slice(0, 60) ;
  }

  getToggleLabel(): string {
    return this.showFullParagraph ? 'Read less' : 'Read more';
  }
  getLikeCount(p:any): number {
console.log('count', Object.values(p.likes).filter((liked) => liked).length)
this.likeslength=Object.values(p.likes).filter((liked) => liked).length
    return Object.values(p.likes).filter((liked) => liked).length;
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
    const obj={
      "username":"oussema"
    }
    console.log("thi",this.username)
    this.liked=!this.liked;
    this.postService.like(this.token,this.post._id,obj).subscribe(res=>{
      this.onePost=res;
      this.getLikeCount(this.onePost)

      console.log("thenya",this.onePost)

    })
  }
  getPostsbyId(id:any){
    this.postService.getPostsbyId(this.token,id).subscribe(res=>{
    console.log("zayd",res)
    this.onePost=res
    console.log("zayd1",res)

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
