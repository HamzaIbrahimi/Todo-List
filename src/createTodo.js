import { Todo } from "./Todo.js";
import expand from "../logo/arrow-expand.svg";
export function createTodoFromForm() {
  const description = document.querySelector("#description").value;
  let formInput = {
    title: document.querySelector("#title").value,
    description: description ? description : "No description",
    date: document.querySelector("#date").value,
    priority: document.querySelector(`input[name="prior"]:checked`).value,
  };
  const todo = new Todo(
    formInput.title,
    formInput.description,
    formInput.date,
    formInput.priority
  );
  return todo;
}

export function renderTodo(todoArray) {
  const content = document.querySelector("#todo_content");
  content.innerHTML = "";
  for (const todo of todoArray) {
    content.insertAdjacentHTML(
      "beforeend",
      `<div class="todo">
            <div id = "todo_info">${todo.toString()}</div>
            <div class="todo_flex">
                <button class="todo_remove"></button>
                <p class="todo_info"><strong>${
                  todo.title
                }</strong> | Due Date: [${todo.dueDate}] </p>
                <img class="expand_todo" src="${expand}">
            </div>
            <div class="expanded_section hide">
                <p><strong>Description</strong>: ${todo.description}</p>
                <p><strong>Priority</strong>: <em>${todo.priority.toUpperCase()}</em></p>
                <p><strong>Date</strong>: ${todo.dueDate}</p>
            </div>       
            <hr>
      </div>`
    );
  }
}
