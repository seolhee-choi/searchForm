//1. 코드량이 많아지기 때문에 별도로 관리하기 위함
//2. main.js는 js코드의 시작점이고, 모듈별로 파일이 추가되면 해당 파일에서 import해 관리 예정
import store from "./js/store.js";

const TabType = {
    KEYWORD: "KEYWORD",
    HISTORY: "HISTORY",
};

const TabLabel = {
    [TabType.KEYWORD]: "추천 검색어",
    [TabType.HISTORY]: "최근 검색어",
};

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            searchKeyword: "",
            searchResult: [],
            submitted: false,
            selectedTab: TabType.KEYWORD,
            keywordList: [],
        };
    }

    componentDidMount() {
        const keywordList = store.getKeywordList();
        this.setState({ keywordList });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.search(this.state.searchKeyword);
    };

    search(searchKeyword) {
        const searchResult = store.search(searchKeyword);
        this.setState({ searchResult, searchKeyword, submitted: true });
    }

    handleReset() {
        //setState는 항상 비동기로 동작함 -> 상태가 나중에 변경됨
        // this.setState({ searchKeyword: "" });
        // console.log('TODO: handleReset', this.state.searchKeyword);
        
        this.setState({
            searchKeyword: "",
            submitted: false,
            //tab 상태추가
        });
    }

    // 리액트에서 이벤트를 처리하는 Handler이름은 함수명이 handle로 시작됨이 관례
    handleChangeInput(event) {
        const searchKeyword = event.target.value;
        
        //setState 메서드를 통해서만 상태 변경해야함 - component와의 약속
        if (searchKeyword.length <= 0 && this.state.submitted) {
            return this.handleReset();
        }
        this.setState({ searchKeyword });
    };

   

    render() {
        const searchForm = (
            <form 
                onSubmit={(event) => this.handleSubmit(event)} 
                onReset={() => this.handleReset()}
            >
                <input type="text" placeholder="검색어를 입력하세요" autoFocus value={this.state.searchKeyword} onChange={event => this.handleChangeInput(event)}/>
                {this.state.searchKeyword.length > 0 && (
                    <button type="reset" className="btn-reset"></button>
                )}
            </form>
        );

        const searchResult = 
            this.state.searchResult.length > 0 ? (
                <ul className="result">
                    {this.state.searchResult.map(item => {
                        return (
                            <li key={item.id}>
                                <img src={item.imageUrl} alt={item.name} />
                                <p>{item.name}</p>
                            </li>
                        )
                    })}
                </ul>
            ) : (
                <div className="empty-box">검색 결과가 없습니다</div>
            );

        const keywordList = (
            <ul className="list">
                {this.state.keywordList.map(({id, keyword}, index) =>{
                    return(
                        <li key={id} onClick={() => this.search(keyword)}>
                            <span className="number">{index + 1}</span>
                            <span>{keyword}</span>
                        </li>
                    )  
                })}
            </ul>
        )
            
        const tabs = (
            <>
                <ul className="tabs">
                    {Object.values(TabType).map((tabType) => (
                        //TODO ONCLICK추가
                        <li 
                            className={this.state.selectedTab === tabType ? "active" : ""}
                            key={tabType}
                            onClick={() => this.setState({ selectedTab: tabType })}
                        >
                            {TabLabel[tabType]}
                        </li>
                    ))}
                </ul>
                {this.state.selectedTab === TabType.KEYWORD && keywordList}
                {this.state.selectedTab === TabType.HISTORY && keywordList}
            </>
        );

        return (
            <>
                <header>
                    {/* HTML과 다르게 JSX에서는 attribute를 카멜케이스로 작성 */}
                    <h2 className="container">검색</h2>
                </header>
                <div className="container">
                    {searchForm}
                    <div className="content">
                        {this.state.submitted ? searchResult : tabs}
                    </div>
                </div>
            </>
        );
    }
}


ReactDOM.render(<App />, document.querySelector("#app"));