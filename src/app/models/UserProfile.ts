export class UserProfile {
  createdAt!: string;
  email!: string;
  followerCount!: number;
  followers!: any[]; // You can define a more specific type if needed
  followingCount!: number;
  followings!: any[]; // You can define a more specific type if needed
  id!: string;
  impressions!: number;
  location!: string;
  occupation!: string;
  profilePhotoUrl!: string[]; // You can define a more specific type if needed
  updatedAt!: string;
  username!: string;
  viewedProfile!: number;
  __v!: number;
  _id!: string;


}
export class UserPhoto {
  _id!: string;
  url!: string;
  filename!: string;



}
