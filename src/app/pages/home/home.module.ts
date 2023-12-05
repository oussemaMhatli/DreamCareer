import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { SettingMenuComponent } from './setting-menu/setting-menu.component';
import { PostsPageModule } from '../posts/posts.module';

@NgModule({
  declarations: [
    NavbarComponent,
    HomePage,
    MenuComponent,
    SettingMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PostsPageModule


  ],
})
export class HomePageModule {}
