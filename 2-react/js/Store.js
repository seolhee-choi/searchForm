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


}

const store = new Store(storage);
export default store;