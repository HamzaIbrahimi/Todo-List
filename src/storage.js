import { Todo } from "./Todo.js";
import { TodoProject } from "./todoProjects.js";
export function sendTodosToLocalStorage(todosArray) {
  const json = JSON.stringify(todosArray.map((todo) => todo.toJSON()));
  localStorage.setItem("todos", json);
}

export function getTodosFromLocalStorage() {
  const json = JSON.parse(localStorage.getItem("todos"));
  let todosArray = [];
  for (const todo of json) {
    if (todo?.projectName) {
      todosArray.push(
        new TodoProject(
          todo.title,
          todo.description,
          todo.dueDate,
          todo.priority,
          todo.projectName
        )
      );
    } else {
      todosArray.push(
        new Todo(todo.title, todo.description, todo.dueDate, todo.priority)
      );
    }
  }
  return todosArray;
}

export function storeProjectDivs() {
  const divs = document.querySelector("#projects_sidebar_area");
  localStorage.setItem("divs", JSON.stringify(divs.innerHTML));
}

export function getProjectDivs() {
  const html = JSON.parse(localStorage.getItem("divs"));
  const divs = document.querySelector("#projects_sidebar_area");
  divs.insertAdjacentHTML("beforeend", html);
}
