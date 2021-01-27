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
  email = '';
  password = '';
  loginButtonDisabled = true;
  allFieldsFilled = false;
  appUser = null;
  mail = faMailBulk;
  faLock = faLock;
  passwordError = '';
  emailError = '';
  animationState = 'out';


  userEmails = new FormGroup({
    primaryEmail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (this.animationState === 'out') {
      setTimeout(() => this.animationState = 'in');
    }
  }

  public testQuarkusRESTAPI(): void {
    console.log('x');
    axios.post('http://localhost:8100/users/login', {
      login: this.email,
      password: this.password,
    }).then(response => {
      this.appUser = response.data;
      this.handleLogin();
    }).catch(error => {
      console.log(error.response.data);
      if (error.response.data.includes('email')) {
        this.emailError = error.response.data;
      } else {
        this.emailError = '';
      }

      if (error.response.data.includes('password')) {
        this.passwordError = error.response.data;
      } else {
        this.passwordError = '';
      }
    });

  }


  public valueHasChanged(): boolean {
    // if (this.email === '') this.emailError = '';
    // if (this.password === '') this.emailError = '';
    this.emailError = '';
    this.passwordError = '';
    console.log(this.email);

    if ((this.email) && (this.password)) {
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
