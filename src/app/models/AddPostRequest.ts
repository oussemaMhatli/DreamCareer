class AddPostRequest {
  userId: string;
  username: string;
  location: string;
  caption: string;
  userProfilePhoto: string;
  likes: { [key: string]: boolean };
  comments: string[];
  postImageUrls: string[];

  constructor(
    userId: string,
    username: string,
    location: string,
    caption: string,
    userProfilePhoto: string,
    likes: { [key: string]: boolean },
    comments: string[],
    postImageUrls: string[]
  ) {
    this.userId = userId;
    this.username = username;
    this.location = location;
    this.caption = caption;
    this.userProfilePhoto = userProfilePhoto;
    this.likes = likes;
    this.comments = comments;
    this.postImageUrls = postImageUrls;
  }
}

// Example usage:
const addPostRequest = new AddPostRequest(
  "userId123",
  "exampleUser",
  "New York",
  "This is a sample post.",
  "https://example.com/profile.jpg",
  { "likedUserId": true },
  ["Comment 1", "Comment 2"],
  ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
);
