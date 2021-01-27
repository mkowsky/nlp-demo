import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import axios from 'axios';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';
import {faBars} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  gridVisible = false;
  movies = [];
  userReviews = [];
  isLoading = false;
  searchWrapperVisible = true;
  faWindowClose = faWindowClose;
  faBars = faBars;
  movieSearch = '';
  wrapper;
  searchContent;
  searchButtonDisabled = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.wrapper = document.querySelector('.wrapper');
    this.searchContent = document.querySelector('.searchContent');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  gridItemClicked(imdbID): void {
    this.router.navigateByUrl('/movie/' + imdbID);
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
      this.isLoading = false;
      document.getElementById('body').style.opacity = '1';
      this.router.navigateByUrl('/movie');
    });
  }


  searchForMovie(template): void {
    axios.get('http://www.omdbapi.com/?apikey=1eb2c5f8&s=' + template).then(response => {
      this.movies = response.data.Search.slice(0, 8);
      this.wrapper.classList.remove('wrapper-background-image');
      this.wrapper.classList.add('wrapper-background-blank');
      this.searchWrapperVisible = false;
      this.gridVisible = true;
    });
  }

  closeGrid(): void {
    this.wrapper.classList.remove('wrapper-background-blank');
    this.wrapper.classList.add('wrapper-background-image');
    this.gridVisible = false;
    this.searchWrapperVisible = true;
    this.movieSearch = '';
  }

  checkIfButtonCanBeActivated(): void {
    if (this.movieSearch.length !== 0) {
      this.searchButtonDisabled = false;
    } else {
      this.searchButtonDisabled = true;
    }
  }


}
