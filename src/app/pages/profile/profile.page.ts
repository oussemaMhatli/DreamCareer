import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Post, PostResponse } from 'src/app/models/Posts';
import { UserProfile } from 'src/app/models/UserProfile';
import { CommentEventService } from 'src/app/services/comment-event-service.service';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  pagenumber: number = 1;

  isFileHidden: boolean = true;

  id: any;
  token: any;
  user: UserProfile = new UserProfile();
  posts!: Post[];
  postResponse: PostResponse = new PostResponse();
  postCaption!:string
  username:any
  constructor(
    private userService: UserService,
    private postService: PostsService,
    private commentEventService: CommentEventService,
    private router: ActivatedRoute,
    private loadingController: LoadingController

  ) {}
  ngOnInit() {
    this.presentLoading()
    this.id = localStorage.getItem('id');
    this.token = localStorage.getItem('user');
    this.username=this.router.snapshot.paramMap.get('username');

this.getUser()
    this.commentEventService.refreshEvent$.subscribe(() => {
      this.getAllPosts();
    });
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      // Other options if needed
    });

    await loading.present();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }
  getUser(){
    this.userService.getUserByUsernameOrId(this.username, this.token).subscribe(
      (res) => {
        this.user = res;
        console.log('resUserachref',this.user)
        this.getAllPosts();
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  getAllPosts() {
    this.userService.getUserPosts(this.username,this.token, this.pagenumber).subscribe((res) => {
      console.log(res, 'posts');
      this.postResponse = res;
      this.posts = this.postResponse.posts;
      this.dismissLoading()
    });
  }

  showFileInput() {
    //this.fileInput.nativeElement.click();
    this.isFileHidden = !this.isFileHidden;
    console.log(this.isFileHidden);
  }

  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        console.log('File name:', file.name);
        console.log('File type:', file.type);
        console.log('File:', file);
      }
    }
  }

  loadMoreData(event: any) {
    // Increment the page number for the next set of posts
    this.pagenumber++;

    // Fetch additional posts and append them to the existing posts
    this.userService.getUserPosts(this.username,this.token, this.pagenumber).subscribe(
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
  addPost(){}
}
