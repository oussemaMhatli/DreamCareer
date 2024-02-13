import { Component, OnInit ,HostListener} from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/Message';
import { UserProfile } from 'src/app/models/UserProfile';
import { SearchEventService } from 'src/app/services/Events/search-event.service';
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
searchTerm:string=""
 usersForSearch: any[] = [];
 userstable:any[] = [];
  originalCs: any[]=[];
  constructor(
    private userService:UserService,
    private msgService:MessageService,
    private loadingController: LoadingController,
    private socketService: SocketService,
    private socket: Socket,
    private searchEventService: SearchEventService

  ) { }

  async ngOnInit() {
   // this.socket.connect();

    await this.presentLoading();
  this.token=localStorage.getItem("user");
  this.id=localStorage.getItem("id");
  this.getUserfollewers()
  this.getConversation()

  this.socketService.getMessages().subscribe(res=>{
    console.log("event emitted")
  })
  this.searchEventService.searchInputChange.subscribe((searchInput: string) => {
    console.log('hedhy fl message:', searchInput);
    // Do something with the searchInput, such as filtering messages based on it
    this.searchTerm=searchInput
    this.searchUser(searchInput)
  });
  }
  async getUsersForSearch() {
    // Initialize an array to store user IDs


    // Iterate through each conversation in cs
    for (const conversation of this.cs) {
      // Find the member ID that is different from this.id
      const otherMemberId = conversation.members.find((memberId: any) => memberId !== this.id);

      // Add the other member ID to usersForSearch array if it exists and is not already added
      if (otherMemberId && !this.usersForSearch?.includes(otherMemberId)) {
        this.getUserById(otherMemberId)
      }
    }

    // Now you have an array of unique member IDs for search
    console.log('Users for search:', this.usersForSearch);
    // You can store or use this array as needed
  }
  async getUserById(id: any) {
    try {
      const user = await this.userService.getUserByUsernameOrId(id, this.token).toPromise();
      this.usersForSearch.push(user);
      console.log("User fetched:", user);

      // Check if all users have been fetched
      if (this.usersForSearch.length === this.cs.length) {
        console.log('All users fetched:', this.usersForSearch);
        // Now you have all users for search
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }
  searchUser(searchTerm: string) {
    // Reset the cs array to show all conversations initially
    this.cs = this.originalCs;

    // Check if the search term is empty
    if (!searchTerm.trim()) {
      return;
    }

    // Use a regular expression for case-insensitive search
    const regex = new RegExp(searchTerm, 'i');

    // Filter the usersForSearch array based on the search term
    const filteredUsers = this.usersForSearch.filter(user => regex.test(user.username));

    // Extract the IDs of the filtered users
    const userIds = new Set(filteredUsers.map(user => user.id));

    // Filter the cs array to show only conversations where the other member ID matches the filtered user IDs
    this.cs = this.cs.filter(conversation => {
      const otherMemberId = conversation.members.find((memberId: any) => memberId !== this.id);
      return userIds.has(otherMemberId);
    });
  }


  // private subscribeToMessages() {
  //   this.socketService.getMessages().subscribe((data) => {
  //     this.receivedMessage = {
  //       sender: data.sender,
  //       content: data.content,
  //       createdAt: Date.now(),
  //     };
  //     console.log('New event received:', this.receivedMessage);
  //   });
  // }
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
      this.originalCs=res
      this.dismissLoading()
      this.getUsersForSearch()

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
  @HostListener('pandown', ['$event'])
  async onPan(event: any): Promise<void> {
    await this.onPanDown();
    this.reloadComponent()
  }
  reloadComponent() {
    window.location.reload()
  }
  showSpinner = false;

 async onPanDown() {
    // Handle pan down event
    this.showSpinner = true;
    // Simulate some asynchronous task
    await this.delay(2000); // Example: Wait for 2 seconds

  }
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
