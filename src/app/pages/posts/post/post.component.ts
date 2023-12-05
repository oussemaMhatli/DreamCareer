import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Posts';
import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent  implements OnInit {
  @Input() post!: Post;
  likeslength!:number;
  constructor() { }

  ngOnInit() {


    this.likeslength=this.getLikeCount();
  }
  getLikeCount(): number {

    return Object.values(this.post.likes).filter((liked) => liked).length;
  }
  formatTimeDifference(date: string): string {
    const parsedDate = new Date(date);
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  }
}
