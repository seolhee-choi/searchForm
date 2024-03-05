const tag = "[Controller]";

export default class Controller {
  constructor(store, { searchFormView, searchResultView, tabView }) {
    console.log(tag, "constructor");

    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;


    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.searchFormView
      .on("@submit", (event) => this.search(event.detail.value))
      .on("@reset", () => this.reset());
  }

  search(searchKeyword) {
    console.log(tag, "search", searchKeyword);
    this.store.search(searchKeyword);
    this.render();
  }

  reset() {
    console.log(tag, "reset");

    this.store.searchKeyword = "";
    this.store.searchResult = [];
    this.render();
    //this.searchResultView.hide(); -> 해당 방법도 가능
  }

  //controller가 관리하는 view들을 이용해 화면에 출력하는 기능
  render() {
    if(this.store.searchKeyword.length > 0) {
      return this.renderSerchResult();
    }

    this.tabView.show(this.store.selectedTab);
    this.searchResultView.hide();
  }

  renderSerchResult() {
    this.tabView.hide();
    this.searchResultView.show(this.store.searchResult);
  }
}
