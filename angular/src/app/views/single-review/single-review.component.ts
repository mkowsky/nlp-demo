import {Component, OnInit} from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-single-review',
  templateUrl: './single-review.component.html',
  styleUrls: ['./single-review.component.scss']
})
export class SingleReviewComponent implements OnInit {


  reviewSubmitted = false;
  isLoading = false;

  constructor() {
  }

  template = [];
  review = '';
  chosenWords = [];
  reviewClassificaiton = '';
  reviewArray = [];


  ngOnInit(): void {
  }

  submitRecension(value): void {
    this.isLoading = true;
    this.review = value;
    this.reviewArray.push(value);
    const token = localStorage.getItem('token');

    axios.post('http://localhost:8100/flask/single-review', {
      reviews: this.reviewArray,
      jwt: token,
    }).then(response => {
      this.reviewClassificaiton = response.data[0][0];
      this.isLoading = false;
      console.log(response.data[1]);
      this.proceedWords(response.data[1]);

    });
  }

  proceedWords(array): void {
    var str = array.join(' ');
    console.log(str);
    str = str.replaceAll(',', ' ');
    var arrayTemplate = str.split(' ');
    console.log(arrayTemplate);
    var filteredArray = new Array();
    arrayTemplate.forEach(item => {
      if (!(filteredArray.includes(item))) {
        filteredArray.push(item);
      }
    });
    console.log(filteredArray);
    this.makeWordsBold(this.review, filteredArray);
  }

  makeWordsBold(revieww, words): void {

    document.getElementById('vow_p').innerHTML = this.makeBold(revieww, words);
    //this.reviewHG = this.makeBold(revieww, words);
    this.reviewSubmitted = true;
  }

  done(): void {
    this.review = '';
    this.isLoading = false;
    this.reviewSubmitted = false;
    this.chosenWords = [];
  }

  makeBold(input, wordsToBold): any {
    return input.replace(new RegExp('(\\b)(' + wordsToBold.join('|') + ')(\\b)', 'ig'), '$1<span style=" background: #FEC556;">$2</span>$3');
  }


}
