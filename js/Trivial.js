import axios from "axios";

export default class Trivial {
  constructor(holder) {
    this._holder = holder;
    this._eventAdded = false;
    this._answer = "";
    //this.randomRange;
    this._trivialRef = this.generateHTML();
    this._gameName = document.querySelector(".button");
    this._question = document.querySelector(".question");
    this._randomNumber = this.randomRange(0, 10, true);
    this._randomNumber1 = this.randomRange(0, 3, true);
    this._randomNumber2 = this.randomRange(0, 4, true);
    this._letter = ["a", "b", "c", "d"];
    this._number = 0;

    this._answerButton = document.querySelector(".answer");
    this._show = document.querySelector(".show");

    this._gameName.addEventListener = ("click",
    function(evt) {
      evt.preventDefault();
      this.getQuestions();
    }.bind(this));

    this.getQuestions();
  }
  randomRange(min, max, floored = false) {
    return floored
      ? Math.floor(Math.random() * (max - min) + min)
      : Math.random() * (max - min) + min;
  }

  generateHTML() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `  
      <div class="wrapper">
      <button class="button">TRIVIAL TIME</button>
      <p class="question"></p>
      <div class="container">
        <button class="button_a">a:</button>
        <button class="button_b">b:</button>
        <button class="button_c">c:</button>
        <button class="button_d">d:</button>
      </div>
  
      <button class="answer">SHOW THE ANSWER</button>
      <p class="show"></p>
      </div>`
    );
    return this._holder.querySelector("div.wrapper");
  }

  getQuestions() {
    axios.get("https://opentdb.com/api.php?amount=10").then(response => {
      this.res = response;
      this.newQuestion();
    });
  }

  newQuestion() {
    for (let j = 0; j < this._letter.length; j++) {
      this._holder.querySelector(
        `.button_${this._letter[j]}`
      ).style.backgroundColor = "rgb(88, 27, 27)";
    }

    this._answer = this.res.data.results[this._randomNumber].correct_answer;
    this._question.innerHTML = this.res.data.results[
      this._randomNumber
    ].question;

    this._holder.querySelector(
      `.button_${this._letter[this._randomNumber2]}`
    ).innerHTML = this.res.data.results[this._randomNumber].incorrect_answers[
      this._randomNumber1 % 3
    ];
    this._holder.querySelector(
      `.button_${this._letter[(this._randomNumber2 + 1) % 4]}`
    ).innerHTML = this.res.data.results[this._randomNumber].incorrect_answers[
      (this._randomNumber1 + 1) % 3
    ];
    this._holder.querySelector(
      `.button_${this._letter[(this._randomNumber2 + 2) % 4]}`
    ).innerHTML = this.res.data.results[this._randomNumber].incorrect_answers[
      (this._randomNumber1 + 2) % 3
    ];
    this._holder.querySelector(
      `.button_${this._letter[(this._randomNumber2 + 3) % 4]}`
    ).innerHTML = this._answer;

    this._show.innerHTML = "";

    if (!this._eventAdded) {
      this._eventAdded = true;
      this._answerButton.addEventListener(
        "click",
        function(e) {
          //this._show.innerHTML = this._answer;
          if (
            this._holder.querySelector(`.button_${this._letter[0]}`)
              .innerHTML === this._answer
          ) {
            this._holder.querySelector(
              `.button_${this._letter[0]}`
            ).style.backgroundColor = "green";
          } else if (
            this._holder.querySelector(`.button_${this._letter[1]}`)
              .innerHTML === this._answer
          ) {
            this._holder.querySelector(
              `.button_${this._letter[1]}`
            ).style.backgroundColor = "green";
          } else if (
            this._holder.querySelector(`.button_${this._letter[2]}`)
              .innerHTML === this._answer
          ) {
            this._holder.querySelector(
              `.button_${this._letter[2]}`
            ).style.backgroundColor = "green";
          } else if (
            this._holder.querySelector(`.button_${this._letter[3]}`)
              .innerHTML === this._answer
          ) {
            this._holder.querySelector(
              `.button_${this._letter[3]}`
            ).style.backgroundColor = "green";
          }
        }.bind(this)
      );
    }
  }
}
