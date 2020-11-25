import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';

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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import { ReviewComponent } from './components/review/review.component';

import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import { MovieCommentsComponent } from './components/movie-comments/movie-comments.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    ReviewComponent,
    MovieDetailsComponent,
    MovieCommentsComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    NgbRatingModule,
    MatPaginatorModule,
    MatTabsModule,



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
