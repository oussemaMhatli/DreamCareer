import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Conversation } from 'src/app/models/Conversation';
import { MessageService } from 'src/app/services/messages/message.service';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.scss'],
})
export class FollowerComponent  implements OnInit {
@Input() follower!:any
  constructor(private msgService:MessageService,
    private toastController: ToastController,
    private route:Router
    ) { }
 token:any
 member:any[]=[]
 id:any
 cs:Conversation[]=[]
  ngOnInit() {
    this.token=localStorage.getItem("user");
    this.id=localStorage.getItem("id");
    this.getConversation()
    console.log('la3ma ychouf 5yr menou',this.follower)

  }
  async createOrGoConversation() {
    const conversationId = this.searchElement();
    if (conversationId) {
      this.route.navigate(['/home/msg/message', conversationId]);
    } else {
      this.createCs();
    }

  }
     getConversation(){
      this.msgService.getConversations(this.id,this.token).subscribe(res=>{
        console.log(res,"get")
        this.cs=res


        })
    }

    searchElement(): string | undefined {
      const foundConversation = this.cs.find((ele) =>
        ele.members.includes(this.id) && ele.members.includes(this.follower._id)
      );

      return foundConversation ? foundConversation._id : undefined;
    }
    async createCs() {
      console.log("this.id:", this.id);
      console.log("this.follower._id:", this.follower._id);

      if (this.id && this.follower && this.follower._id) {
        let obj = {
          "members": [this.id, this.follower._id]
        };

        console.log("obj:", obj);

        this.msgService.CreateConversation(this.token, obj).subscribe(
          async (res) => {
            await this.showToasts("Conversation Created Successful", 'success');
            console.log("createres", res);
          },
          async (error) => {
            console.error("Error during conversation creation:", error);
            await this.showToasts("Error!! Please try again", 'danger');
          }
        );
      } else {
        console.error("Cannot create conversation. 'id' or 'follower._id' is null or undefined.");
      }
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
