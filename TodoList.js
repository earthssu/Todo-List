const button = document.getElementById("button");
const input = document.getElementById("input");
const list = document.getElementById("list-box");

let todoId = 1;
const clickButton = () => {
  let todo = document.createElement("li");
  todo.setAttribute("class", "list-item");
  todo.setAttribute("id", "li" + todoId);
  todo.innerHTML = input.value;
  todo.innerHTML += `<button type='button' id='remove' onClick='remove("${todoId}")'>X</button>`;
  list.appendChild(todo);
  todoId++;
};

const remove = (id) => {
  let li = document.getElementById("li" + id);
  list.removeChild(li);
};

button.addEventListener("click", clickButton);
