import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesPage } from './messages.page';
import { MsgComponent } from './msg/msg.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesPage
  },
  {        path: 'message/:id/:fid',component:MsgComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesPageRoutingModule {}
