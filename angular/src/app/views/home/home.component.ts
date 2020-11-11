import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchValue = '';
  flaga = false;
  movies = [];
  flagaRecenzja = true;
  currentMovie = "";

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    console.log('xd');
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  gridItemClicked(value): void{
    for (let i = 0 ; i < this.movies.length; i++) {
      if (this.movies[i].imdbID === value) {
        this.currentMovie = this.movies[i];
      }
    }
    this.flaga = false;
    this.flagaRecenzja = false;
  }

  submitRecension(value): void{
    console.log(value + ' recension subbmited');
  }

  searchForMovie(template) {
    console.log('xd');
    console.log(template);
    //this.flaga = true;
    axios.get('http://www.omdbapi.com/?apikey=1eb2c5f8&s=' + template).then(response => {
      console.log(response.data);
      this.movies = response.data.Search;

      this.flaga = true;
    });
  }

  cancel(){
    console.log('xd');
    this.searchValue = '';
    this.flaga = false;
  }

  test() {
    console.log('api-test');
    axios.get('https://rapidapi.p.rapidapi.com/title/auto-complete', {
      params: {q: 'home', v: 2},
      headers: {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': '6e6bf0e8e9msh48f791fb8c37620p10a217jsnca7a9c0f7eea'
      }
    }).then(response => {
      console.log(response.data);
    });
    // axios.get('http://localhost:8080/test').then(response => {
    //   console.log(response.data);
    // });
  }
}
