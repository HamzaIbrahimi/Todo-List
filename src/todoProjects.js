import { Todo } from "./Todo.js";
import plus from "../logo/plus.svg";
export class TodoProject extends Todo {
  #projectName;

  constructor(title, description, dueDate, priority, projectName) {
    super(title, description, dueDate, priority);
    this.#projectName = "Project: " + projectName;
  }

  get projectName() {
    return this.#projectName;
  }
  toString() {
    return super.toString() + " - " + this.projectName;
  }
}

export function addTodoProject(projectName) {
  const parent = document.querySelector("#projects_sidebar_area");
  const count = document.querySelector("#project_count");
  const childrenCount = parent.children.length + 1;
  count.textContent = childrenCount;
  parent.insertAdjacentHTML(
    "beforeend",
    `<div class="project">
        <div>
            <button class="project_name">${projectName}</button>
         </div> 
         <div>
          <img src="${plus}" class="add_todo_project">
          <button class="delete_project">Delete</button>
         </div>
      </div>
    `
  );
}
