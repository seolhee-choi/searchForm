import storage from "./storage.js";

const tag = "[Store]";

class Store {
  constructor(storage) {
    console.log(tag, "constructor");

    if (!storage) throw "no storage";

    this.storage = storage;
  }

  search(keyword) {
    return this.storage.productData.filter((product) => 
      product.name.includes(keyword)
    );
  }

  //추천 검색어 목록을 storage에서 찾아서 반환해주는 메소드
  getKeywordList() {
    return this.storage.keywordData;
  }

  getHistoryList() {
    return this.storage.historyData.sort(this._sortHistory);
  }

  _sortHistory(history1, history2) {
    return history2.date > history1.date;
  }

  removeHistory(keyword) {
    this.storage.historyData = this.storage.historyData.filter(
        (history) => history.keyword !== keyword
      );
    return 
  }

  addHistory(keyword) {
    keyword = keyword.trim();
    if (!keyword) {
      return;
    }

    const hasHistory = this.storage.historyData.some(history => history.keyword === keyword);
    if(hasHistory) {
      this.removeHistory(keyword);
    }

    const id = createNextId(this.storage.historyData);
    const date = new Date();
    this.storage.historyData.push({id, keyword, date});
    this.storage.historyData = this.storage.historyData.sort(this._sortHistory);
  
  }
}

const store = new Store(storage);
export default store;