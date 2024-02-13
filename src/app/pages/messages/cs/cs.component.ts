import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { Conversation } from 'src/app/models/Conversation';
import { Message } from 'src/app/models/Message';
import { User } from 'src/app/models/User';
import { UserProfile } from 'src/app/models/UserProfile';
import { MessageService } from 'src/app/services/messages/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cs',
  templateUrl: './cs.component.html',
  styleUrls: ['./cs.component.scss'],
})
export class CsComponent  implements OnInit {
  @Input() cs:Conversation=new Conversation()
  id:any;
  token:any
  user:UserProfile=new UserProfile()
  followerId: string | null = null;
  messages:Message[]=[]
  lastMessage:Message=new Message()

    constructor(
    private userService:UserService,
    private msgService:MessageService,
    private route:Router,
  ) { }

  ngOnInit() {
    console.log("avv",this.cs)
    this.id=localStorage.getItem("id")
    this.token=localStorage.getItem("user")
    this.followerId=this.getFollowerId()
    console.log(this.followerId,'follow')
    this.getUserById(this.followerId)
    this.getMessages()
  }
  getFollowerId(): string | null {
    if (this.cs && this.cs.members) {
      for (const memberId of this.cs.members) {
        if (memberId !== this.id) {
          return memberId; // Return the first ID that is different from this.id
        }
      }
    }
    return null; // Return null if no different ID is found
  }
  getUserById(id:any){
this.userService.getUserByUsernameOrId(id,this.token).subscribe(res=>{
  this.user=res
  console.log(this.user,"this.user")
})

  }
   formatUpdatedAt(): string {
    const date = new Date(this.lastMessage.updatedAt);
    const formattedDate = format(date, "hh:mm a");
    return formattedDate;
  }
  getMessages(){
  this.msgService.getMessages(this.token,this.cs._id).subscribe(res=>{
    this.messages=res
    console.log(this.messages,"msg")
    console.log(this.cs._id,"this.cs._id")

    if (this.messages.length > 0) {
     this.lastMessage= this.messages[this.messages.length - 1];
      console.log("Last Message:", this.lastMessage);
    } else {
      console.log("No messages available");
    }
  },error=>{
    console.log(error,"error")

  })
  }
  goMessage(){
    this.route.navigate(['/home/msg/message', this.cs._id,this.followerId]);

  }
}
