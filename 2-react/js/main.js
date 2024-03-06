//1. 코드량이 많아지기 때문에 별도로 관리하기 위함
//2. main.js는 js코드의 시작점이고, 모듈별로 파일이 추가되면 해당 파일에서 import해 관리 예정

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            searchKeyword: "",
        };
    }

    // 리액트에서 이벤트를 처리하는 Handler이름은 함수명이 handle로 시작됨이 관례
    handleChangeInput(event) {
        // this.state.searchKeyword = event.target.value;
        // this.forceUpdate();

        this.setState({
            searchKeyword: event.target.value,
        });
    };

    render() {
        return (
            <>
                <header>
                    {/* HTML과 다르게 JSX에서는 attribute를 카멜케이스로 작성 */}
                    <h2 className="container">검색</h2>
                </header>
                <div className="container">
                    <form>
                        <input type="text" placeholder="검색어를 입력하세요" autoFocus value={this.state.searchKeyword} onChange={event => this.handleChangeInput(event)}/>
                        <button type="reset" className="btn-reset"></button>
                    </form>
                </div>
            </>
        );
    }
}


ReactDOM.render(<App />, document.querySelector("#app"));