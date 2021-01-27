// @ts-ignore
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './views/login/login.component';
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';
import {HomeComponent} from './views/home/home.component';
import {RegisterComponent} from './views/register/register.component';
import {MovieComponent} from './views/movie/movie.component';
import {SingleReviewComponent} from './views/single-review/single-review.component';
import {MultipleReviewsComponent} from './views/multiple-reviews/multiple-reviews.component';
import {MovieRatingComponent} from './views/movie-rating/movie-rating.component';
import {StatsComponent} from './views/stats/stats.component';
import {AboutComponent} from './views/about/about.component';
import {TestComponent} from './views/test/test.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: AboutComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'movie/:id', component: MovieComponent, canActivate: [AuthGuard]},
  {path: 'single-review', component: SingleReviewComponent, canActivate: [AuthGuard]},
  {path: 'multiple-reviews/:id', component: MultipleReviewsComponent, canActivate: [AuthGuard]},
  {path: 'movie-rating/:id', component: MovieRatingComponent, canActivate: [AuthGuard]},
  {path: 'stats', component: StatsComponent, canActivate: [AuthGuard]},
  {path: 'test', component: TestComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
