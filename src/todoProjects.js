import { Todo } from "./Todo.js";
import TodoDOMHandler from "./DOM.js";
const DOM = new TodoDOMHandler();
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
  count.textContent = parent.children.length + 1;
  const projectDiv = DOM.createHTMLElement("div", undefined, "todo_project");
  DOM.appendChildren(projectDiv, [
    DOM.createHTMLElement("div", projectName, "project_name"),
    DOM.createHTMLElement("div", undefined, "todo_project_count"),
  ]);
  parent.appendChild(projectDiv);
}
