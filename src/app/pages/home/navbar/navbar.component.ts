import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IonContent, IonReorderGroup, ItemReorderEventDetail, NavController, PopoverController } from '@ionic/angular';
import { UserProfile } from 'src/app/models/UserProfile';
import { UserService } from 'src/app/services/user.service';
import { SettingMenuComponent } from '../setting-menu/setting-menu.component';
import {
  CdkDragDrop,
  moveItemInArray,

} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],

})
export class NavbarComponent implements OnInit {

  @ViewChild('searchContainer', { static: false }) searchContainerRef!: ElementRef;
  @ViewChild('iconSearch', { static: false, read: ElementRef }) iconSearchRef!: ElementRef;
  @ViewChild('SearchBar', { static: false, read: ElementRef }) searchBarRef!: ElementRef;

  ngAfterViewInit() {
    // Access the nativeElement of the ViewChild
    const searchContainerElement: HTMLElement = this.searchContainerRef.nativeElement;

    // Now you can manipulate the element as needed
    console.log(searchContainerElement);
    const iconSearchElement: HTMLElement = this.iconSearchRef.nativeElement;

    // Now you can manipulate the element as needed
    console.log(this.searchBarRef.nativeElement ,"ionic");
  }


  id:any;
    token:any;
    user:UserProfile=new UserProfile()

  constructor(public popoverCtrl: PopoverController,
    private userService:UserService,
    public renderer: Renderer2,
    public zone: NgZone,
    public navCtrl: NavController,
    private cdr: ChangeDetectorRef,
    private router:Router
    ) { }

  ngOnInit() {


  }
  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
        component: SettingMenuComponent,
        event: ev,
        animated: true,
        showBackdrop: true,
        //cssClass:'popover'
      });

    return await popover.present();
  }
  timePeriods = [
    '',
    'assets/img/menu-icon-animation.png',
    '',

  ];

  drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
      console.log("fff",event.currentIndex)

      if(event.currentIndex==0){
        this.router.navigate(['home/leadbord'])

        this.renderer.removeAttribute(this.searchContainerRef.nativeElement, 'class');

        this.renderer.addClass(this.searchContainerRef.nativeElement, 'search-container-left');

        this.renderer.removeClass(this.iconSearchRef.nativeElement, 'custom-icon-center');

        this.renderer.addClass(this.iconSearchRef.nativeElement, 'custom-icon');
        this.renderer.removeClass(this.searchBarRef.nativeElement, 'custom-searchbar');

        this.renderer.addClass(this.searchBarRef.nativeElement, 'custom-searchbar-side');


    }
      else if(event.currentIndex==1){
        this.router.navigate(['home/posts'])
        //this.renderer.setAttribute(this.searchContainerRef.nativeElement, 'class', 'hidden');
        this.renderer.removeAttribute(this.searchContainerRef.nativeElement, 'class');

        this.renderer.addClass(this.searchContainerRef.nativeElement, 'search-container-center');


      }else if(event.currentIndex==2){
        this.router.navigate(['home/msg'])
        this.renderer.removeAttribute(this.searchContainerRef.nativeElement, 'class');

        this.renderer.addClass(this.searchContainerRef.nativeElement, 'search-container-right');
        this.renderer.removeClass(this.iconSearchRef.nativeElement, 'custom-icon-center');

        this.renderer.addClass(this.iconSearchRef.nativeElement, 'custom-icon');
        this.renderer.removeClass(this.searchBarRef.nativeElement, 'custom-searchbar');

        this.renderer.addClass(this.searchBarRef.nativeElement, 'custom-searchbar-side');

      }

  }



}
