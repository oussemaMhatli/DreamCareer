import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SettingMenuComponent } from '../setting-menu/setting-menu.component';
import { UserService } from 'src/app/services/user.service';
import { UserProfile } from 'src/app/models/UserProfile';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
    id:any;
    token:any;
    user:UserProfile=new UserProfile()

  constructor(public popoverCtrl: PopoverController,private userService:UserService) { }
  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
        component: SettingMenuComponent,
        event: ev,
        animated: true,
        showBackdrop: true
    });
    return await popover.present();
  }
  ngOnInit() {
    this.id=localStorage.getItem("id");
    //const decodedToken = jwt_decode(this.token);
    this.token=localStorage.getItem("user")

    this.userService.getUser(this.id,this.token).subscribe(res=>{
      console.log(res,"t7awalqqqqqt")
   this.user=res;
    })


  }
}
