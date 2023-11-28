import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  accountPages = [
    {
       title: 'Log In',
       url: '/auth/login',
       ionicIcon: 'log-in-outline'
    },
    {
       title: 'Sign Up',
       url: '/auth/signup',
       ionicIcon: 'person-add-outline'
    }
  ]
  constructor() { }

  ngOnInit() {}

}
