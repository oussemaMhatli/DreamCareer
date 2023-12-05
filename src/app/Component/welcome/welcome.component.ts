import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],


})
export class WelcomeComponent  implements OnInit {
  @ViewChild('dataanimateonscroll', { read: ElementRef }) dataAnimateOnScroll!: ElementRef;

  constructor(private animationCtrl: AnimationController,private router:Router) { }

  ngOnInit() {
}
ionViewDidEnter() {
  this.animateOnScroll();
}
animateOnScroll() {

  const element = this.dataAnimateOnScroll.nativeElement;
  const animation = this.animationCtrl.create()
    .addElement(element)
    .duration(1000)
    .iterations(1)
    .fromTo('opacity', 0, 1)
    .fromTo('transform', 'translateX(-50px) rotate(-540deg)', 'translateX(0) rotate(0deg)');

  animation.play().then(() => {
   this.router.navigate(["wl"])
  });


}
}
