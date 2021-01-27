import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  reviews = [
    'Incredible movie. Best in class. Christmas movies at their very best. Culkin is great. The antics he pulls are a must see. Storyline goes by in a flash but so fun. Must see!!! 7 stars',
    'Dude... what a great movie! There are so many things wrong with it and so many things I could predict but dear god was that a good movie! I WILL watch this movie every single Christmas season to get into the spirit and I will LOVE every single minute of it every single time! This is the perfect Christmas movie for anyone who feels alone or hates the season! It will open your heart and make you believe again in the things that are good! It\'s a true triumphant battle of good vs evil and is done in such a fashion that is seen by the eyes of an honest child! Watch this and tell me you don\'t love it.... watch it, I dare you!',
    'Everyone knows this Christmas Classic, the original Home Alone tells a story about a kid who gets left home accidentally by his family who leave to go on holiday. Of course, Macaulay Culkin (McCallister) decides that he wants to make the most out of this opportunity and does the stuff his family never lets him do. However, this all changes with his chance run-in with the "Wet Bandits", two burglars that are out on Christmas robbing houses. Joe Pesci makes this movie great with his original personality, Daniel Stern adds the humour to the dynamic duo. All in all, definitely recommended for a family.',
    'This film is a very funny story about a boy which was left in the house alone. This movie is for a family. I liked it so much!! Watched it 10 or more times but everytime it is interesting. Watch it on christmas time!!!',
    'Well watching this movie can\'t stop laughting one of the best commedy ever made :D'
    ];

  resultsArray = [
    {index: 1, modelRating: 'positive', userRating: '10', mode2Rating: '9', actualRating: '10'},
    {index: 2, modelRating: 'negative', userRating: '4', mode2Rating: '5', actualRating: '10'},
    {index: 3, modelRating: 'positive', userRating: '8', mode2Rating: '4', actualRating: '10'},
    {index: 4, modelRating: 'positive', userRating: '6', mode2Rating: '6', actualRating: '9'},
    {index: 5, modelRating: 'negative', userRating: '6', mode2Rating: '7', actualRating: '2'},
  ];
  circumference: any;

  constructor() { }

  ngOnInit(): void {

  }



}
