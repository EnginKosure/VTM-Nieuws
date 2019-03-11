export default class Loader {
  constructor(holder) {
    this._holder = holder;
    this.LoaderHTML = this.generateHTML();
  }
  generateHTML() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
      <div class="loader">Loading... </div>`
    );
    return this._holder.querySelector("div.loader");
  }
  show() {
    this.LoaderHTML.style.display = "block";
  }
  hide() {
    this.LoaderHTML.style.display = "none";
  }
}
