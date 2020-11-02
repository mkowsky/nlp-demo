// @ts-ignore
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Test1Component} from './components/test1/test1.component';
import {LoginComponent} from './views/login/login.component';
import {AuthGuard} from './utility/app.guard';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'test1', component: Test1Component, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
