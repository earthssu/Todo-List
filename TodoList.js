const todoForm = document.querySelector("#todo-form");

const todoInput = document.querySelector("#todo-input");
const dateInput = document.querySelector("#date-input");
const selectInput = document.querySelector("#todo-select");

const todoList = document.querySelector("#todo-list");
const completeList = document.querySelector("#complete-list");

let todoBucket = [];
let completeBucket = [];

const guid = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

const replaceSelect = (select) => {
  if (select === "school") {
    return "학교";
  } else if (select === "schedule") {
    return "외부";
  } else if (select === "anniversary") {
    return "기념일";
  } else if (select === "etc") {
    return "기타";
  } else if (select === "all") {
    return "전체";
  }
};

const addTodo = () => {
  const uid = guid();
  let today = new Date();
  const [year, month, day] = dateInput.value.split("-");
  let dueDate = new Date(year, month - 1, day);
  let gap = today.getTime() - dueDate.getTime();
  let dday = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;

  const select = replaceSelect(selectInput.value);

  const todo = {
    id: uid,
    select: select,
    title: todoInput.value,
    date: dateInput.value,
    dday: dday,
  };

  todoBucket.push(todo);
  todoStorage(todoBucket);
};

const addComplete = (id) => {
  const li = document.getElementById(id);
  const title = li.querySelector(".todo-item").innerText;
  const select = li.querySelector(".select-item").innerText;
  const date = li.querySelector(".date-item").innerText;

  const complete = {
    id: id,
    select: select,
    title: title,
    date: date,
  };

  completeBucket.push(complete);
  todoRemove(id);
  completeStorage(completeBucket);
};

const renderTodos = (todoBucket) => {
  todoList.innerHTML = "";

  todoBucket.forEach((item) => {
    let li = document.createElement("li");
    li.setAttribute("class", "list-item");
    li.setAttribute("id", `${item.id}`);

    li.innerHTML = `
    <span class="select-item">${item.select}</span>
    <span class='item todo-item'>${item.title} </span>
    <span class='item date-item'>${item.date}</span>
    <span class='dday'>D-${item.dday}</span>
    <button type='button' class='remove' onClick='todoRemove("${item.id}")'>삭제</button>
    <button type='button' class='complete'>완료</button>`;

    todoList.appendChild(li);
  });
};

const renderComplete = (completeBucket) => {
  completeList.innerHTML = "";

  completeBucket.forEach((item) => {
    let li = document.createElement("li");
    li.setAttribute("class", "list-item");
    li.setAttribute("id", `${item.id}`);

    li.innerHTML = `
    <span class="select-item">${item.select}</span>
    <span class='item'>${item.title}</span>
    <span class='item'>${item.date}</span>
    <button type='button' class='remove'>삭제</button>`;

    completeList.appendChild(li);
  });
};

const todoStorage = (todoBucket) => {
  localStorage.setItem("todoItems", JSON.stringify(todoBucket));
  renderTodos(todoBucket);
};

const completeStorage = (completeBucket) => {
  localStorage.setItem("completeItems", JSON.stringify(completeBucket));
  renderComplete(completeBucket);
};

const todoRemove = (id) => {
  todoBucket = todoBucket.filter((x) => x.id != id);
  todoStorage(todoBucket);
};

const completeRemove = (id) => {
  completeBucket = completeBucket.filter((x) => x.id != id);
  completeStorage(completeBucket);
};

const categoryChange = () => {
  const category = document.querySelector("#category").value;
  const cateReplace = replaceSelect(category);

  let todos = JSON.parse(localStorage.getItem("todoItems"));

  if (cateReplace != "전체") {
    todos = todos.filter((x) => x.select == cateReplace);
  }

  renderTodos(todos);
};

const getFromLocalStorage = () => {
  const todoReference = localStorage.getItem("todoItems");
  const completeReference = localStorage.getItem("completeItems");

  if (todoReference) {
    todos = JSON.parse(todoReference);
    renderTodos(todos);
  }
  if (completeReference) {
    complete = JSON.parse(completeReference);
    renderComplete(complete);
  }
};

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo();
});

getFromLocalStorage();

todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove")) {
    todoRemove(event.target.parentElement.getAttribute("id"));
  }

  if (event.target.classList.contains("complete")) {
    addComplete(event.target.parentElement.getAttribute("id"));
  }
});

completeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove")) {
    completeRemove(event.target.parentElement.getAttribute("id"));
  }
});
