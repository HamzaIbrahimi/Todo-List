import { renderTodo } from "./createTodo";
import { addTodoProject } from "./todoProjects.js";
import { format } from "date-fns";
import { storeProjectDivs, sendTodosToLocalStorage } from "./storage.js";

export default class SidebarEvents {
  #todos;
  #dialog;
  constructor(todos, dialog) {
    this.#todos = todos;
    this.#dialog = dialog;
    this.sidebar = document.querySelector("#sidebar");
    this.header = document.querySelector("#content h2");
    this.todosBtn = document.querySelector("#todos_btn_sidebar");
    this.todayBtn = document.querySelector("#today_btn_sidebar");
    this.sortByDateBtn = document.querySelector("#sortby_btn_sidebar");
    this.filterBtn = document.querySelector("#filter_btn_sidebar");
    this.radio_buttons = document.querySelector(".filter_radio_buttons");
    this.projectBtn = document.querySelector(".sidebar_add_project");
    this.projectsSidebarArea = document.querySelector("#projects_sidebar_area");
    this.#eventListeners();
  }

  #eventListeners() {
    this.todosBtn.addEventListener("click", (e) => this.#renderTodos(e));
    this.todayBtn.addEventListener("click", (e) => this.#filterByDate(e));
    this.sortByDateBtn.addEventListener("click", (e) => this.#sortByDate(e));
    this.filterBtn.addEventListener("click", () => this.#showRadioButtons());
    this.sidebar.addEventListener("change", (e) => this.#filterByPriority(e));
    this.projectBtn.addEventListener("click", () => this.#showProjectForm());
    this.sidebar.addEventListener("submit", (e) => {
      this.#createProjectOnFormSubmit(e);
    });
    this.projectsSidebarArea.addEventListener("click", (e) =>
      this.#openDialog(e)
    );
    this.projectsSidebarArea.addEventListener("click", (e) =>
      this.#removeProject(e)
    );
    this.projectsSidebarArea.addEventListener("click", (e) =>
      this.#filterByProject(e)
    );
  }

  #renderTodos(e) {
    const text = e.currentTarget.children[1].textContent;
    this.header.textContent = text;
    renderTodo(this.#todos.todosArray);
    this.noContentToShow();
  }

  #filterByDate(e) {
    const text = e.currentTarget.children[1].textContent;
    this.header.textContent = text;
    const todayDate = new Date();
    const formattedDate = format(todayDate, "dd/MM/yyyy");
    renderTodo(this.#todos.filterByDate(formattedDate));
    this.noContentToShow();
  }

  #sortByDate(e) {
    const text = e.currentTarget.children[1].textContent;
    this.header.textContent = text;
    renderTodo(this.#todos.sortByDate());
    this.noContentToShow();
  }

  #showRadioButtons() {
    this.radio_buttons.classList.toggle("hide");
  }

  #filterByPriority(e) {
    if (e.target.matches(`input[type="radio"]`)) {
      const element = e.target;
      const header = document.querySelector("#content h2");
      header.textContent = `Filter By Priority: ${element.value.toUpperCase()}`;
      renderTodo(this.#todos.filterByPriority(element.value));
      this.noContentToShow();
    }
  }

  #showProjectForm() {
    document.querySelector("#form_for_project_name").classList.toggle("hide");
  }

  #createProjectOnFormSubmit(e) {
    e.preventDefault();
    if (e.target.id === "form_for_project_name") {
      const input = document.querySelector("#form_project");
      addTodoProject(input.value);
      e.target.reset();
      storeProjectDivs();
    }
  }

  #openDialog(e) {
    if (e.target.matches(".add_todo_project")) {
      const sibling = e.target.parentElement.previousElementSibling;
      this.#dialog.extendDialog(sibling.firstElementChild.textContent);
      this.#dialog.open();
    }
  }

  #removeProject(e) {
    if (e.target.matches(".delete_project")) {
      let project = e.target.closest(".project");
      let projectName = project.firstElementChild;
      this.#todos.removeProject(projectName.firstElementChild.textContent);
      this.#todos.print();
      project.remove();
      sendTodosToLocalStorage(this.#todos.todosArray);
      storeProjectDivs();
      renderTodo(this.#todos.todosArray);
      this.noContentToShow();
    }
  }

  #filterByProject(e) {
    if (e.target.matches(".project_name")) {
      let project = e.target.closest(".project");
      let parent = project.firstElementChild;
      let projectName = parent.firstElementChild.textContent;
      this.header.textContent = `Project: ${projectName}`;
      renderTodo(this.#todos.filterByProjectName(projectName));
      this.noContentToShow();
    }
  }

  noContentToShow() {
    const todoContainer = document.querySelector("#todo_content");
    if (!todoContainer.firstElementChild) {
      todoContainer.innerHTML = "";
      todoContainer.insertAdjacentHTML(
        "beforeend",
        `<div class = "no_todos"> No todos to show</div>`
      );
    }
  }
}
