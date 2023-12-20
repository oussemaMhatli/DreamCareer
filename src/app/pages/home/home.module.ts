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
import { DragDropModule } from '@angular/cdk/drag-drop';

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
    PostsPageModule,
    DragDropModule

  ],
})
export class HomePageModule {}
