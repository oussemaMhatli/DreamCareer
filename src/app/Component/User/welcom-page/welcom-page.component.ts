import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcom-page',
  templateUrl: './welcom-page.component.html',
  styleUrls: ['./welcom-page.component.scss'],
})
export class WelcomPageComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}
login(){
  this.router.navigate(['login'])
}
signup(){
  this.router.navigate(['signup'])

}
}
