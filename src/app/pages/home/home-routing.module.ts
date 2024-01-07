import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MenuComponent } from './menu/menu.component';

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
      {
        path: 'leadbord',
        loadChildren: () => import('../leadboard/leadboard.module').then( m => m.LeadboardPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
