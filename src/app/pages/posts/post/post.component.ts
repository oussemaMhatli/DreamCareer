import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Posts';
import { formatDistanceToNow } from 'date-fns';
import { SettingMenuComponent } from '../../home/setting-menu/setting-menu.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent  implements OnInit {
  @Input() post!: Post;
  likeslength!:number;
  paragraph: string = ``;
  showFullParagraph: boolean = false;
  liked:boolean=false;
  constructor(
    public popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {
  console.log(this.post)

    this.likeslength=this.getLikeCount();
   this.paragraph=this.post.caption;
  }

  toggleParagraph() {
    this.showFullParagraph = !this.showFullParagraph;
  }

  getDisplayedParagraph(): string {
    return this.showFullParagraph ? this.paragraph : this.paragraph.slice(0, 60) ;
  }

  getToggleLabel(): string {
    return this.showFullParagraph ? 'Read less' : 'Read more';
  }
  getLikeCount(): number {

    return Object.values(this.post.likes).filter((liked) => liked).length;
  }
  formatTimeDifference(date: string): string {
    const parsedDate = new Date(date);
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  }
  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
        component: SettingMenuComponent,
        event: ev,
        animated: true,
        showBackdrop: true,
        //cssClass:'popover'
      });

    return await popover.present();
  }
  like(){
    this.liked=!this.liked;
  }
}
