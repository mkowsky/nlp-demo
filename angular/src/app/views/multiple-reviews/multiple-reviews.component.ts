import {Component, OnInit} from '@angular/core';
import axios from 'axios';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-multiple-reviews',
  templateUrl: './multiple-reviews.component.html',
  styleUrls: ['./multiple-reviews.component.scss']
})
export class MultipleReviewsComponent implements OnInit {

  templateArray = ['Home Alone has a rather thin plot but makes up for it with all that cartoon-like violence. Joe Pesci and Daniel Stern give wonderful performances and are the best thing in this movie. Macaulay Culkin is an okay actor, nothing special, but okay. Home Alone is best watched during the holidays. That is when it can be most enjoyed.'
    , 'This movie type you just have to watch every year on Christmas, its a very cozy and feel good movie, its always nice to watch it with your family, get some hot chocolate, and some hot fudge brownies. The plot is very smooth and you just enjoy it throughout, nobody could of played Kevin like Maculay Kulkin. This movie is very fun, funny and a well rounded movie.'];
  userReviews = [
    {
      'reviewTitle': 'Comment one',
      'reviewText': 'Home Alone has a rather thin plot but makes up for it with all that cartoon-like violence. Joe Pesci and Daniel Stern give wonderful performances and are the best thing in this movie. Macaulay Culkin is an okay actor, nothing special, but okay. Home Alone is best watched during the holidays. That is when it can be most enjoyed.'
    },
    {
      'reviewTitle': 'Comment two',
      'reviewText': 'Seen this classic so many times and never ceases to get old. With a bunch of great scenery, adorableness, original vibes, and comedy! Macaulay Culkin shined so much, he deserved the millions earned for his role. I love how Joe Pesci went from Scorsese films where he swore so much where as in this he had to bite his tongue. John Hughe was a gifted writer that helmed some gems!'
    },
    {
      'reviewTitle': 'Comment three',
      'reviewText': 'This movie type you just have to watch every year on Christmas, its a very cozy and feel good movie, its always nice to watch it with your family, get some hot chocolate, and some hot fudge brownies. The plot is very smooth and you just enjoy it throughout, nobody could of played Kevin like Maculay Kulkin. This movie is very fun, funny and a well rounded movie.'
    },
    {
      'reviewTitle': 'Comment four',
      'reviewText': 'I HAVE REVIEWED OVER 400 (C H R I S T M A S ) MOVIES AND SPECIALS. BEWARE OF SOME REVIEWERS THAT ONLY HAVE ONLY ONE REVIEW. WHEN ITS A POSITIVE THERE IS A GOOD CHANCE THEY WERE INVOLVED WITH THE PRODUCTION. NOW I HAVE NO AGENDA! I AM HONEST! I REVIEW MOVIES & SPECIALS AS A WAY TO KEEP TRACK OF WHAT I HAVE SEEN! I HAVE DISCOVERED MANY GEMS IN MY QUEST TO SEE AS MANY Christmas MOVIES AS I CAN. Maybe the most successful "Christmas Movie" of all time and it\'s easy to understand why. The film made Macaulay Culkin a household name and the biggest child star since Shirley Temple. In this film a child get left behind on accident in his Chicago home while his family has flown off for Christmas. This film takes place in Chicago, the McCallister family is preparing for a Christmas vacation in Paris. On the night before their departure, the entire family gathers at Peter and Kate\'s home, where their son, Kevin, is ridiculed by his siblings and cousins. After a scuffle with his older brother, Buzz, Kevin is sent to the third floor of the house, where he wishes that his family would disappear. During the night, heavy winds cause damage to power lines, which causes the alarm clocks to reset; consequently, the family oversleeps. In the confusion and rush to get to the airport in time to catch their flight, Kevin is accidentally left behind. Later, Kevin wakes up to find the house empty and, thinking his wish has come true, is overjoyed with his new-found freedom. However, Kevin\'s joy turns to fear as he encounters his next door neighbor, "Old Man" Marley, who is rumored to have murdered his family with a snow shovel in 1958; he also encounters the "Wet Bandits", Harry and Marv, a pair of burglars who have been breaking into other vacant houses in the neighborhood and have targeted the McCallisters\' house. Kevin initially manages to keep them away by making the house look as if the family is home, but they eventually realize the deception. This film is one of the best Christmas movies however at first it is a little slow on the set-up.'
    },
    {
      'reviewTitle': 'Comment five',
      'reviewText': 'This an absurd storyline. Hollywood loves to show movies in which kids are smarter than adults, for some reason. Also, we are expected to believe a big family can go all the way to the airport and then fly to France before finding out one of their kids was left at home??! I don\'t think so. I know a lot of big families and this would never-in-a-million years happen. However, it\'s just a movie, and it isn\'t real and you can\'t take any of it seriously. Thus, the idea is to go along with the wild premise and enjoy the antics that follow....and there are plenty of those! A share of the credit for the big success of this film should go to God, who made Maccaulay Culkin\'s face. Without it, I doubt this would have been anywhere near the hit is was, but Culkin\'s "cuteness" helps makes you root for him and his facial expressions provide a lot of laughs. He turned out to be a fine child actor. The two guys (Joe Pesci and Daniel Stern) that play incompetent crooks are funny and some of the humor is clever, although slapstick "rules" in this film. There are some really nice messages in here, such as "families suck," says the kid. Oh, well, some think this film did, too. I am not a big fan of it, but I did enjoy it along with most other people. I thought the sequel was better, though.'
    },

  ];

