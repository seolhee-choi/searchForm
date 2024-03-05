## React.js를 이용해 쇼핑몰 서비스에 이용되는 **검색 화면** 구성


## 🛠️ 실습환경

- Node.js
- 에디터: VS Code
- 웹브라우져: 파이어폭스, 크롬
- Git 클라이언트

## 📝 요구사항

#### 검색폼 구현
    ● 검색 상품명 입력 폼이 위치한다
    ● 검색어를 입력하면 x버튼이 보이고, 없으면 x 버튼을 숨긴다
    ● 엔터를 입력하면 검색 결과가 보인다
    ● x 버튼을 클릭하거나 검색어를 삭제하면 검색 결과를 삭제한다

#### 검색 결과 구현
    ● 검색 결과가 검색폼 아래 위치한다. 검색 결과가 없을 경우와 있을 경우를 구분한다.
    ● x버튼을 클릭하면 검색폼이 초기화 되고, 검색 결과가 사라진다

#### 탭 구현
    ● 추천 검색어, 최근 검색어 탭이 검색폼 아래 위치한다
    ● 기본으로 추천 검색어 탭을 선택한다
    ● 각 탭을 클릭하면 탭 아래 내용이 변경된다

#### 추천 검색어 구현
    ● 번호, 추천 검색어 이름이 목록 형태로 탭 아래 위치한다
    ● 목록에서 검색어를 클릭하면 선택된 검색어의 검색 결과 화면으로 이동한다

#### 최근 검색어 구현
    ● 최근 검색어 이름, 검색일자, 삭제 버튼이 목록 형태로 탭 아래 위치한다 (추천
    검색어와 비슷)
    ● 목록에서 검색어를 클릭하면 선택된 검색어로 검색 결과 화면으로 이동한다 (추천
    검색어와 같음)
    ● 목록에서 x 버튼을 클릭하면 선택된 검색어가 목록에서 삭제된다
    ● 검색시마다 최근 검색어 목록에 추가된다

## ✍️ 사용되는 디자인 패턴

- **MVC패턴**
    
    모델(Model), 뷰(View), 컨트롤러(Controller)라는 세 개의 계층으로 구성되고 각자의 역할을 수행하면서 서로 협력해 문제를 해결한다.
    
    - *모델(Model)**은 데이터를 관리하는 역할을 가진다. 
    가령 API나 브라우저 로컬 저장소에 있는 데이터를 가져와 어플리케이션에서 사용할 수 있는 모양으로 만든다. 데이터를 수정하거나 삭제할 수 있는 방법도 알고 있다.
    - *뷰(View)**는 사용자가 볼 수 있는 화면을 관리하는 역할을 한다. 
    데이터를 돔에 출력하거나 사용자가 발생한 이벤트를 처리하는 기능을 수행한다. 
    HTML, CSS도 뷰에 속한다.
    
    어플리케이션이 동작하려면 모델이 가지고 있는 데이터를 뷰에게 전달해서 화면에 출력해야 한다. 반대로 뷰에서 발생한 이벤트에 따라 모델이 데이터를 관리해 어플리케이션 상태를 관리해야한다. 역할에 따라 서로 격리되어 있는 모델과 뷰를 연결하고 움직이는 주체가 바로 **컨트롤러(Controller)**다.
