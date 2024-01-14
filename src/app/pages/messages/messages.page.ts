import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/Message';
import { UserProfile } from 'src/app/models/UserProfile';
import { MessageService } from 'src/app/services/messages/message.service';
import { SocketService } from 'src/app/services/messages/socket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
followers!:any[]
token:any
id:any
cs:any[]=[]
messages:Message[]=[]
hidden!:boolean
receivedMessage:any

  constructor(
    private userService:UserService,
    private msgService:MessageService,
    private loadingController: LoadingController,
    private socketService: SocketService,
  ) { }

  async ngOnInit() {
    await this.presentLoading();
  this.token=localStorage.getItem("user");
  this.id=localStorage.getItem("id");
  this.getUserfollewers()
  this.getConversation()
   this.subscribeToMessages()

  }

  private subscribeToMessages() {
    this.socketService.getMessages().subscribe((data) => {
      this.receivedMessage = {
        sender: data.sender,
        content: data.content,
        createdAt: Date.now(),
      };
      console.log('New event received:', this.receivedMessage);
    });
  }
   getUserfollewers(){
    this.userService.getUserFollowers(this.id,this.token).subscribe(res=>{
      this.followers=res
      console.log(this.followers,"7otelha")
    })

   }


   async getConversation(){
    this.msgService.getConversations(this.id,this.token).subscribe(res=>{
      console.log(res,"getdorigine")
      this.cs=res
      this.dismissLoading()

      })
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });

    await loading.present();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }
}
