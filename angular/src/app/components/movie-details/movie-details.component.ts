import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movieTitle: string;
  @Input() movieType: string;
  @Input() movieProductionDate: string;
  @Input() movieLength: string;
  @Input() movieDescription: string;
  @Input() moviePoster: string;
  @Input() movieRating: number;
  shortDescription: string;

  constructor() {
  }

  currentRate = 3.14;
  panelExpanded = false;
  shortDescirpitonCopy: string;

  ngOnInit(): void {
    this.prepareShortDescription();
  }


  prepareShortDescription(): void {
    this.shortDescription = this.movieDescription.slice(0, 550) + '...';
    console.log(this.shortDescription);
    this.shortDescirpitonCopy = this.shortDescription;
  }

  expandPanel(): void {
    this.panelExpanded = !this.panelExpanded;
    if (this.panelExpanded) {
      this.shortDescription = this.movieDescription;
    } else {
      this.shortDescription = this.shortDescirpitonCopy
    }
  }
}
