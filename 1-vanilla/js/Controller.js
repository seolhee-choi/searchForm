import { TabType } from "./views/TabView.js";

const tag = "[Controller]";

export default class Controller {
  constructor(store, { searchFormView, searchResultView, tabView, keywordListView }) {
    console.log(tag, "constructor");

    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.keywordListView = keywordListView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.searchFormView
      .on("@submit", (event) => this.search(event.detail.value))
      .on("@reset", () => this.reset());

    this.tabView.on("@change", event => this.changeTab(event.detail.value));  
   
    this.keywordListView.on("@click", event => 
      this.search(event.detail.value));
  }

  search(keyword) {
    console.log(tag, "search", keyword);
   
    this.store.search(keyword);
    this.render();
  }

  reset() {
    console.log(tag, "reset");

    this.store.searchKeyword = "";
    this.store.searchResult = [];
    this.render();
    //this.searchResultView.hide(); -> 해당 방법도 가능
  }

    
  changeTab(tab) {
      console.log(tag, "changeTab", tab);
      this.store.selectedTab = tab;
      this.render();
  }

  //controller가 관리하는 view들을 이용해 화면에 출력하는 기능
  render() {
    if(this.store.searchKeyword.length > 0) {
      return this.renderSerchResult();
    }

    this.tabView.show(this.store.selectedTab);
    if (this.store.selectedTab === TabType.KEYWORD) {
      this.keywordListView.show(this.store.getKeywordList())
    } else if (this.store.selectedTab === TabType.HISTORY) {
      this.keywordListView.hide()
    } else {
      throw "사용할 수 없는 탭입니다.";
    }

    this.searchResultView.hide();
  }

  renderSerchResult() {
    //TODO
    this.searchFormView.show(this.store.searchKeyword);
    this.tabView.hide();
    this.keywordListView.hide();

    this.searchResultView.show(this.store.searchResult);
  }
}
