const add_button = document.querySelector("#add_button");
const complete_button = document.getElementById("complete");
const todo_input = document.querySelector("#todo_input");
const date_input = document.querySelector("#date_input");
const todo_list = document.getElementById("todo_list");
const complete_list = document.getElementById("complete_list");

let todoId = 1;
const clickButton = () => {
  let today = new Date();
  const dateSplit = date_input.value.split("-");
  let dueDate = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
  let gap = today.getTime() - dueDate.getTime();
  let dday = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;

  let todo = document.createElement("li");
  todo.setAttribute("class", "list_item");
  todo.setAttribute("id", "li" + todoId);
  todo.innerHTML = `<span class='item'>${todo_input.value}</span>`;
  todo.innerHTML += `<span class='item'>${date_input.value}</span>`;
  todo.innerHTML += `<span class='dday'>D-${dday}</span>`;
  todo.innerHTML += `<button type='button' id='remove' onClick='todoRemove("${todoId}")'>삭제</button>`;
  todo.innerHTML += `<button type='button' id='complete'onClick='complete("${todoId}")'>완료</button>`;
  todo_list.appendChild(todo);
  todoId++;
};

const complete = (id) => {
  let li = document.getElementById("li" + id);
  const content = li.querySelectorAll(".item");

  todo_list.removeChild(li);

  let complt = document.createElement("li");
  complt.setAttribute("class", "list_item");
  complt.setAttribute("id", "li" + id);
  complt.innerHTML = `<span class='item'>${content[0].innerHTML}</span>`;
  complt.innerHTML += `<span class='item'>${content[1].innerHTML}</span>`;
  complt.innerHTML += `<button type='button' id='remove' onClick='completeRemove("${id}")'>삭제</button>`;

  complete_list.appendChild(complt);
};

const todoRemove = (id) => {
  let li = document.getElementById("li" + id);
  todo_list.removeChild(li);
};

const completeRemove = (id) => {
  let li = document.getElementById("li" + id);
  complete_list.removeChild(li);
};

add_button.addEventListener("click", clickButton);
