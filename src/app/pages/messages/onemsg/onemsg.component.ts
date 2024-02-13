import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDistanceToNow } from 'date-fns';
import { Message } from 'src/app/models/Message';
import { UserPhoto, UserProfile } from 'src/app/models/UserProfile';
import { SearchEventService } from 'src/app/services/Events/search-event.service';

@Component({
  selector: 'app-onemsg',
  templateUrl: './onemsg.component.html',
  styleUrls: ['./onemsg.component.scss'],
})
export class OnemsgComponent  implements OnInit {
@Input() msg:Message=new Message()
@Input() follower:UserProfile=new UserProfile()
@Input() user:UserProfile=new UserProfile()
time:boolean=false
fid:any
id:any
searchTerm:string=""

  constructor(
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.fid = params['fid'];
    });
    this.id=localStorage.getItem("id")

  }
showTime(){
  this.time=!this.time
}
formatTimeDifference(date: string): string {
  const parsedDate = new Date(date);
  return formatDistanceToNow(parsedDate, { addSuffix: true });
}

}
