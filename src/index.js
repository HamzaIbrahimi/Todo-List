import "./css/normalize.css";
import "./css/style.css";
import pop from "../sound/pop-268648.mp3";
import snackbar from "snackbar";
import { Todos } from "./Todo.js";
import { createTodoFromForm, renderTodo } from "./createTodo.js";
import Dialog from "./Dialog.js";
const allTodos = new Todos();
const dialog = new Dialog();
const audio = new Audio(pop);

//Add non project todos;
document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  allTodos.add(createTodoFromForm());
  renderTodo(allTodos.todosArray);
  dialog.close();
  snackbar.duration = 3000;
  snackbar.show("Todo successfully added!");
});

//expand todo info
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("expand_todo")) {
    const parent = e.target.parentElement;
    parent.nextElementSibling.classList.toggle("hide");
  }
});

//remove Todo
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("todo_remove")) {
    const parent = e.target.parentElement;
    const closestTodo = e.target.closest(".todo");
    const todoFullString = parent.previousElementSibling.textContent.trim();
    closestTodo.remove();
    allTodos.removeTodo(todoFullString);
    audio.play();
  }
});
