// @ts-ignore
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Test1Component} from './components/test1/test1.component';
import {LoginComponent} from './views/login/login.component';
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';
import {HomeComponent} from './views/home/home.component';
import {RegisterComponent} from './views/register/register.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'test1', component: Test1Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
