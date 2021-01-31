var button = document.getElementById("button");
var input = document.getElementById("input");
var list = document.getElementById("list-box");

button.addEventListener("click", clickButton);

todoId = 1;

function clickButton() {
  var todo = document.createElement("li");
  todo.setAttribute("class", "list-item");
  todo.setAttribute("id", "li" + todoId);
  todo.innerHTML = input.value;
  todo.innerHTML +=
    "<button type='button' id='remove' onClick='remove(" +
    todoId +
    ")'>X</button>";
  list.appendChild(todo);
  todoId++;
}

function remove(id) {
  var li = document.getElementById("li" + id);
  list.removeChild(li);
}
