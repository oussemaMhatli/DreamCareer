import { UserPhoto } from "./UserProfile";

export class Coment {
  commentBody!: string;
  createdAt!: string; // Assuming the date is represented as a string
  postId!: string;
  updatedAt!: string; // Assuming the date is represented as a string
  userId!: string;
  userProfilePhoto!: UserPhoto[]; // Assuming userProfilePhoto is an array of strings
  username!: string;
  __v!: number;
  _id!: string;
};
export class ComentBody{

    userId!: string;
    username!: string;
    postId!: string;
    userProfilePhoto!:UserPhoto[];
    commentBody!:string;

}



