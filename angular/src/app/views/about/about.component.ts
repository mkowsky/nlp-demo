import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private router: Router ) { }
  previousBar = 1;
  s1TitleUpper = 'WELCOME TO';
  s1TitleLower = 'NLP-DEMO';
  s1Description = 'web application created for class purposes. It concerns interactions between computers and humans language. NLP connects toegether linguisticts, computer\n' +
    'science and artificial intelligence embedded in the world of movies.';
  s2upperTitle = 'Wait no more!';
  s2lowerTitle = 'Play with us!';
  currentImageSrc = '../assets/guy.svg';
  currentDescription = 'Simple description to test if it will work.';
  descriptions = [
    'Simple description to test if it will work 1.',
    'Simple description to test if it will work 2.',
    'Simple description to test if it will work 3.',
    'Simple description to test if it will work 4.',
    'Simple description to test if it will work 5.',
  ];
  images = [
    '../assets/guy.svg',
    '../assets/guy2.svg',
    '../assets/rocket.svg',
    '../assets/calc1.svg',
    '../assets/game.svg',
  ]
  ngOnInit(): void {
  }

  changeText(value): void{
    // console.log(value);
    // document.getElementById(String(this.previousBar)).classList.remove('span-active');
    // document.getElementById(String(this.previousBar)).parentElement.classList.remove('sample-active');
    // document.getElementById(String(this.previousBar)).parentElement.classList.add('sample');
    // document.getElementById(value).classList.add('span-active');
    // document.getElementById(value).parentElement.classList.add('sample-active');
    // this.previousBar = value;

    document.getElementById(String(this.previousBar)).classList.remove('span-active');
    document.getElementById(String(this.previousBar)).parentElement.classList.remove('sample-active');
    document.getElementById('bar-' + this.previousBar).classList.remove('-bar-active');
    document.getElementById('bar-' + this.previousBar).classList.add('-bar-inactive');
    document.getElementById(String(this.previousBar)).parentElement.classList.add('sample');
    document.getElementById('bar-' + value).classList.remove('-bar-inactive');
    document.getElementById('bar-' + value).classList.add('-bar-active');
    document.getElementById(value).classList.add('span-active');
    document.getElementById(value).parentElement.classList.add('sample-active');
    this.currentDescription = this.descriptions[value - 1];
    this.currentImageSrc = this.images[value - 1];
    this.previousBar = value;
  }

}
