import "../css/style.scss";
import Slider from "./Slider";
import List from "./List";
import Weather from "./Weather";
import Trivial from "./Trivial";
const list = new List(5, document.getElementById("list"));
const slider = new Slider(32, document.getElementById("slider"));
const weather = new Weather(document.getElementById("weather"));
const trivial = new Trivial(document.getElementById("trivial"));
