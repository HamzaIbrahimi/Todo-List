import { Todo } from "./Todo.js";
export function sendTodosToLocalStorage(todosArray) {
  const json = JSON.stringify(todosArray.map((todo) => todo.toJSON()));
  localStorage.setItem("todos", json);
}

export function getTodosFromLocalStorage() {
  const json = JSON.parse(localStorage.getItem("todos"));
  let todosArray = [];
  for (const todo of json) {
    todosArray.push(
      new Todo(todo.title, todo.description, todo.dueDate, todo.priority)
    );
  }
  return todosArray;
}

export function storeProjectDivs() {
  const divs = document.querySelector("#projects_sidebar_area");
  const arrayDivs = [];
  arrayDivs.push(divs.innerHTML);
  localStorage.setItem("divs", JSON.stringify(arrayDivs));
}

export function getProjectDivs() {
  const json = JSON.parse(localStorage.getItem("divs"));
  const divs = document.querySelector("#projects_sidebar_area");
  if (json && json.length > 0) {
    for (const html of json) {
      divs.insertAdjacentHTML("beforeend", html);
    }
  }
}
