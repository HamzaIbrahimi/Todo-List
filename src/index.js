import "./css/normalize.css";
import "./css/style.css";
import pop from "../sound/pop-94319.mp3";
import { Todos } from "./Todo.js";
import { createTodoFromForm, renderTodo } from "./createTodo.js";
import Dialog from "./Dialog.js";
const allTodos = new Todos();
const dialog = new Dialog();
const audio = new Audio(pop);

document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  allTodos.add(createTodoFromForm());
  renderTodo(allTodos.todosArray);
  dialog.close();
});

document.addEventListener("change", (event) => {
  if (event.target.matches(`input[type="checkbox"]`)) {
    audio.play();
  }
});
