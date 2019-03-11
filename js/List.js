import axios from "axios";
import ListItem from "./ListItem";
import Loader from "./Loader";
import Pagination from "./Pagination";
export default class List {
  constructor(nrOfArticles, holder) {
    this._nrOfArticles = nrOfArticles;
    this._pageNr = 0;
    this._totalPageNr = 20;
    this._holder = holder;
    this.x = new Loader(this._holder);

    this._listRef = this.generateHTML(); // generating the html ref. ul
    this._pagination = new Pagination(
      this._holder,
      this.prevFct,
      this.nextFct,
      this
    );

    this.getData(); // downloading data
    //this._pagination.update();
  }
  generateHTML() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      ` <ul class="list__listHolder">
     
      </ul>`
    );
    return this._holder.querySelector("ul");
  }
  prevFct(e) {
    e.preventDefault();
    this._pageNr -= 5;
    this.getData();
  }
  nextFct(e) {
    e.preventDefault();
    this._pageNr += 5;
    this.getData();
  }
  getData() {
    this._listRef.innerHTML = "";
    this.x.show();
    axios
      .get(
        `https://nieuws.vtm.be/feed/articles&type=video&count=${
          this._nrOfArticles
        }&from=${this._pageNr}`
      )
      .then(response => {
        //console.log(response);
        //console.log(response.data.response.items);
        this._totalPageNr = response.data.response.total;
        this.generateItems(response.data.response.items);
        this._pagination.update(
          this._pageNr + 1,
          this._pageNr + this._nrOfArticles,
          this._totalPageNr
        );
      });
  }
  generateItems(articles) {
    articles.forEach(article => {
      new ListItem(article, this._listRef);
    });
    this.x.hide();
  }
}
//const articleRef = document.querySelector("ul.article-list");
