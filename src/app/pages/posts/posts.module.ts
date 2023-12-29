import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsPageRoutingModule } from './posts-routing.module';

import { PostsPage } from './posts.page';
import { PostComponent } from './post/post.component';
import { ImageModalComponent } from 'src/app/Component/Modal/image-modal/image-modal.component';
import { ComentsModalComponent } from 'src/app/Component/Modal/coments-modal/coments-modal.component';
import { CommentComponent } from 'src/app/Component/Modal/comment/comment.component';
import { PostSettingComponent } from 'src/app/Component/settings/post-setting/post-setting.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PostsPageRoutingModule],
  declarations: [PostsPage, PostComponent, ImageModalComponent,ComentsModalComponent
    ,CommentComponent,PostSettingComponent],
})
export class PostsPageModule {}
