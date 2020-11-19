import {Component, Input, OnInit, AfterViewInit, Output, EventEmitter} from '@angular/core';
import axios from 'axios';

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
  chosenComments = [];
  @Output() pageChanged: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.reviewsToDisplay = this.paginate(this.userReviews, 6, 0);
  }

  prepareData(): void {
  }

  klik(ev): void {
    console.log('klik');
    console.log(ev.pageIndex);
    this.pageChanged.emit(null);
    this.reviewsToDisplay = this.paginate(this.userReviews, 6, ev.pageIndex);
  }

  paginate(array, pageSize, pageNumber): any {
    return array.slice((pageNumber) * pageSize, (pageNumber + 1) * pageSize);
  }

  reviewAdded(event): any {
    console.log('add');
    this.addReviewToArray(event.reviewID, event.content);
  }

  reviewDeleted(event): any {
    console.log('delete');
    console.log(event.content);
    this.deleteReviewFromArray(event.reviewID, event.content);
  }

  addReviewToArray(reviewID, reviewContent): void {
    console.log(reviewID);
    this.chosenComments.push({id: reviewID, content: reviewContent});
  }

  deleteReviewFromArray(reviewID, reviewContent): void {
    console.log(reviewID);
    for (let i = 0; i < this.chosenComments.length; i++) {
      if (this.chosenComments[i].id === reviewID) {
        this.chosenComments.splice(i, 1);
      }
    }
  }

  sendArrayWithReviews(): any {
    axios.post('http://127.0.0.1:5000/getReviews', {
      recenzje: this.chosenComments
    }).then(response => {
      console.log(response.status);
    });
  }
}
