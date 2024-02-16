// 뭘 해야 하는가? 
const list = document.getElementById("list");
const creatBn = document.getElementById("create-btn");

let todos = [];

// 화면에서 Add를 눌렀을 때 어떤 일이 벌어져야 하는가? -> 새로운 할일을 만든다
creatBn.addEventListener('click', createNewTodo); // 아직 createNewTodo는 정의되기 전이다

// 새로운 할일 만드는 함수를 정의
function createNewTodo () {
    // 할일을 변수화. 근데 변수화 하는 건 알겠는데 여기에 뭘 넣어야 하지?
    const item = {

    }
    // 할일을 할일 리스트에 넣어준다. 여기선 js의 데이터일 뿐. 화면에 보이는 요소가 아님
    todos.push/* unshift */(item) //배열 끝에 새로운 요소 넣고 싶다면, push. 현재는 배열 앞 

    // 데이터를 넣었다면, 요소도 직접 넣어줘야 한다. 요소를 넣는 함수는 아직 정의 전이다.
    const {itemEl, inputEl} = createTodoElement(item);
    list.prepend(itemEl); // 요소를 뒤에서부터 넣어준다. 앞에서 넣고 싶다면 prepend 사용하길

}

// 요소를 만들어 내는 함수 정의
function createTodoElement (item) {
    // 아이템 그 자체를 담을 그릇을 만든다. 기본적으로 만들어야 하는 모양새를 알아야 한다
    // 모양새 -> 체크 버튼, 할 일 입력 공간, 수정 버튼, 제거 버튼(수정 버튼과 제거 버튼은 같이 묶기_기능끼리)
    const itemEl = document.createElement("div");
    itemEl.classList.add("item");
    
    const checkboxEl = document.createElement("input");
    checkboxEl.type = "button";
    // checkboxEl.checked = 
    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.value = "";
    inputEl.placeholder = "Where to do, When to do, What to do"
    
    // 수정 버튼과 제거 버튼을 담을 그릇을 만든 뒤 담아 줘야 한다.
    const actionEl = document.createElement("div");
    actionEl.classList.add("actions");

    const editBtnEl = document.createElement("button");
    editBtnEl.classList.add("material-icons");
    editBtnEl.innerText = "edit";

    const removeBtnEl = document.createElement("button");
    removeBtnEl.classList.add("material-icons");
    removeBtnEl.innerText = "remove";

    // 이제 아이템에 담을 그릇에 각각의 요소를 담는다
        // actionEl 안에 editBtnEl과 removeBtnEl을 담아준다.
    actionEl.append(editBtnEl, removeBtnEl);
        // itemEl 안에 checkboxEl과 inputEl을 담아준다
    itemEl.append(checkboxEl, inputEl);
        //itemEl에 actionEl을 담아준다.
    itemEl.append(actionEl);


    return {
        itemEl, inputEl
    }
}