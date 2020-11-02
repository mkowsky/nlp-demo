import { Component, OnInit } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit {

  user = '';

  constructor(private keyCloackService: KeycloakService) { }

  ngOnInit(): void {
    this.initializeUserOptions();
  }

  private initializeUserOptions(): void{
    this.user = this.keyCloackService.getUsername();
  }

  logout(): void{
    this.keyCloackService.logout();
  }

}
