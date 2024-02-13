import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Coment, ComentBody } from 'src/app/models/Comment';
import { User } from 'src/app/models/User';
import { UserProfile } from 'src/app/models/UserProfile';
import { CommentEventService } from 'src/app/services/Events/comment-event-service.service';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-coments-modal',
  templateUrl: './coments-modal.component.html',
  styleUrls: ['./coments-modal.component.scss'],
})
export class ComentsModalComponent  implements OnInit {
  Coments: Coment[] = []; // Assuming Coments is an array of Comment objects
  @Input() postId: string='';
  token:any;
  id:any;
  user!:any
  username!:any
  commentCaption:string=""
  Onecomment:ComentBody=new ComentBody();
  @Output() refreshEvent: EventEmitter<void> = new EventEmitter<void>();

  private scrollContainer!: ElementRef;

  constructor(private modalController: ModalController,
    private commentService:CommentsService,    private UserService:UserService,
    private elementRef: ElementRef, private renderer: Renderer2,
    private commentEventService: CommentEventService,

    ) {}

    ngOnInit() {
      this.token=localStorage.getItem("user")
      this.username=localStorage.getItem("username")

      console.log('commentsToken',this.postId)
      this.getComments()
      this.id=localStorage.getItem("id")
this.getUserById(this.id,this.token);

this.commentEventService.refreshEvent$.subscribe(() => {
  this.getComments();
});
    }
    addComents(){
    this.Onecomment.commentBody=this.commentCaption;
    this.Onecomment.postId=this.postId
    this.Onecomment.userId=this.id
    this.Onecomment.username=this.username;
    this.Onecomment.userProfilePhoto=this.user.profilePhotoUrl
    console.log("eeeeee",this.Onecomment)
      this.commentService.addComments(this.postId,this.Onecomment,this.token).subscribe(
        (res) => {
          console.log(res, "Response from addComments");
          this.getComments();
          this.commentCaption=""
          this.commentEventService.emitRefreshEvent();

        },
        (error) => {
          console.error(error, "Error adding comments");
          // Handle error as needed
        }
      )


   }
  getComments() {
    this.commentService.getCommentsById(this.postId, this.token).subscribe(
      (res: Coment[]) => {
        this.Coments = res;
        console.log( this.Coments, 'comments');

      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }
getUserById(id:any,token:any){
  this.UserService.getUser(id,token).subscribe((res:User)=>{
    this.user=res
    console.log('userradi',this.user.profilePhotoUrl)
  })
}
closeModal() {
  this.modalController.dismiss();
}


}
