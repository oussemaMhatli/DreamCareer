import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { SettingMenuComponent } from '../setting-menu/setting-menu.component';
import { UserService } from 'src/app/services/user.service';
import { UserProfile } from 'src/app/models/UserProfile';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
    id:any;
    token:any;
    user:UserProfile=new UserProfile()
    username:any
  constructor(public popoverCtrl: PopoverController
    ,private userService:UserService
    ,private router:Router,private modalController: ModalController) { }

  ngOnInit() {
    this.id=localStorage.getItem("id");
    //const decodedToken = jwt_decode(this.token);
    this.token=localStorage.getItem("user")
    this.username=localStorage.getItem("username")
    this.userService.getUser(this.id,this.token).subscribe(res=>{
   this.user=res;
    })


  }
  goProfile(){
    this.router.navigate(['home/profile',this.username])
    this.modalController.dismiss();


  }
  goPost(){
    this.router.navigate(['home/posts'])
    this.modalController.dismiss();
  }
}
