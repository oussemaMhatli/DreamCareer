import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/User/login/login.component';
import { RegisterComponent } from './Component/User/register/register.component';
import { WelcomeComponent } from './Component/welcome/welcome.component';
import { WelcomPageComponent } from './Component/User/welcom-page/welcom-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'wl',
    component: WelcomPageComponent,
  },
  {
    path: 'signup',
    component: RegisterComponent,
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'leadboard',
    loadChildren: () => import('./pages/leadboard/leadboard.module').then( m => m.LeadboardPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
