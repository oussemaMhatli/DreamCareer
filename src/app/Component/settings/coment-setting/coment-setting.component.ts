import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommentEventService } from 'src/app/services/comment-event-service.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-coment-setting',
  templateUrl: './coment-setting.component.html',
  styleUrls: ['./coment-setting.component.scss'],
})
export class ComentSettingComponent  implements OnInit {
  @Output() refreshEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private commentEventService: CommentEventService,private comentSerivce:CommentsService) { }

  ngOnInit() {

  }

delete(){
this.commentEventService.emitRefreshEvent();

}
update(){

}
report(){
  
}
}
