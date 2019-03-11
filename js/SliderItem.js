import axios from "axios";
import * as basicLightbox from "basiclightbox";

export default class SliderItem {
  constructor(article, holder) {
    this._article = article;
    this._holder = holder;
    this._ItemRef = this.generateHTML();
    this.setUpEvents();
  }
  generateHTML() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `<li class="slider">
            <img class="slider_img"
                src="${this._article.image.large}"
                    alt="${this._article.title}"
            />
            <p class="videoID">${this._article.id}</p>
            <h1 class="slider_title">${this._article.title} <br> <br>${
        this._article.created.formatted
      }</h1>
      <p class="videoID">${this._article.id}</p>
           
        </li>`
    );
    return [...this._holder.querySelectorAll(".slider")].reverse()[0];
  }

  setUpEvents() {
    this._ItemRef.addEventListener(
      "click",
      function(e) {
        //console.log(e);
        //console.log(this._article);
        //console.log(this._article.url);
        const videoID = e.target.nextElementSibling.innerText;
        //console.log(videoID);
        //are we clicking the LI?
        if (e.target.nodeName === "LI" || "H1" || "IMG") {
          axios
            .get(
              `https://nieuws.vtm.be/feed/articles?format=json&fields=video&ids=${videoID}`
            )
            .then(function(result) {
              //console.log(result);
              var relatedLink = result.data.response.items[0].video.url.default;
              var imageLink = result.data.response.items[0].image.medium;
              //console.log(relatedLink);
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
