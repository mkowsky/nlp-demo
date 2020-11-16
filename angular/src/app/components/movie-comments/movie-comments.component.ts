import {Component, Input, OnInit, AfterViewInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-movie-comments',
  templateUrl: './movie-comments.component.html',
  styleUrls: ['./movie-comments.component.scss']
})
export class MovieCommentsComponent implements OnInit {

  constructor() {
  }

  @Input() userReviews: [];
  reviewsToDisplay = [];
  @Output() pageChanged: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.reviewsToDisplay =  this.paginate(this.userReviews, 6, 0);
  }

  prepareData(): void {
  }
  klik(ev){
    console.log('klik');
    console.log(ev.pageIndex);
    this.pageChanged.emit(null);
    this.reviewsToDisplay =  this.paginate(this.userReviews, 6, ev.pageIndex);
  }

  paginate(array, pageSize, pageNumber): any {
    return array.slice((pageNumber) * pageSize, (pageNumber + 1) *  pageSize);
  }
}
