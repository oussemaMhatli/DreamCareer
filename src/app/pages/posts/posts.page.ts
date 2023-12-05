import { Component, OnInit } from '@angular/core';
import { Post, PostResponse } from 'src/app/models/Posts';
import { UserProfile } from 'src/app/models/UserProfile';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  id:any;
    token:any;
    user:UserProfile=new UserProfile()
    posts!:Post[];
    postResponse:PostResponse=new PostResponse();


  constructor(private userService:UserService,private postService:PostsService) { }
  ngOnInit() {
    this.id = localStorage.getItem("id");
    this.token = localStorage.getItem("user");


    this.userService.getUser(this.id, this.token).subscribe(
      (res) => {
        this.user = res;

        this.getAllPosts();
      },
      (error) => {
        console.error("Error fetching user:", error);
      }
    );
  }

  getAllPosts() {
    console.log(this.user.username,"hhhhhh",this.token)
    this.postService.getPosts(this.token).subscribe(res=>{
      console.log(res,"posts")
      this.postResponse=res;
      this.posts=this.postResponse.posts;
      console.log(this.posts,"aa")
     })  }




}
