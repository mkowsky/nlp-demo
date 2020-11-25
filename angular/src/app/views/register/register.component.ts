import {Component, OnInit, AfterViewInit} from '@angular/core';
import {SlideInOutAnimation} from '../../utility/animations';
import {faKey} from '@fortawesome/free-solid-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {faMailBulk} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [SlideInOutAnimation],
})
export class RegisterComponent implements OnInit {
  animationState = 'out';
  email = '';
  repeatPassword = '';
  password = '';

  repeatPasswordError = '';
  emailError = '';
  passwordError = '';

  signUpButtonDisabled = true;
  allFieldsFilled = false;

  key = faKey;
  faLock = faLock;
  mail = faMailBulk;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (this.animationState === 'out') {
      setTimeout(() => this.animationState = 'in');
    }
  }

  public valueHasChanged(): boolean {
    // if (this.username === '') this.usernameError = '';
    // if (this.password === '') this.usernameError = '';
    this.emailError = '';
    this.repeatPasswordError = '';
    this.passwordError = '';

    if ((this.email) && (this.password) && (this.repeatPassword)) {
      this.signUpButtonDisabled = false;
      this.allFieldsFilled = true;
    } else {
      this.signUpButtonDisabled = true;
      this.allFieldsFilled = false;
    }
    return this.signUpButtonDisabled;

  }


  public toggleShowDiv(divName: string) {
    if (divName === 'session') {
      console.log(this.animationState);
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      console.log(this.animationState);
      setTimeout(() => this.router.navigateByUrl('/login'), 500); // 2500 is millisecond
    }
  }

  public startRegisterProcess(): void {
    if (this.password !== this.repeatPassword) {
      console.log('hasla sa niejednakowe');
    } else {
      this.registerNewUser();
    }
  }

  public registerNewUser(): void {
    axios.post('http://localhost:8100/users/register', {
      email: this.email,
      password: this.password,
    }).then(response => {
      this.router.navigateByUrl('/login');
    }).catch(error => {
      console.log(error.response.data);
      if (error.response.data.includes('username')) {
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
}




