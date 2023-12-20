import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage, children:[
      {
        path: 'posts',
        loadChildren: () => import('../posts/posts.module').then( m => m.PostsPageModule)
      },
      {
        path: 'msg',
        loadChildren: () => import('../messages/messages.module').then( m => m.MessagesPageModule)
      },
      {
        path: 'leadbord',
        loadChildren: () => import('../leadboard/leadboard.module').then( m => m.LeadboardPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
