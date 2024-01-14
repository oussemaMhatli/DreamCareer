import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/messages/message.service';
import { SocketService } from 'src/app/services/messages/socket.service';

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
messages: string[] = [];
id:any
  constructor(
    private route: ActivatedRoute,
    private msgService:MessageService,
    private chatService:SocketService
  ) { }

  ngOnInit() {
    this.token=localStorage.getItem("user");
    this.id=localStorage.getItem("id")
    this.route.params.subscribe(params => {
      this.csid = params['id'];
    });
    this.getConversation()

  }
  getConversation(){
    this.msgService.getConversations(this.id,this.token).subscribe(res=>{
      console.log(res,"getdorigine")
      this.cs=res


      })
  }

  }