  isLoading = true;
  gameStarted = false;
  currentComment: any;
  currentRate =  0;
  chosenComments = [];
  currentIndex = 0;
  multipleReviews = [];
  maxComments = 0;
  showResults = false;
  template = null;
  arrayToSend = [];
  loadingResponse = true;
  maxCommentsCards: NodeListOf<Element>;
  gameCards: NodeListOf<Element>;
  resultsArray = [];
  modelRating: Array<string>;
  linearModelRating: Array<string>;

  constructor(private router: Router, private Activatedroute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getMovieReviews(this.Activatedroute.snapshot.paramMap.get('id'));
    //this.currentComment = this.userReviews[this.currentIndex];
    // const that = this;
    // setTimeout(function(){
    //     that.load();
    // }, 2000);
  }

  ngAfterViewInit(): void {

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
      this.userReviews = response.data.reviews;
      this.currentComment = this.userReviews[this.currentIndex];
      console.log(this.userReviews);
      this.isLoading = false;
      const that = this;
      setTimeout(function(){
        that.prepView();
      }, 200);
    });
  }
  prepView(): any{
    this.maxCommentsCards = document.querySelectorAll('.-options-card-inactive');
    this.gameCards = document.querySelectorAll('.-game-card-inactive');
    console.log(this.maxCommentsCards);
    console.log(this.gameCards);
  }
  choseComments(): void {
    for (let i = 0; i < this.maxComments; i++) {
      this.chosenComments.push(this.userReviews[i]);
    }
    this.currentComment = this.chosenComments[this.currentIndex];
  }

  startGame(): void {
    this.gameStarted = true;
    this.choseComments();
    if (this.template) {
      this.showResults = false;
    } else {
      for (let i = 0; i < this.chosenComments.length; i++){
        this.arrayToSend.push(this.chosenComments[i].reviewText);
        this.multipleReviews.push({review: this.currentComment.reviewText, authorRating: this.chosenComments[i].authorRating});
      }
      this.getLinearClassification();
      //this.sendMultipleReviews();
      this.showResults = true;

    }
  }

  confirmRating(): void {
    this.multipleReviews.push({id: this.currentIndex, review: this.currentComment.reviewText, userRate: this.currentRate, authorRating: this.currentComment.authorRating});
    this.arrayToSend.push(this.currentComment.reviewText);
    if (this.maxComments == this.multipleReviews.length) {
      this.sendMultipleReviews();
      this.showResults = true;
    } else {
      //this.multipleReviews.push({id: this.currentIndex, review: this.currentComment.reviewText, userRate: this.currentRate, authorRating: this.currentComment.authorRating});
      this.currentIndex++;
      this.currentComment = this.userReviews[this.currentIndex];
      this.currentRate = 0;

    }


  }

  navBack(): void {
    console.log(this.Activatedroute.snapshot.paramMap.get('id'));
    this.router.navigateByUrl('/movie/' + this.Activatedroute.snapshot.paramMap.get('id'));
  }

  checkIfDisabled(): boolean {
    if ((this.maxComments !== 0) && (this.template !== null)) {
      return false;
    } else {
      return true;
    }
  }

  sendMultipleReviews(): void {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:8100/flask/multiple-reviews', {
      //reviews: this.templateArray,
      reviews: this.arrayToSend,
      jwt: token,
    }).then(response => {
      this.modelRating = response.data;
      console.log(this.modelRating);
      this.getLinearClassification();
      //this.prepareResultsArray(this.template);

    });
  }
  getLinearClassification(): void{
    const token = localStorage.getItem('token');
    axios.post('http://localhost:8100/flask/linear-rating', {
      reviews: this.arrayToSend,
      jwt: token,
    }).then(response => {
      //this.linearModelRating = resp.data;
      console.log(response.data);
      this.linearModelRating = response.data;
      this.prepareResultsArray();
    });
  }

  pickCard(value): void {
    console.log(value);
    this.maxCommentsCards.forEach(card => {
      if (card.id.includes(value)) {
        card.classList.remove('-options-card-inactive');
        card.classList.add('-options-card');
      } else {
        card.classList.add('-options-card-inactive');
      }
    });

    this.maxComments = value;
    console.log(this.maxComments);
  }

  gameOptions(value): void {
    console.log(value);
    this.gameCards.forEach(card => {
      if (card.id.includes(value)) {
        card.classList.remove('-game-card-inactive');
        card.classList.add('-game-card');
      } else {
        card.classList.add('-game-card-inactive');
      }
    });
    if (value === 'true') {
      this.template = true;
    } else {
      this.template = false;
    }
  }
  prepareResultsArray(): void{
    if (this.template){
      for (let i = 0; i < this.maxComments; i++){
        this.resultsArray.push({userRating: this.multipleReviews[i].userRate, binaryModelRating: this.modelRating[i], linearModelRating: this.linearModelRating[i], actualRating: this.multipleReviews[i].authorRating});
      }
      console.log(this.resultsArray);
      this.loadingResponse = false;
    } else {
      for (let i = 0; i < this.maxComments; i++){
        this.resultsArray.push({binaryModelRating: this.modelRating[i], linearModelRating: this.linearModelRating[i], actualRating: this.multipleReviews[i].authorRating});
      }
      console.log(this.resultsArray);
      this.loadingResponse = false;
    }

  }
  calculateRating(value): void{
    this.currentRate = value;
  }
}
