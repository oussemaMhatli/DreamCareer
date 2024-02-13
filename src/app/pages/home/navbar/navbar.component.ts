import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IonContent, IonReorderGroup, ItemReorderEventDetail, ModalController, NavController, PopoverController } from '@ionic/angular';
import { UserProfile } from 'src/app/models/UserProfile';
import { UserService } from 'src/app/services/user.service';
import { SettingMenuComponent } from '../setting-menu/setting-menu.component';
import {
  CdkDragDrop,
  moveItemInArray,

} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { SearchEventService } from 'src/app/services/Events/search-event.service';
import { Keyboard } from '@capacitor/keyboard';
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
    const iconSearchElement: HTMLElement = this.iconSearchRef.nativeElement;

    // Now you can manipulate the element as needed
  }


  id:any;
    token:any;
    user:UserProfile=new UserProfile()
  open:boolean=true
  private searchInputEventListener!: EventListener;

  constructor(public popoverCtrl: PopoverController,
    private modalController: ModalController,
    private userService:UserService,
    public renderer: Renderer2,
    public zone: NgZone,
    public navCtrl: NavController,
    private cdr: ChangeDetectorRef,
    private router:Router,
    private searchInputService: SearchEventService,
    ) { }

  ngOnInit() {


  }

  async openUpdateModal() {
    this.open=!this.open

    if(this.open==false){
      const modal = await this.modalController.create({
        component:MenuComponent ,


      });
      modal.style.position = 'fixed';
      modal.style.bottom = '0';
      modal.style.left = '0';
      modal.style.right = '0';
      modal.style.top = 'auto';
      modal.style.height = '86%';


      return await modal.present();
    }else{
this.closeModal()
    }

  }
  closeModal() {
    this.modalController.dismiss();
  }
  timePeriods = [
    '',
    'assets/img/menu-icon-animation.png',
    '',

  ];

  drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
      const searchInputElement: HTMLInputElement = this.searchBarRef.nativeElement.querySelector('input');
      searchInputElement.removeEventListener('input', this.handleInputChange);
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
        const searchInputElement: HTMLInputElement = this.searchBarRef.nativeElement.querySelector('input');
        searchInputElement.addEventListener('input', this.handleInputChange);

      }

  }
  goHome(){
    this.router.navigate(['home/posts'])

  }
  handleInputChange = (event: Event) => {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchInputService.updateSearchInput(inputValue);


  };

}
