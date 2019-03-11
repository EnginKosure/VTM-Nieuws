import axios from "axios";
import * as basicLightbox from "basiclightbox";

export default class ListItem {
  constructor(article, holder) {
    this._article = article;
    this._holder = holder;
    //console.log(this._holder);
    this._listItemRef = this.generateHTML();
    this.setUpEvents();
  }
  generateHTML() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
        <li class="list__item">
          <img class="list__item__image" src="${
            this._article.image.thumb
          }" alt=""/>
          <p class="videoID">${this._article.id}</p>
          <div  class="list__item__text">
            <h1 class="list__item__text_header">${this._article.title}</h1>
            <p class="videoID">${this._article.id}</p>
            <p class="list__item__text_date">${
              this._article.created.formatted
            }</p>
            <p class="videoID">${this._article.id}</p>
          </div>
          <p class="videoID">${this._article.id}</p>
        </li>
        `
    );
    return [...this._holder.querySelectorAll(".list__item")].reverse()[0];
  }
  setUpEvents() {
    this._listItemRef.addEventListener(
      "click",
      function(e) {
        //console.log(e);
        //console.log(this._article);
        //console.log(this._article.url);
        const videoID = e.target.nextElementSibling.innerText;
        console.log(videoID);
        //are we clicking the LI?
        if (e.target.nodeName === "LI" || "H1" || "P" || "IMG") {
          axios
            .get(
              `https://nieuws.vtm.be/feed/articles?format=json&fields=video&ids=${videoID}`
            )
            .then(function(result) {
              console.log(result);
              var relatedLink = result.data.response.items[0].video.url.default;
              var imageLink = result.data.response.items[0].image.medium;
              console.log(relatedLink);
              const instance = basicLightbox.create(
                `<video width="720" height="480" controls>
            <source src="${relatedLink}" type="video/mp4">
          </video>
          
          <p><strong>Time:</strong> The video tag is ...</p>
          `
              );
              instance.show();
              //const liText = e.target.innerText;
            });
        }
      }.bind(this)
    );
  }
}
