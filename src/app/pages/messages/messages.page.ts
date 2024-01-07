import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
ami:String[]=["1","2","3","4","5","6","7","8","9"]
  constructor() { }

  ngOnInit() {
  }

}
