import { UserPhoto } from "./UserProfile";

export class Post {
  _id!: string;
  username!: string;
  userId!: string;
  location!: string;
  caption!: string;
  postImageUrls!: string[]; // You can define a more specific type if needed
  userProfilePhoto!: UserPhoto[]; // You can define a more specific type if needed
  likes!: any[]; // You can define a more specific type if needed
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
