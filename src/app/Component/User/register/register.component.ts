import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
registerInput: User = new User;

loading = false;
registerForm!: FormGroup;
submitted = false;

 constructor(private router: Router,
  private navCtr: NavController ,private formbuilder:FormBuilder,
   public loadingCtrl : LoadingController,
    private alertCtrl: AlertController,
   private service:UserService,
   private toastController: ToastController,

   ){
}
  ngOnInit() {
    this.registerForm = this.formbuilder.group({
      occupation: new FormControl('', Validators.compose([
         Validators.required
      ])),

      location: new FormControl('', Validators.compose([
        Validators.required
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{4,}$/)
      ]))

    })

    }






  login(){
    this.router.navigate(['login']);
  }
  signup() {
    this.submitted = true;
 if (this.registerForm.valid) {
  this.loading = true;

  this.registerInput.register(this.registerForm.value.email,this.registerForm.value.password,this.registerForm.value.location,this.registerForm.value.occupation,this.registerForm.value.username)
  console.log('ff',this.registerInput)

  this.loading = true;
this.service.register(this.registerInput).subscribe( async (res:any)=>{
  //console.log("res",res)
  console.log("res",res)
  localStorage.setItem("user",res.token)
  localStorage.setItem("id",res.newUser.id)
  localStorage.setItem("username",res.newUser.username)

  await this.showToasts("successful created",'success')
  this.router.navigate(["home"])

}, async (error:any)=>{
  console.log("error",error)
  this.loading = false;
  await this.showToasts(error.error.errorMsg
    ,'danger')

})

}
  }
  async showToasts(msg:string,color:string) {
    const toast = await this.toastController.create({
        message: msg,
        duration: 3000,
        color: color,

    });
    toast.present();
  }
}
