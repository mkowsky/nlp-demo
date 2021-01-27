import {Component, OnInit} from '@angular/core';
import axios from 'axios';
import {Router, NavigationEnd} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  constructor(private router: Router, private Activatedroute: ActivatedRoute) {
  }


  isLoading = true;
  movieDetails: [];
  currentMovieID: string;
  fieldDescriptions = ['Writing a review has never been so interesting before! Check what we have prepared for you',
    'Try to compete with our model and see for yourself who is better! ',
    'Are you a type of a math guy? This should interest you!',
    'Our model saw all the movies, check what it thinks about this one!'];
  currentDescription = 'Hover a card to see its \n\ndetails details details details!';
  ngOnInit(): void {
    this.currentMovieID = this.Activatedroute.snapshot.paramMap.get('id');
    this.getMovieDetails(this.Activatedroute.snapshot.paramMap.get('id'));
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
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
      this.isLoading = false;
    });
  }
  appendDescription(value): void{
      if (value != null)   this.currentDescription = this.fieldDescriptions[value];
      else this.currentDescription = 'Hover a card to see its \n\ndetails details details details! ';
  }
}
