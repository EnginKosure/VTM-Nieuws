export default class Pagination {
  constructor(holder, prev, next, List) {
    this._list = List;
    //this._holder = List._holder;
    //this._pageNr = List._pageNr;
    //this._pageRange = `${List._pageNr + 1}-${List._pageNr + 5}`;
    //this._totalPageNr = List._totalPageNr;
    //this._list = list;
    this._prev = prev;
    this._next = next;
    this._holder = holder;
    this._paginationRef = this.generateHTML();
    this.setUpEvents();
    // if (module.hot) {
    //   module.hot.dispose(function() {
    //     window.location.reload();
    //   });
    // }
    // this.loadPrevious();

    // this.loadNext();
    // //this.updatePageRange();
    // //this._pageRange = `${List._pageNr * 5}-${(List._pageNr + 1) * 5}`;

    // console.log(List);
    // console.log(this);
  }
  // updatePageRange() {
  //   this._pageRange = `${this._pageNr}-${this._pageNr + 5}`;
  // }
  generateHTML() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `<div class="page">
        <button class="previous">Previous</button>
          <span class="from">X</span> - 
          <span class="to">X</span> / 
          <span class="total">X</span>
        <button class="next">Next</button>
      </div>`
    );
    return this._holder.querySelector("div.page");
  }
  setUpEvents() {
    this._paginationRef
      .querySelector(".previous")
      .addEventListener("click", this._prev.bind(this._list));
    this._paginationRef
      .querySelector(".next")
      .addEventListener("click", this._next.bind(this._list));
  }
  update(start, end, total) {
    this._paginationRef.querySelector(".from").innerHTML = start;
    this._paginationRef.querySelector(".to").innerHTML = end;
    this._paginationRef.querySelector(".total").innerHTML = total;
  }
  show() {
    this._paginationRef.style.display = "block";
  }
  hide() {
    this._paginationRef.style.display = "none";
  }
}
