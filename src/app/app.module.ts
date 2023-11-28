import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { ScrollService } from './services/scroll.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
     ToastrModule.forRoot(),
     BrowserAnimationsModule,
     HomePageModule

],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy
  ,    
}],
  bootstrap: [AppComponent],
})
export class AppModule {}
