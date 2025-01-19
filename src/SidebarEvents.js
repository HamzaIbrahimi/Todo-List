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
    this.sideBar = document.querySelector(".bottom_area");
    this.#eventListeners();
  }

  #eventListeners() {
    this.todosBtn.addEventListener("click", (e) => this.#renderTodos(e));
    this.todayBtn.addEventListener("click", (e) => this.#filterByDate(e));
    this.sortByDateBtn.addEventListener("click", (e) => this.#sortByDate(e));
    // this.filterBtn.addEventListener("click", (e) => this.#showRadioButtons(e), {
    //   once: true,
    // });
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

  //   #showRadioButtons(e) {
  //     this.#renderFilterHtml();
  //     const text = e.currentTarget.children[1].textContent;
  //     this.header.textContent = text;
  //     const parent = e.currentTarget.parentElement;
  //     console.log(parent);
  //     console.log(parent.nextElementSibling);
  //     parent.nextElementSibling.classList.toggle("hide");
  //   }

  //   #renderFilterHtml() {
  //     this.sideBar.insertAdjacentHTML(
  //       "beforebegin",
  //       `
  //     <div class="filter_radio_buttons">
  //         <input type="radio" name="filtered_radios" id="" value="low" >
  //         <input type="radio" name="filtered_radios" id="" value = "medium">
  //         <input type="radio" name="filtered_radios" id="" value = "high">
  //     </div>
  //         `
  //     );
  //   }
}
