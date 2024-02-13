import { Component, ElementRef, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';
import { LoadingController, ToastController } from '@ionic/angular';
import { Post, PostResponse } from 'src/app/models/Posts';
import { UserProfile } from 'src/app/models/UserProfile';
import { CommentEventService } from 'src/app/services/Events/comment-event-service.service';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  pagenumber: number = 1;
Search:string=""
  isFileHidden: boolean = true;
  @ViewChild('addPostCard', { static: true }) addPostCard!: ElementRef;

  id: any;
  token: any;
  user: UserProfile = new UserProfile();
  posts: Post[]=[];
  postResponse: PostResponse = new PostResponse();
  postCaption!:string


  constructor(
    private userService: UserService,
    private postService: PostsService,
    private commentEventService: CommentEventService,
    private loadingController: LoadingController,
    private router:Router,
    private toastController: ToastController,

  ) {


  }





  async showToasts(msg:string,color:string) {
    const toast = await this.toastController.create({
        message: msg,
        duration: 3000,
        color: color,

    });
    toast.present();
  }
  ngOnInit() {

this.reload()
  }
  reload(){
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
     this.presentLoading();
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
  getAllPosts() {
    this.postService.getPosts(this.token, this.pagenumber).subscribe((res) => {
      this.postResponse = res;
      this.posts = this.postResponse.posts;
      this.dismissLoading()
    });
  }

  showFileInput() {
    //this.fileInput.nativeElement.click();
    this.isFileHidden = !this.isFileHidden;
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
  addPost(){}
  @HostListener('pandown', ['$event'])
  async onPan(event: any): Promise<void> {
    await this.onPanDown();
    this.reloadComponent()
  }
  reloadComponent() {
    window.location.reload()
  }
  showSpinner = false;

 async onPanDown() {
    // Handle pan down event
    this.showSpinner = true;
    // Simulate some asynchronous task
    await this.delay(2000); // Example: Wait for 2 seconds

  }
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
