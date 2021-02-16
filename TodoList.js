const addButton = document.querySelector("#add-button");
const todoInput = document.querySelector("#todo-input");
const dateInput = document.querySelector("#date-input");
const selectInput = document.querySelector("#todo-select");
const todoList = document.getElementById("todo-list");
const completeList = document.getElementById("complete-list");

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
  } else {
    return "기타";
  }
};

const clickButton = () => {
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

  let li = document.createElement("li");
  li.setAttribute("class", "list-item");
  li.setAttribute("id", `${uid}`);

  li.innerHTML = `
    <span class="select-item">${select}</span>
    <span class='item todo-item'>${todoInput.value} </span>
    <span class='item date-item'>${dateInput.value}</span>
    <span class='dday'>D-${dday}</span>
    <button type='button' class='remove' onClick='todoRemove("${uid}")'>삭제</button>
    <button type='button' class='complete'onClick='complete("${uid}")'>완료</button>`;

  todoList.appendChild(li);

  todoBucket.push(todo);

  todoStorage();
};

const todoStorage = () => {
  localStorage.setItem("todoItems", JSON.stringify(todoBucket));
};

const completeStorage = () => {
  localStorage.setItem("completeItems", JSON.stringify(completeBucket));
};

const todoRemove = (id) => {
  const li = document.getElementById(id);
  li.remove();
  todoBucket = todoBucket.filter((x) => x.id !== id);
  todoStorage();
};

const completeRemove = (id) => {
  const li = document.getElementById(id);
  li.remove();
  completeBucket = completeBucket.filter((x) => x.id !== id);
  completeStorage();
};

const complete = (id) => {
  const li = document.getElementById(id);
  const title = li.querySelector(".todo-item").innerText;
  const select = li.querySelector(".select-item").innerText;
  const date = li.querySelector(".date-item").innerText;

  const finish = {
    id: id,
    select: select,
    title: title,
    date: date,
  };

  let complt = document.createElement("li");
  complt.setAttribute("class", "list-item");
  complt.setAttribute("id", `${id}`);
  complt.innerHTML = `
    <span class="select-item">${select}</span>
    <span class='item'>${title}</span>
    <span class='item'>${date}</span>
    <button type='button' class='remove' onClick='completeRemove("${id}")'>삭제</button>`;

  completeList.appendChild(complt);

  completeBucket.push(finish);

  todoRemove(id);
  completeStorage();
};

const printStorage = () => {
  const getTodoData = localStorage.getItem("todoItems");
  const getCompleteData = localStorage.getItem("completeItems");
  const todoItem = JSON.parse(getTodoData);
  const completeItem = JSON.parse(getCompleteData);

  if (todoItem) {
    todoItem.forEach((item) => {
      let li = document.createElement("li");
      li.setAttribute("class", "list-item");
      li.setAttribute("id", `${item.id}`);

      li.innerHTML = `
        <span class="select-item">${item.select}</span>
        <span class='item todo-item'>${item.title}</span>
        <span class='item date-item'>${item.date}</span>
        <span class='dday'>D-${item.dday}</span>
        <button type='button' class='remove' onClick='todoRemove("${item.id}")'>삭제</button>
        <button type='button' class='complete'onClick='complete("${item.id}")'>완료</button>`;

      todoList.appendChild(li);
    });
  }

  if (completeItem) {
    completeItem.forEach((item) => {
      let li = document.createElement("li");
      li.setAttribute("class", "list-item");
      li.setAttribute("id", `${item.id}`);
      li.innerHTML = `
        <span class="select-item">${item.select}</span>
        <span class='item'>${item.title}</span>
        <span class='item'>${item.date}</span>
        <button type='button' class='remove' onClick='completeRemove("${item.id}")'>삭제</button>`;

      completeList.appendChild(li);
    });
  }
};

addButton.addEventListener("click", clickButton);
window.onload = printStorage();
