export class Login
{
   username!:string;
   password!:string;
   public login(username:string,password:string){
    this.username=username;
    this.password=password;
   }
}
