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
