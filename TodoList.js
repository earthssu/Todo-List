const add_button = document.getElementById("add_button");
const complete_button = document.getElementById("complete");
const input = document.getElementById("input");
const todo_list = document.getElementById("todo_list");
const complete_list = document.getElementById("complete_list");

let todoId = 1;
const ClickButton = () => {
  let todo = document.createElement("li");
  todo.setAttribute("class", "list_item");
  todo.setAttribute("id", "li" + todoId);
  todo.innerHTML = input.value;
  todo.innerHTML += `<button type='button' id='remove' onClick='TodoRemove("${todoId}")'>삭제</button>`;
  todo.innerHTML += `<button type='button' id='complete'onClick='Complete("${todoId}")'>완료</button>`;
  todo_list.appendChild(todo);
  todoId++;
};

const Complete = (id) => {
  let li = document.getElementById("li" + id);
  todo_list.removeChild(li);

  let complt = document.createElement("li");
  complt.setAttribute("class", "list_item");
  complt.setAttribute("id", "li" + id);
  complt.innerHTML = li.innerText.split("삭제")[0];
  complt.innerHTML += `<button type='button' id='remove' onClick='CompleteRemove("${id}")'>삭제</button>`;
  complete_list.appendChild(complt);
};

const TodoRemove = (id) => {
  let li = document.getElementById("li" + id);
  todo_list.removeChild(li);
};

const CompleteRemove = (id) => {
  let li = document.getElementById("li" + id);
  complete_list.removeChild(li);
};

add_button.addEventListener("click", ClickButton);
