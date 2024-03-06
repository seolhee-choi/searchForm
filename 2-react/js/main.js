//1. 코드량이 많아지기 때문에 별도로 관리하기 위함
//2. main.js는 js코드의 시작점이고, 모듈별로 파일이 추가되면 해당 파일에서 import해 관리 예정
const element = (
    <header>
        {/* HTML과 다르게 JSX에서는 attribute를 카멜케이스로 작성 */}
        <h2 className="container">검색</h2>
    </header>
);

ReactDOM.render(element, document.querySelector("#app"));