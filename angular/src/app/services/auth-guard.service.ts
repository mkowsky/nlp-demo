// @ts-ignore
import {Injectable} from '@angular/core';
// @ts-ignore
import {Router, CanActivate, ActivatedRoute} from '@angular/router';
// @ts-ignore
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, public route: ActivatedRoute) {

  }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      console.log('ine mozna');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }


}
