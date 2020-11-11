import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() open: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  logout(): void{
    console.log('xd');
    this.open.emit(null);

  }


}
