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

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';

import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import { MovieComponent } from './views/movie/movie.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SingleReviewComponent } from './views/single-review/single-review.component';
import { MultipleReviewsComponent } from './views/multiple-reviews/multiple-reviews.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { StatsComponent } from './views/stats/stats.component';
import { MovieRatingComponent } from './views/movie-rating/movie-rating.component';
import { AboutComponent } from './views/about/about.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './views/test/test.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MovieDetailsComponent,
    MovieComponent,
    LoaderComponent,
    SingleReviewComponent,
    MultipleReviewsComponent,
    StatsComponent,
    MovieRatingComponent,
    AboutComponent,
    TestComponent,

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
    MatCheckboxModule,
    MatRadioModule,
    ReactiveFormsModule,




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
