import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import axios from 'axios';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchValue = '';
  gridVisible = false;
  movies = [];
  flagaRecenzja = true;
  currentMovie = '';
  userReviews = [];
  currentFilmBaseInfo = [];
  isLoading = false;
  searchWrapperVisible = true;
  movieContentVisible = false;
  commentsVisible = false;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faWindowClose = faWindowClose;
  reviewVisible = false;
  chosenComments = [];
  movieDetails = '';


  testContent = 'Home Alone is a familiar movie from childhood. I was surprised how good that still is. I last saw this movie about 15 years ago. Home Alone is still as fun as it was then before unlike some other movies of childhood. A main character is Kevin MacCallister (Culkin) who is a wild boy of a large family. He is accidentally left home when the rest of the family has gone to Paris for the christmas vacation. Two other important characters are Harry (Pesci) and Marv (Stern) who are criminals. The are going to rob valuable goods of houses which are empty during Christmas. They don\'t know Kevin is still at home. Kevin protects home from the burglars while these try to rob his family\'s house too. Movie contains some emotional moments along comedic scenes. Culkin, Pesci and Stern are very good in this movie. I think this is the best Christmas movie I have ever seen. 10/10';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  addReviewToArray(review, identity): void {
    this.chosenComments.push({id: identity, content: review.reviewText});
  }

  deleteReviewFromArray(review, identity): void {
    for (let i = 0; i < this.chosenComments.length; i++) {
      if (this.chosenComments[i].id === identity) {
        this.chosenComments.splice(i, 1);
      }
    }
  }

  showComments(): void {
    this.commentsVisible = !this.commentsVisible;
  }

  showReview(): void {
    console.log('lol');
    this.reviewVisible = !this.reviewVisible;
  }

  logout(): void {
    console.log('xd');
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  getMovieReviews(movieID): void {
    axios.get('https://imdb8.p.rapidapi.com/title/get-user-reviews', {
      params: {
        tconst: movieID,
        paginationKey: 'g4wp7cbpry3tozal7gthtnbtrhq42bj6y4hhzo5ziwr26fbyhvrl4ty4ouzfrmbccrx5dtrbr5cwmfl3elkdljwlty2dlbmj'
      },
      headers: {
        'x-rapidapi-key': '6e6bf0e8e9msh48f791fb8c37620p10a217jsnca7a9c0f7eea',
        'x-rapidapi-host': 'imdb8.p.rapidapi.com'
      }
    }).then(response => {
      //console.log(response);
      this.userReviews = response.data.reviews;
      //this.currentFilmBaseInfo = response.data.base;
      console.log(this.userReviews);
      // console.log(this.currentFilmBaseInfo);
      this.isLoading = false;
      document.getElementById('body').style.opacity = '1';
      this.flagaRecenzja = false;
      this.movieContentVisible = true;
    });
  }

  getMovieDetails(imdbID): void {
    axios.get('https://imdb8.p.rapidapi.com/title/get-overview-details', {
      params: {
        tconst: imdbID,
        currentCountry: 'US'
      },
      headers: {
        'x-rapidapi-key': '6e6bf0e8e9msh48f791fb8c37620p10a217jsnca7a9c0f7eea',
        'x-rapidapi-host': 'imdb8.p.rapidapi.com'
      }
    }).then(response => {
      this.movieDetails = response.data;
      console.log(this.movieDetails);
      this.getMovieReviews(imdbID);
    });
  }

  gridItemClicked(imdbID): void {
    // for (let i = 0; i < this.movies.length; i++) {
    //   if (this.movies[i].imdbID === value) {
    //     this.currentMovie = this.movies[i];
    //     console.log('znalazlem');
    //     console.log(this.currentMovie);
    //   }
    // }
    this.gridVisible = false;
    this.isLoading = true;
    document.getElementById('body').style.opacity = '0.5';
    this.getMovieDetails(imdbID);

  }

  submitRecension(value): void {
    console.log(value);
    axios.post('http://localhost:8100/getReview', {
      params: {
        recenzja: value
      },
    }).then(response => {
      console.log(response.status);
    });
  }

  testRecension() {
    axios.get('http://loclahost:5000/answer').then(response => {
      console.log(response.data);
    });
  }

  testArray(): void {
    for (let i = 0; i < this.chosenComments.length; i++) {
      console.log(this.chosenComments[i].id + ' ' + this.chosenComments[i].content);
    }
  }

  searchForMovie(template): void {
    axios.get('http://www.omdbapi.com/?apikey=1eb2c5f8&s=' + template).then(response => {
      this.movies = response.data.Search;
      this.searchWrapperVisible = false;
      this.gridVisible = true;
    });
  }

  closeGrid(): void {
    this.gridVisible = false;
    this.searchWrapperVisible = true;
  }

}
