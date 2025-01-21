import { renderTodo } from "./createTodo";
import { format } from "date-fns";
export default class SidebarEvents {
  #todos;
  constructor(todos) {
    this.#todos = todos;
    this.header = document.querySelector("#content h2");
    this.todosBtn = document.querySelector("#todos_btn_sidebar");
    this.todayBtn = document.querySelector("#today_btn_sidebar");
    this.sortByDateBtn = document.querySelector("#sortby_btn_sidebar");
    this.filterBtn = document.querySelector("#filter_btn_sidebar");
    this.radio_buttons = document.querySelector(".filter_radio_buttons");
    this.sidebar = document.querySelector("#sidebar");
    this.#eventListeners();
  }

  #eventListeners() {
    this.todosBtn.addEventListener("click", (e) => this.#renderTodos(e));
    this.todayBtn.addEventListener("click", (e) => this.#filterByDate(e));
    this.sortByDateBtn.addEventListener("click", (e) => this.#sortByDate(e));
    this.filterBtn.addEventListener("click", (e) => this.#showRadioButtons(e));
    this.sidebar.addEventListener("change", (e) => this.#filterByPriority(e));
  }

  #renderTodos(e) {
    const text = e.currentTarget.children[1].textContent;
    this.header.textContent = text;
    renderTodo(this.#todos.todosArray);
  }

  #filterByDate(e) {
    const text = e.currentTarget.children[1].textContent;
    this.header.textContent = text;
    const todayDate = new Date();
    const formattedDate = format(todayDate, "dd/MM/yyyy");
    renderTodo(this.#todos.filterByDate(formattedDate));
  }

  #sortByDate(e) {
    const text = e.currentTarget.children[1].textContent;
    this.header.textContent = text;
    renderTodo(this.#todos.sortByDate());
  }

  #showRadioButtons(e) {
    const text = e.currentTarget.children[1].textContent;
    this.header.textContent = text;
    this.radio_buttons.classList.toggle("hide");
  }

  #filterByPriority(e) {
    if (e.target.matches("input")) {
      const element = e.target;
      const header = document.querySelector("#content h2");
      header.textContent = `Filter By Priority: ${element.value.toUpperCase()}`;
      renderTodo(this.#todos.filterByPriority(element.value));
    }
  }
}
