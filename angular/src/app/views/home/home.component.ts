import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import axios from 'axios';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  gridVisible = false;
  movies = [];
  flagaRecenzja = true;
  userReviews = [];
  isLoading = false;
  searchWrapperVisible = true;
  movieContentVisible = false;
  faWindowClose = faWindowClose;

  movieDetails = '';


  constructor(private router: Router) {
  }

  ngOnInit(): void {
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
        'x-rapidapi-key': 'b71f8eca75msha01633654eaf739p1065a5jsnba882ff4d7d0',
        'x-rapidapi-host': 'imdb8.p.rapidapi.com'
      }
    }).then(response => {
      // console.log(response);
      this.userReviews = response.data.reviews;
      // this.currentFilmBaseInfo = response.data.base;
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
        'x-rapidapi-key': 'b71f8eca75msha01633654eaf739p1065a5jsnba882ff4d7d0',
        'x-rapidapi-host': 'imdb8.p.rapidapi.com'
      }
    }).then(response => {
      this.movieDetails = response.data;
      console.log(this.movieDetails);
      this.getMovieReviews(imdbID);
    });
  }

  gridItemClicked(imdbID): void {
    this.gridVisible = false;
    this.isLoading = true;
    document.getElementById('body').style.opacity = '0.5';
    this.getMovieDetails(imdbID);

  }

  submitRecension(value): void {
    // @TODO: tutaj zmienic url
    axios.post('http://localhost:8100/flask/single-review', {
      review: value,
    }).then(response => {
      console.log(response.data);
    });
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
