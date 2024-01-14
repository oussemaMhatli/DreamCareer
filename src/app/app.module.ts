import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Component/User/login/login.component';
import { RegisterComponent } from './Component/User/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageModule } from './pages/home/home.module';
import { WelcomeComponent } from './Component/welcome/welcome.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { WelcomPageComponent } from './Component/User/welcom-page/welcom-page.component';
import { LeadboardPageModule } from './pages/leadboard/leadboard.module';
import { MessagesPageModule } from './pages/messages/messages.module';
import { ComentSettingComponent } from './Component/settings/coment-setting/coment-setting.component';

import * as Hammer from 'hammerjs';
import { HammerGestureConfig } from '@angular/platform-browser';
import { UppercaseFirstPipe } from './pipes/uppercase-first.pipe';
import { CsComponent } from './pages/messages/cs/cs.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from './services/messages/socket.service';
import { SocketConfigService } from './services/messages/socket-config.service';

export class MyHammerConfig extends HammerGestureConfig {
  override overrides = {
    swipe: { direction: Hammer.DIRECTION_DOWN }
  };
}
const config: SocketIoConfig = { url: 'wss://dreamcareer.onrender.com', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    WelcomPageComponent,
    ComentSettingComponent,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(
      ),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
     ToastrModule.forRoot(),
     BrowserAnimationsModule,
     HomePageModule,
     IonicStorageModule.forRoot(),
     LeadboardPageModule,
     MessagesPageModule,
      HammerModule,


],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy
  ,

},
{ provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig }

],
  bootstrap: [AppComponent],
})
export class AppModule {}
