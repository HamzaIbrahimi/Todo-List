import "./css/normalize.css";
import "./css/style.css";
import pop from "../sound/pop-268648.mp3";
import snackbar from "snackbar";
import { Todos } from "./Todo.js";
import {
  sendTodosToLocalStorage,
  getTodosFromLocalStorage,
  storeProjectDivs,
  getProjectDivs,
} from "./storage.js";
import { createTodoFromForm, renderTodo } from "./createTodo.js";
import SidebarEvents from "./SidebarEvents.js";
import Dialog from "./Dialog.js";
const allTodos = new Todos();
const dialog = new Dialog();
const audio = new Audio(pop);
const sidebarEvents = new SidebarEvents(allTodos, dialog);

// Add Todos from local storage
window.addEventListener("DOMContentLoaded", () => {
  const localStorageArray = getTodosFromLocalStorage();
  if (localStorageArray.length > 0) {
    for (const todo of localStorageArray) {
      allTodos.add(todo);
    }
    renderTodo(allTodos.todosArray);
    getProjectDivs();
  }
});

//Add non project todos;
document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  allTodos.add(createTodoFromForm());
  sendTodosToLocalStorage(allTodos.todosArray);
  storeProjectDivs();
  renderTodo(allTodos.todosArray);
  dialog.close();
  snackbar.duration = 3000;
  snackbar.show("Todo successfully added!");
  allTodos.print();
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
    sendTodosToLocalStorage(allTodos.todosArray);
    audio.play();
  }
});
