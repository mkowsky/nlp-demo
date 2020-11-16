import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input() reviewContent: string;
  @Input() reviewTitle: string;
  @Input() reviewRating: number;
  @Input() reviewID: number;
  @Output() reviewAdded: EventEmitter<any> = new EventEmitter();
  @Output() reviewDeleted: EventEmitter<any> = new EventEmitter();
  isDeleteNeeded = false;

  constructor() {
  }

  ngOnInit(): void {
  }


  klik(event: any): void {
    document.getElementById(event + 'rev').style.background = 'green';
    this.reviewAdded.emit(event);
    this.isDeleteNeeded = true;
  }

  usun(ev): void {
    document.getElementById(ev + 'rev').style.background = 'transparent';
    this.reviewDeleted.emit(ev);
    this.isDeleteNeeded = false;
  }
}
