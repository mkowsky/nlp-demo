import {Component, Input, OnInit} from '@angular/core';
import axios from 'axios';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.scss']
})
export class MovieRatingComponent implements OnInit {

  constructor(private router: Router, private Activatedroute: ActivatedRoute) {
  }

  arrayWithRobotComments = [
    'PERFECT EXAMPLE OF HOW NOT TO MAKE MOVIES',
    'ACTUALLY DISGUSTING',
    'GOOD IF YOU WANT TO WASTE YOUR TIME',
    'JUST OKAY',
    'OKAY FOR LONELY AUTUMN EVENINGS',
    'STRAIGHT FIRE! - NOT SO STRAIGHT AND NOT SO FIRE',
    'BREATHTAKING!',
    'MAGNIFICENT!',
    'ACTUAL MASTERPIECE!',
    'SHOULD BE CONSIDERED AS WORLD WONDER',
  ];
  arrayWithComments = [];
  paginationKey = [];
  robotComment = ''
  movieID = '';
  counter = 0;
  isLoadingData = false;
  ratingDone = false;
  howManyReviews = 0;
  modelRating = 0;
  arrayToSend = [];
  reviewsWithSameRating = '';
  ngOnInit(): void {
    //this.firstRequest(this.Activatedroute.snapshot.paramMap.get('id'));
  }

  goNext(movieID): void {
    if (this.counter < 2) {
      this.getMovieReviews(movieID);
    } else {

      this.sendArray();
    }
  }

  firstRequest(movieID): void {
    axios.get('https://imdb8.p.rapidapi.com/title/get-user-reviews', {
      params: {
        tconst: movieID,
      },
      headers: {
        'x-rapidapi-key': '6e6bf0e8e9msh48f791fb8c37620p10a217jsnca7a9c0f7eea',
        'x-rapidapi-host': 'imdb8.p.rapidapi.com'
      }
    }).then(response => {
      this.paginationKey = response.data.paginationKey;
      console.log(this.paginationKey);
      console.log(response.data);
      for (let i = 0; i < response.data.reviews.length; i++) {
        this.arrayWithComments.push({reviewText: response.data.reviews[i].reviewText, authorRating: response.data.reviews[i].authorRating});
        this.arrayToSend.push(response.data.reviews[i].reviewText);
      }
      this.goNext(movieID);
    });
  }

  getMovieReviews(movieID): void {
    axios.get('https://imdb8.p.rapidapi.com/title/get-user-reviews', {
      params: {
        tconst: movieID,
        paginationKey: this.paginationKey
      },
      headers: {
        'x-rapidapi-key': 'b71f8eca75msha01633654eaf739p1065a5jsnba882ff4d7d0',
        'x-rapidapi-host': 'imdb8.p.rapidapi.com'
      }
    }).then(response => {
      console.log(response.status);
      this.paginationKey = response.data.paginationKey;
      for (let i = 0; i < response.data.reviews.length; i++) {
        this.arrayWithComments.push({reviewText: response.data.reviews[i].reviewText, authorRating: response.data.reviews[i].authorRating});
        this.arrayToSend.push(response.data.reviews[i].reviewText);
      }
      this.counter++;
      this.goNext(movieID);
    });
  }

  listComments(): void {
    console.log(this.arrayWithComments);
  }

  startMovieRating(): void {
    this.isLoadingData = true;
    this.firstRequest(this.Activatedroute.snapshot.paramMap.get('id'));
  }

  sendArray(): void {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:8100/flask/movie-rating', {
      reviews: this.arrayToSend,
      jwt: token
    }).then(response => {
      console.log(response.data);
      this.modelRating = Math.ceil(response.data);
      this.lookForReviewsWithSameRating(this.modelRating);
    });
  }

  lookForReviewsWithSameRating(value): void {
    this.arrayWithComments.forEach(review => {
      if (review.authorRating === Math.ceil(value)) {
        this.reviewsWithSameRating = review.reviewText;
      }
    });
    this.robotComment = this.arrayWithRobotComments[Math.ceil(value)-1];
    console.log(this.reviewsWithSameRating);
    this.ratingDone = true;
  }
}
