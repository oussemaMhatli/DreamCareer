import { UserPhoto } from "./UserProfile";

export class Post {
  _id!: string;
  username!: string;
  userId!: string;
  location!: string;
  caption!: string;
  postImageUrls!:any [];
  userProfilePhoto!: UserPhoto[];
  likes!: any[];
  commentCount!: number;
  createdAt!: string;
  updatedAt!: string;
  __v!: number;

  getLikeCount(): number {
    return this.likes ? Object.values(this.likes).filter((liked) => liked).length : 0;
  }
}

export class PostResponse {
  posts!: Post[];
  hasMore!: boolean;


}
export class Likes {
  [username: string]: boolean;
}
export class PostImage {
  url!: string;
  filename!: string;



}
