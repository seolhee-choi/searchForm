//1. 코드량이 많아지기 때문에 별도로 관리하기 위함
//2. main.js는 js코드의 시작점이고, 모듈별로 파일이 추가되면 해당 파일에서 import해 관리 예정

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            searchKeyword: "",
        };
    }


    handleSubmit(event) {
        event.preventDefault();
        console.log('TODO : handleSubmit', this.state.searchKeyword);
    };

    handleReset() {
        //setState는 항상 비동기로 동작함
        // this.setState({ searchKeyword: "" });
        // console.log('TODO: handleReset', this.state.searchKeyword);
        
        this.setState(() => {
            return { searchKeyword: "" }
        }, () => {
            console.log('TODO: handleReset', this.state.searchKeyword);
        });
    }

    // 리액트에서 이벤트를 처리하는 Handler이름은 함수명이 handle로 시작됨이 관례
    handleChangeInput(event) {
        const searchKeyword = event.target.value;

        if (searchKeyword.length <= 0) {
            this.handleReset();
        }
        //setState 메서드를 통해서만 상태 변경해야함 - component와의 약속
        this.setState({ searchKeyword: event.target.value,});
    };


    render() {
        // let resetButton = null;

        // if (this.state.searchKeyword.length > 0) {
        //     resetButton = <button type="reset" className="btn-reset"></button>
        // }
        return (
            <>
                <header>
                    {/* HTML과 다르게 JSX에서는 attribute를 카멜케이스로 작성 */}
                    <h2 className="container">검색</h2>
                </header>
                <div className="container">
                    <form 
                        onSubmit={(event) => this.handleSubmit(event)} 
                        onReset={() => this.handleReset()}
                    >
                        <input type="text" placeholder="검색어를 입력하세요" autoFocus value={this.state.searchKeyword} onChange={event => this.handleChangeInput(event)}/>
                        {this.state.searchKeyword.length > 0 && (
                            <button type="reset" className="btn-reset"></button>
                        )}
                    </form>
                </div>
            </>
        );
    }
}


ReactDOM.render(<App />, document.querySelector("#app"));