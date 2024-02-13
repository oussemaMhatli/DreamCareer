import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { formatDistanceToNow } from 'date-fns';
import { Coment, ComentBody } from 'src/app/models/Comment';
import { User } from 'src/app/models/User';
import { SettingMenuComponent } from 'src/app/pages/home/setting-menu/setting-menu.component';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';
import { ComentSettingComponent } from '../../settings/coment-setting/coment-setting.component';
import { CommentEventService } from 'src/app/services/Events/comment-event-service.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent  implements OnInit {
  @Input() comment!: Coment ; // Adjust the type accordingly
  liked:boolean=false;
  username!:any
  token:any
 Onecomment:ComentBody=new ComentBody();
  constructor(private commentService:CommentsService,
    public popoverCtrl: PopoverController,


    ) { }

  ngOnInit() {
this.username=localStorage.getItem("username")
this.token=localStorage.getItem("token")


  }

  formatTimeDifference(date: string): string {
    const parsedDate = new Date(date);
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  }
  like(){
    this.liked=!this.liked;
    console.log("drayj",this.comment)
    this.commentService.LikeComments(this.comment.postId,this.token,this.comment._id,this.username).subscribe(res=>{
      console.log("oussema",res)
    })
  }
  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
        component: ComentSettingComponent,
        event: ev,
        animated: true,
        showBackdrop: true,
        //cssClass:'popover'
      });

    return await popover.present();
  }

}
