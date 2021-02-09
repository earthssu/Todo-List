const addButton = document.querySelector("#add-button");
const todoInput = document.querySelector("#todo-input");
const dateInput = document.querySelector("#date-input");
const selectInput = document.querySelector("#todo-select");
const todoList = document.getElementById("todo-list");
const completeList = document.getElementById("complete-list");

let todoId = 1;

const clickButton = () => {
  let today = new Date();
  const [year, month, day] = dateInput.value.split("-");
  let dueDate = new Date(year, month - 1, day);
  let gap = today.getTime() - dueDate.getTime();
  let dday = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;

  let todo = document.createElement("li");
  todo.setAttribute("class", "list-item");
  todo.setAttribute("id", "li" + todoId);
  todo.innerHTML = `<span class='item'>${todoInput.value} 
  <span class="select-item">(${selectInput.value})</span></span>
  <span class='item'>${dateInput.value}</span>
  <span class='dday'>D-${dday}</span>
  <button type='button' class='remove' onClick='todoRemove("${todoId}")'>삭제</button>
  <button type='button' class='complete'onClick='complete("${todoId}")'>완료</button>`;

  todoList.appendChild(todo);
  todoId++;
};

const complete = (id) => {
  let li = document.getElementById("li" + id);
  const content = li.querySelectorAll(".item");

  todoList.removeChild(li);

  let complt = document.createElement("li");
  complt.setAttribute("class", "list-item");
  complt.setAttribute("id", "li" + id);
  complt.innerHTML = `<span class='item'>${content[0].innerHTML}</span>
  <span class='item'>${content[1].innerHTML}</span>
  <button type='button' class='remove' onClick='completeRemove("${id}")'>삭제</button>`;

  completeList.appendChild(complt);
};

const todoRemove = (id) => {
  let li = document.getElementById("li" + id);
  todoList.removeChild(li);
};

const completeRemove = (id) => {
  let li = document.getElementById("li" + id);
  completeList.removeChild(li);
};

addButton.addEventListener("click", clickButton);
