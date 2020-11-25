import {Component, OnInit} from '@angular/core';
import axios from 'axios';
import {Router} from '@angular/router';
import {faMailBulk} from '@fortawesome/free-solid-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {SlideInOutAnimation} from '../../utility/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [SlideInOutAnimation],

})
export class LoginComponent implements OnInit {
  visible = true;
  username = '';
  password = '';
  loginButtonDisabled = true;
  allFieldsFilled = false;
  appUser = null;
  mail = faMailBulk;
  faLock = faLock;
  passwordError = '';
  usernameError = '';
  animationState = 'out';


  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (this.animationState === 'out') {
      setTimeout(() => this.animationState = 'in');
    }
  }

  public toggleShowDiv(divName: string) {
    if (divName === 'session') {
      console.log(this.animationState);
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      console.log(this.animationState);
      setTimeout(() => this.router.navigateByUrl('/register'),500); // 2500 is millisecond
    }

  }

  public testQuarkusRESTAPI(): void {
    axios.post('http://localhost:8100/users/login-test', {
      login: this.username,
      password: this.password,
    }).then(response => {
      this.appUser = response.data;
      this.handleLogin();
    }).catch(error => {
      console.log(error.response.data);
      if (error.response.data.includes('username')) {
        this.usernameError = error.response.data;
      } else {
        this.usernameError = '';
      }

      if (error.response.data.includes('password')) {
        this.passwordError = error.response.data;
      } else {
        this.passwordError = '';
      }
    });

  }


  public valueHasChanged(): boolean {
    // if (this.username === '') this.usernameError = '';
    // if (this.password === '') this.usernameError = '';
    this.usernameError = '';
    this.passwordError = '';

    if ((this.username) && (this.password)) {
      this.loginButtonDisabled = false;
      this.allFieldsFilled = true;
    } else {
      this.loginButtonDisabled = true;
      this.allFieldsFilled = false;
    }
    return this.loginButtonDisabled;

  }

  public handleLogin(): void {
    console.log(this.appUser.token);
    localStorage.setItem('token', this.appUser.token);
    this.router.navigateByUrl('/home');
  }
}
