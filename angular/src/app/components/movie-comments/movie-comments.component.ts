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

  klik(ev) {
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

  sendArrayWithReviews(): any {
    //@TODO: flask url
    axios.post('http://localhost:8100/flask/multiple-reviews', {
      reviews: this.chosenComments
    }).then(response => {
      console.log(response.data);
    });

    // axios.get('https://imdb8.p.rapidapi.com/title/get-user-reviews', {
    //   params: {
    //     tconst: movieID,
    //     paginationKey: 'g4wp7cbpry3tozal7gthtnbtrhq42bj6y4hhzo5ziwr26fbyhvrl4ty4ouzfrmbccrx5dtrbr5cwmfl3elkdljwlty2dlbmj'
    //   },
    //   headers: {
    //     'x-rapidapi-key': '6e6bf0e8e9msh48f791fb8c37620p10a217jsnca7a9c0f7eea',
    //     'x-rapidapi-host': 'imdb8.p.rapidapi.com'
    //   }

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
}
