export class User
{
   email!:string;
   password!:string;
   location!:string;
   occupation!:string;
   username!:string;

   public register(email:string,password:string,location:string,occupation:string,username:string){
    this.email=email;
    this.password=password;
    this.occupation=occupation;
    this.location=location;
    this.username=username

   }
}


