import axios from "axios";
import SliderItem from "./SliderItem";
//import Loader from "./Loader";
import { tns } from "../node_modules/tiny-slider/src/tiny-slider";

export default class Slider {
  constructor(nrOfItems, holder) {
    this._nrOfItems = nrOfItems;
    this._holder = holder;
    this._sliderRef = this.generateHTML();
    //this.y = new Loader(this._holder);
    this.getData();
  }

  generateHTML() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `<ul class="special">
    <span class="icon-left-big"></span><span class="icon-right-big"></span></ul>`
    );
    return this._holder.querySelector("ul");
  }
  doSliderThing() {
    this.mytnsSlider = tns({
      container: this._sliderRef,
      items: 5,
      slideBy: "page",
      autoplay: true,
      //center: true,
      controlsPosition: "bottom",
      controlsText: ["previous", "next"],
      navPosition: "bottom",
      //arrowKeys: "true",
      autoplayPosition: "bottom",
      //prevButton: `<span class="icon-left-big">`,
      //nextButton: `<span class="icon-right-big">`,
      //autoplayHoverPause: "true",
      //rewind: "true",
      //mode: "gallery",
      responsive: {
        600: {
          items: 2
        },
        900: {
          items: 3
        },

        1400: {
          items: 4
        },
        1800: {
          items: 5
        }
      },
      mouseDrag: true
    });
  }
  getData() {
    //this.y.show();
    //console.log(this._holder);
    axios
      .get(
        `https://nieuws.vtm.be/feed/articles&type=video&count=${
          this._nrOfItems
        }`
      )
      .then(results => {
        this.generateItems(results.data.response.items);
      });
  }
  generateItems(articles) {
    articles.forEach(article => {
      new SliderItem(article, this._sliderRef);
    });
    this.doSliderThing();
    //this.y.hide();
    //this._sliderRef.style.display = "block";
  }
}
