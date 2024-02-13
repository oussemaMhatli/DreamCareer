import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/Message';
import { MessageRequest } from 'src/app/models/MessageRequest';
import { UserProfile } from 'src/app/models/UserProfile';
import { MessageService } from 'src/app/services/messages/message.service';
import { SocketService } from 'src/app/services/messages/socket.service';
import { SearchEventService } from 'src/app/services/Events/search-event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss'],
})
export class MsgComponent  implements OnInit {
csid:any
token:any
cs:any[]=[]
message!: string;
id:any
fid:any
messages:Message[]=[]
follower:UserProfile=new UserProfile()
user:UserProfile=new UserProfile()
msgContent:string=""
msgRequest!:any;
Search:string=""
  constructor(
    private route: ActivatedRoute,
    private msgService:MessageService,
    private chatService:SocketService,
    private userService:UserService,
    private router:Router,
    private searchInputService: SearchEventService
  ) { }

  ngOnInit() {
    this.searchInputService.searchInputChange.subscribe(res=>{
      console.log('resbcbcbcbcbcbcb',res)
      this.Search=res
    })
    this.token=localStorage.getItem("user");
    this.id=localStorage.getItem("id")
    this.route.params.subscribe(params => {
      this.csid = params['id'];
    });
    this.route.params.subscribe(params => {
      this.fid = params['fid'];
    });
    console.log('this.cs',this.csid)
    this.getFollower()
    this.getUser()

       this.getMessages()
    this.getConversation()
    this.chatService.getNewMessages1().subscribe((message: any) => {
      this.messages.push(message);
      console.log("socket this.jn",message)
      console.log("socket Nej7et")
    },error=>{
      console.log("eeeeeeee",error)
    });


  }
  goProfile(){
    this.router.navigate(['home/profile',this.follower.username])

  }
  getConversation(){
    this.msgService.getConversations(this.id,this.token).subscribe(res=>{
      console.log(res,"getdorigine")
      this.cs=res


      })
  }
addmessage(){
  let data={

  }
}
getMessages(){
  this.msgService.getMessages(this.token,this.csid).subscribe(res=>{
    this.messages=res
    console.log(this.messages,"mesagetna")

  })
}
getFollower(){
  this.userService.getUserByUsernameOrId(this.fid,this.token).subscribe(res=>{
    this.follower=res
    console.log(this.follower,'idyetna')

  })
}
getUser(){
  this.userService.getUserByUsernameOrId(this.id,this.token).subscribe(res=>{
    this.user=res
    console.log(this.user,'idyetna')

  })
}
addMessage(){


  let msg={
    "conversationId": this.csid,
    "sender": this.id,
    "content":this.msgContent
  }
  console.log(this.msgRequest, "chak");
  console.log(this.msgRequest,"chak")
  this.msgService.AddMessage(this.token,msg).subscribe(res=>{
    console.log(res);
    this.msgContent=""
    this.getMessages()
  })
}
search(){
  this.searchInputService.searchInputChange.subscribe(
    (searchInput) => {
      this.Search = searchInput;
console.log(this.Search,"this.search")    }
  );
}
  }




