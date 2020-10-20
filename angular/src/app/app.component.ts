import {Component, OnInit} from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  searchValue: string;
  flaga = false;
  movies: [];
  title = 'angular';
  ngOnInit(): void {
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


  test() {
    console.log('api-test');
    axios.get('http://localhost:8080/test').then(response => {
      console.log(response.data);
    });
  }
}




