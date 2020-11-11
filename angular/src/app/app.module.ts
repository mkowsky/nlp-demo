import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import {Test1Component} from './components/test1/test1.component';
import {AppRoutingModule} from './app-routing.module';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import {AuthGuardService} from './services/auth-guard.service';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {AuthService} from './services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegisterComponent } from './views/register/register.component';
import { HeaderComponent } from './components/header/header.component';




@NgModule({
  declarations: [
    AppComponent,
    Test1Component,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    })],
  providers: [AuthService, AuthGuardService, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
