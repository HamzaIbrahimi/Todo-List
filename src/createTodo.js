import { Todo } from "./Todo.js";
export function createTodoFromForm() {
  let formInput = {
    title: document.querySelector("#title").value,
    description:
      document.querySelector("#description")?.value ?? "No Description",
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
        <div class="todo_flex">
          <input type="checkbox" name="todo_remove" id="todo_remove">
          <p class="todo_info">${todo.toString()}</p>
        </div>
        <p class="todo_description">${todo.description}</p>
      </div>`
    );
  }
}
