import { format } from "date-fns";
export default class Dialog {
  #dialog;
  #openBtn;
  #exitBtn;
  #form;
  constructor() {
    this.#dialog = document.querySelector("#dialog");
    let dateStr = format(new Date(), "yyyy-MM-dd");
    const date = document.querySelector("#date");
    date.setAttribute("min", dateStr);
    date.setAttribute("value", dateStr);
    this.#openBtn = document.querySelector("#add_todo");
    this.#exitBtn = document.querySelector("#exit_dialog");
    this.#form = document.querySelector("#form");
    this.#eventListeners();
  }

  #eventListeners() {
    this.#openBtn.addEventListener("click", () => this.open());
    this.#exitBtn.addEventListener("click", () => this.close());
    this.#dialog.addEventListener("click", (e) => this.#closeOnOutsideClick(e));
  }

  open() {
    this.#dialog.showModal();
  }

  close() {
    this.#dialog.close();
    this.#form.reset();
  }

  extendDialog(projectName) {
    const form_content = document.querySelector("#form_content");
    form_content.insertAdjacentHTML(
      "beforeend",
      `
      <div>
      <p>${projectName}</p>
      </div>`
    );
  }

  #closeOnOutsideClick(e) {
    const rect = this.#dialog.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      this.close();
    }
  }
}
