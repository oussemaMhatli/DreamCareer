import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Login } from 'src/app/models/login';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  loginInput: Login = new Login;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private toastController: ToastController,
    private router:Router,
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{4,}$/)]],
    });

  }


  loading = false;
  loginError = false;

  async login() {

    this.submitted = true;

    if (this.loginForm.valid) {

      this.loading = true;
    this.loginInput.login(this.loginForm.value.username, this.loginForm.value.password)
    console.log(this.loginInput, "avyero")
    this.userService.login(this.loginInput).subscribe( async (res:any)=>{
      console.log("res",res)
      localStorage.setItem("user",res.token)
      localStorage.setItem("id",res.user.id)
      localStorage.setItem("username",res.user.username)


      await this.showToasts("Login successful",'success')
      this.router.navigate(["home/posts"])

    }, async (error:any)=>{
      console.log("error",error)
      this.loading = false;
      await this.showToasts(error.error.message,'danger')

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
  register(){
    this.router.navigate(["signup"])
  }
}
