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
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FollowRequest } from 'src/app/models/FollowRequest';

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
  liked!:boolean;
  username:any
  token:any
  onePost!:Post
  followings:any[]=[]
  id:any
  followRequest!:FollowRequest

  constructor(
    public popoverCtrl: PopoverController,
    private modalController: ModalController,
    private postService:PostsService,
    private userService:UserService,

    private commentEventService:CommentEventService,
    private route:Router
  ) { }

  ngOnInit() {
  console.log(this.post)
    this.onePost=this.post
    this.id=localStorage.getItem("id")
    console.log("loula",this.onePost)
    this.likeslength=this.getLikeCount(this.post);
   this.paragraph=this.post.caption;
   this.username=localStorage.getItem("username")
   this.token=localStorage.getItem("user")
   this.searchLiked(this.post,this.username)
   this.getFolowingsUser()
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
      "username":this.username
    }
    console.log("thi",this.username)
    this.liked=!this.liked;
    this.postService.like(this.token,this.post._id,obj).subscribe(res=>{
      this.onePost=res;
      this.getLikeCount(this.onePost)


    })
  }
  getPostsbyId(id:any){
    this.postService.getPostsbyId(this.token,id).subscribe(res=>{
    this.onePost=res

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
    goProfile(){
      this.route.navigate(['home/profile',this.post.username])

    }
    getFolowingsUser(){
      this.userService.getUserFollowings(this.id,this.token).subscribe(res=>{
        this.followings=res
        console.log("jfoun",this.followings,"jfoun")

      })
    }

    isFollowing(username: string): boolean {
      // Ensure that this.followings is an array
      if (Array.isArray(this.followings)) {
        // Check if the username is found in this.followings
        console.log("ahhhhhh",this.followings.some(user => user.username === username))
        return this.followings.some(user => user.username === username);
      } else {
        console.error("Followings array is not properly initialized.");
        return false; // or handle it in a way that makes sense for your application
      }
    }
    follow(fid:string,username:string){
     let obj={
       "followingId":fid
      }
      console.log(fid)
      this.userService.followUnfollow(this.id,this.token,obj).subscribe(res=>{
        this.getFolowingsUser()
      })

    }

}
