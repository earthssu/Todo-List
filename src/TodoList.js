import "./style.css";
import notifyImg from "../img/notification-icon.png";

const todoForm = document.querySelector("#todo-form");

const todoInput = document.querySelector("#todo-input");
const dateInput = document.querySelector("#date-input");
const selectInput = document.querySelector("#todo-select");

const todoList = document.querySelector("#todo-list");
const completeList = document.querySelector("#complete-list");
const categoryList = document.querySelector(".category");

let todoBucket = [];
let completeBucket = [];

const category = {
  school: "학교",
  schedule: "외부",
  anniversary: "기념일",
  etc: "기타",
  all: "전체",
};

const guid = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

const replaceSelect = (key) => category[key];

const getDday = (date) => {
  const today = new Date();
  const [year, month, day] = date.split("-");
  const dueDate = new Date(year, month - 1, day);
  const gap = today.getTime() - dueDate.getTime();
  let dday = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;

  if (dday == 0) {
    dday = "-DAY";
  } else if (dday < 0) {
    dday = -dday;
    dday = "+" + dday;
  } else {
    dday = "-" + dday;
  }

  return dday;
};

const addTodo = () => {
  const uid = guid();
  const dday = getDday(dateInput.value);

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

  const fragment = new DocumentFragment();

  todoBucket.forEach((item) => {
    let li = document.createElement("li");
    li.setAttribute("class", "list-item");
    li.setAttribute("id", `${item.id}`);

    li.innerHTML = `
    <span class="select-item">${item.select}</span>
    <span class="item todo-item">${item.title} </span>
    <span class="item date-item">${item.date}</span>
    <span class="dday">D${item.dday}</span>
    <button type="button" class="remove">삭제</button>
    <button type="button" class="complete">완료</button>`;

    fragment.appendChild(li);
  });

  todoList.appendChild(fragment);
};

const renderComplete = (completeBucket) => {
  completeList.innerHTML = "";

  const fragment = new DocumentFragment();

  completeBucket.forEach((item) => {
    let li = document.createElement("li");
    li.setAttribute("class", "list-item");
    li.setAttribute("id", `${item.id}`);

    li.innerHTML = `
    <span class="select-item">${item.select}</span>
    <span class="item">${item.title}</span>
    <span class='item">${item.date}</span>
    <button type="button" class="remove">삭제</button>`;

    fragment.appendChild(li);
  });

  completeList.appendChild(fragment);
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
  const category = document.querySelector(".category").value;
  const cateReplace = replaceSelect(category);

  let todos = JSON.parse(localStorage.getItem("todoItems"));

  if (cateReplace != "전체") {
    todos = todos.filter((x) => x.select == cateReplace);
  }

  renderTodos(todos);
};

const ddayChange = (todos) => {
  todos.forEach((item) => {
    item.dday = getDday(item.date);
  });
  todoStorage(todos);
};

const getFromLocalStorage = () => {
  const todoReference = localStorage.getItem("todoItems");
  const completeReference = localStorage.getItem("completeItems");

  if (todoReference) {
    const todos = JSON.parse(todoReference);
    ddayChange(todos);
    renderTodos(todos);
  }
  if (completeReference) {
    const complete = JSON.parse(completeReference);
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

categoryList.addEventListener("change", categoryChange);

window.addEventListener("load", () => {
  if (Notification && Notification.permission !== "granted") {
    Notification.requestPermission(function (status) {
      if (Notification.permission !== status) {
        Notification.permission = status;
      }
    });
  }

  const todos = JSON.parse(localStorage.getItem("todoItems"));

  if (Notification && Notification.permission === "granted") {
    todos.forEach((item) => {
      if (item.dday == -1) {
        let notify = new Notification("마감 기한 하루 전!", {
          body: item.title,
          icon: notifyImg,
        });
      }
    });
  }
});
