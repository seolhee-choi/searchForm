import { on, qs } from "../helpers.js";
import View from "./View.js";

const tag = "[SearchFormView]";

export default class SearchFormView extends View {
  constructor() {
    console.log(tag, "constructor");

    super(qs("#search-form-view"));

    this.inputElement = qs("[type=text]", this.element);
    this.resetElement = qs("[type=reset]", this.element);

    this.showResetButton(false);
    this.bindEvents(); //search-form-view에서 이벤트를 바인딩하는 역할
  }

  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? "block" : "none";
  }

  bindEvents() {
    on(this.inputElement, "keyup", () => this.handleKeyup());//값 입력시
    on(this.element, "submit", event => this.handleSubmit(event));//값 입력 후 엔터시
    on(this.resetElement, "click", () => this.handleReset());//x버튼 클릭시
  }

  handleKeyup() {
    const { value } = this.inputElement;
    this.showResetButton(value.length > 0);

    if(value.length <= 0) {
      this.handleReset();
    }
  }

  //엔터 입력시 submit 이벤트 발생
  handleSubmit(event) {
    event.preventDefault();
    console.log(tag, "handleSubmit");
    const {value} = this.inputElement
    this.emit("@submit", {value});
  }

  //x버튼 클릭시 검색내용 삭제
  handleReset() {
    console.log(tag,"handleReset");
    this.emit("@reset");
  }
}
