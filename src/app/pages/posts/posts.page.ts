import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Post, PostResponse } from 'src/app/models/Posts';
import { UserProfile } from 'src/app/models/UserProfile';
import { CommentEventService } from 'src/app/services/comment-event-service.service';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  pagenumber: number = 1;

  isFileHidden: boolean = true;

  id: any;
  token: any;
  user: UserProfile = new UserProfile();
  posts!: Post[];
  postResponse: PostResponse = new PostResponse();

  constructor(
    private userService: UserService,
    private postService: PostsService,
    private commentEventService: CommentEventService
  ) {}
  ngOnInit() {
    this.id = localStorage.getItem('id');
    this.token = localStorage.getItem('user');

    this.userService.getUser(this.id, this.token).subscribe(
      (res) => {
        this.user = res;

        this.getAllPosts();
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
    this.commentEventService.refreshEvent$.subscribe(() => {
      this.getAllPosts();
    });
  }

  getAllPosts() {
    console.log(this.user.username, 'hhhhhh', this.token);
    this.postService.getPosts(this.token, this.pagenumber).subscribe((res) => {
      console.log(res, 'posts');
      this.postResponse = res;
      this.posts = this.postResponse.posts;
    });
  }

  showFileInput() {
    //this.fileInput.nativeElement.click();
    this.isFileHidden = !this.isFileHidden;
    console.log(this.isFileHidden);
  }

  handleFileInput(event: any) {
    // Handle the file input change event if needed
    const files = event.target.files;
    console.log(files);
  }
  loadMoreData(event: any) {
    // Increment the page number for the next set of posts
    this.pagenumber++;

    // Fetch additional posts and append them to the existing posts
    this.postService.getPosts(this.token, this.pagenumber).subscribe(
      (morePosts) => {
        // Append the new posts to the existing posts array
        this.posts = this.posts.concat(morePosts.posts);
        event.target.complete(); // Notify the infinite scroll that we have finished loading more data
      },
      (error) => {
        console.error('Error fetching more data:', error);
        event.target.complete(); // In case of an error, still complete the infinite scroll to avoid it getting stuck
      }
    );
  }
}
