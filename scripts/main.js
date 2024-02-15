// 변수 설정: 항상 시작할 때 변수를 생성해준다. html의 요소, dom의 노드에 접근하기 위한 용도
const list = document.getElementById("list");
const createBtn = document.getElementById("create-btn");

// 리스트에 데이터를 넣어서 이를 화면에 띄운다
let todos = [];

// add 버튼을 눌렀을 때, 벌어져야 하는 일을 정의하기
createBtn.addEventListener('click', createNewTodo);
displayTodos();
	// 정확히 어떤 일이 벌어지는지는 아래에 정의해준다. 
	// 이게 가능한 이유는? 호이스팅. 정의되지 않은 함수를 호출했을 때 그 아래를 확인해 함수를 끌어올려 사용한다
function createNewTodo() {
	// add 버튼을 눌렀을 때 정확히 어떤 일을 해야 하는지 정의
	// 새로운 아이템 객체 생성(자바스크립트 내의 객체, html은 아님)
	// 버튼이 눌리면 이 함수가 실행되고, 이 함수가 실행될 때 마다 아래 객체가 만들어진다
	const item = {
		id: new Date().getTime(), //1690604133472
		text: "", // 초기에는 데이터가 하나도 없음. 커스텀 가능
		complete: false // 완성 여부에 따라서 다르게 표시해주어야 하기 때문
	}

	// 배열에 처음에 새로운 아이템을 추가. 자바스크립트 내 리스트에 적재
	todos.unshift(item); //insert new elements at the start of the array

	// 요소 생성하기: 데이터만 있으면 화면에 안보인다. 요소를 만들어줘야 한다. 
	const { itemEl, inputEl } = createTodoElement(item);

	// 리스트 요소 안에 방금 생성한 아이템 요소 추가(가장 첫번째 요소로 추가). append를 사용하게 된다면? 그 뒤에 추가된다.
	list.prepend(itemEl); // 할일을 시간 순서대로 보고 싶다면, 그냥 append. 시간 역순으로 보고 싶다면 prepend를 사용해주면 된다.

	// disabled 속성 제거
	inputEl.removeAttribute("disabled"); //처음 만들어진 요소에 대해서 바로 텍스트를 넣을 수 있게 만들어준다. 
 	// input 요소에 focus를 줘서 바로 타이핑할 수 있도록 해준다
	inputEl.focus();

	saveToLocalStorage();
}

							//요소 생성 위한 함수 정의
function createTodoElement(item) {
							//요소 생성
	const itemEl = document.createElement("div");
	itemEl.classList.add("item");
	// itemEl.className = "item";
	// className의 대체 속성. add(), remove() 사용 가능
	
	// checkboxEl input 요소 생성
	const checkboxEl = document.createElement("input");
	checkboxEl.type = "checkbox"; //js의 property는 html의 attribute
	checkboxEl.checked = item.complete; //기본 html은 js에선 객체 형식인가?

	if (item.complete) {
		itemEl.classList.add("complete");
	}
	
							//요소 생성
	const inputEl = document.createElement("input");
	inputEl.type = "text";
	inputEl.value = item.text;
	inputEl.placeholder = "Where, When, What to do";
	inputEl.setAttribute("disabled", ""); // 태그의 속성 값을 넣어준다. 불리언 타입은 ""으로 활성화. 입력 불가 상태로 만든다
	// inputEl.disabled = ""

	//수정과 제거 버튼을 담을 컨테이너 생성. 이후 버튼 생성 
	const actionsEl = document.createElement("div");
	actionsEl.classList.add("actions");

	const editBtnEl = document.createElement("button");
	editBtnEl.classList.add("material-icons");
	editBtnEl.innerText = "edit";

	const removeBtnEl = document.createElement("button");
	removeBtnEl.classList.add("material-icons", "remove-btn"); //여러 개의 클래스를 주는 것도 가능함
	removeBtnEl.innerText = "remove_circle"; //여기에서 텍스트를 주는 이유가 뭘까?
	
	//actionEl 컨테이너에 수정/제거 버튼 요소를 넣어준다. html에서 태그 안에 태그를 담아주는 기능과 같다 
	actionsEl.append(editBtnEl); 
	actionsEl.append(removeBtnEl);
	
	//가장 상위 요소인 itemEl에 체크박스, 입력란, actionEl을 넣는다.
	itemEl.append(checkboxEl);
	itemEl.append(inputEl);
	itemEl.append(actionsEl);
	
	//입력이 발생할 때, item 객체의 속성 중 하나인 text의 데이터는 실제 화면 상의 입력 값이 되어야 한다. 요소의 데이터가 화면상의 데이터로 업데이트 되는 것.
	inputEl.addEventListener("input", () => {
		item.text = inputEl.value;
	});

	// 이벤트 발생. ?체크박스가 변할 때 뒤따라 오는 변화는 이 함수가 실행이 되었을 때만 눈에 보이나?
	checkboxEl.addEventListener("change", () => {
		item.complete = checkboxEl.checked; //체크박스 눌리는 순간 이 checked의 불리언 값이 변한다

		//아이템 요소의 완성 여부에 따라 클래스를 다르게 한다.
		if (item.complete) {
			itemEl.classList.add("complete");  //완성된 것이 맞다면, 클래스에 complete을 넣어준다
		} else {
			itemEl.classList.remove("complete"); //
		}

		saveToLocalStorage();
	});
	// 입력 요소에서 포커스를 잃게 되는 순간, 입력이 불가하도록 만든다
	inputEl.addEventListener("blur", () => {
		inputEl.setAttribute("disabled", "");

		saveToLocalStorage();
	});
	

	editBtnEl.addEventListener("click", () => {
		inputEl.removeAttribute("disabled");
		inputEl.focus();
	});

	//데이터와 요소 모두 다 지워져야 한다. ?함수 안에 있는 이벤트 호출기가 과연 작동할까?
	removeBtnEl.addEventListener("click", () => {
		todos = todos.filter(t => t.id !== item.id); //todos 리스트 업데이트. filter는 특정 조건을 만족하는 요소를 걸러내도록 하는 js 여과기이다. (id가 부여되어서 구분이 가능)
		itemEl.remove(); //특정 아이디를 가진 친구만 없앤다.

		saveToLocalStorage();
	});

	return { itemEl, inputEl, editBtnEl, removeBtnEl }
}

function displayTodos() {
	loadFromLocalStorage();

	for (let i = 0; i < todos.length; i++) {
		const item = todos[i];
		const {itemEl} = createTodoElement(item);
		list.append(itemEl);
	}
}


function saveToLocalStorage() {
	const data = JSON.stringify(todos); // 로컬 스토리지에 넣기 위해서는 항상 String으로 넣어야 한다

	localStorage.setItem("my_todos", data);
}

function loadFromLocalStorage() {
	const data = localStorage.getItem("my_todos");

	if (data) {
		todos = JSON.parse(data);
	}
}

