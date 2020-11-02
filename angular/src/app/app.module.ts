import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';



import { AppComponent } from './app.component';
import {Test1Component} from './components/test1/test1.component';
import {AppRoutingModule} from './app-routing.module';
import { LoginComponent } from './views/login/login.component';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {initializeKeycloak} from './utility/app.init';



@NgModule({
  declarations: [
    AppComponent,
    Test1Component,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
