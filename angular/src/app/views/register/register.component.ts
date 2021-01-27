import {Component, OnInit, AfterViewInit} from '@angular/core';
import {SlideInOutAnimation} from '../../utility/animations';
import {faKey} from '@fortawesome/free-solid-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {faMailBulk} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [SlideInOutAnimation],
})
export class RegisterComponent implements OnInit {
  registerSucceed = false;
  isLoading = false;
  animationState = 'out';
  email = '';
  repeatPassword = '';
  password = '';

  repeatPasswordError = '';
  emailError = '';
  passwordError = '';
  pin = '';
  signUpButtonDisabled = true;
  allFieldsFilled = false;
  codeError = 'Code is invalid.';
  key = faKey;
  faLock = faLock;
  mail = faMailBulk;
  userEmails = new FormGroup({
    primaryEmail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [
      Validators.required,
    ]),
    passwordRepeat: new FormControl('', [
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

  public valueHasChanged(): boolean {
    // if (this.email === '') this.emailError = '';
    // if (this.password === '') this.emailError = '';
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
    this.isLoading = true;
    axios.post('http://localhost:8100/users/register', {
      email: this.email,
      password: this.password,
    }).then(response => {
      this.registerSucceed = true;
      this.isLoading = false;
    }).catch(error => {
      console.log(error.response.data);
      if (error.response.data.includes('Email')) {
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
  confirmButtonDisabled(): boolean{
    if(this.pin.length == 5) return false;
    else return true;
  }
  confirmRegistration(): void{
    axios.post('http://localhost:8100/users/confirm-registration', {
      token: this.pin,
    }).then(response => {
      console.log(response.data);
      if(response.data.includes('successful')) this.router.navigateByUrl('/login');
      else this.codeError = response.data;
    });

  }
}




