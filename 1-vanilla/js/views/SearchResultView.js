import { on, qs } from "../helpers.js";
import View from "./View.js";

export default class SearchResultView extends View {
    //부모의 생성자 함수 호출(방금 만든 아이디로 DOM Element에 저장)
    constructor() {
        super(qs('#search-result-view')); //search element는 요걸 내부 변수로 갖음

        this.template = new Template()
    }

    //data에 따라서 동적으로 생성
    show(data = []) {
        this.element.innerHTML = 
            data.length > 0 
                ? this.template.getList(data) 
                : this.template.getEmptyMessage();
        super.show()
    }
}

class Template {
    getEmptyMessage() {
        return `
            <div class="empty-box">검색결과가 없습니다.</div>
        `
    }

    //ul태그 안에서 map을 이용해 li element 생성
    getList(data = []) {
        return `
            <ul class="result">
                ${data.map(this._getItem).join("")}
            </ul>
        `
    }


    _getItem({imageUrl, name}) {
        return `
            <li>
                <img src="${imageUrl}" alt="${name}" />
                <p>${name}</p>
            </li>
        `
    }
}