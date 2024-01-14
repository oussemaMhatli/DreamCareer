import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagesPageRoutingModule } from './messages-routing.module';

import { MessagesPage } from './messages.page';
import { FollowerComponent } from './follower/follower.component';
import { MsgComponent } from './msg/msg.component';
import { CsComponent } from './cs/cs.component';
import { UppercaseFirstPipe } from 'src/app/pipes/uppercase-first.pipe';
import { SocketConfigService } from 'src/app/services/messages/socket-config.service';
import { SocketService } from 'src/app/services/messages/socket.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagesPageRoutingModule,


  ],
  declarations: [MessagesPage,FollowerComponent,MsgComponent,
    CsComponent,
    UppercaseFirstPipe,
  ]
})
export class MessagesPageModule {}
