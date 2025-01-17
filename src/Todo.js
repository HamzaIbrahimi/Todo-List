import { format, compareAsc } from "date-fns";

export class Todo {
  #title;
  #description;
  #dueDate;
  #priority;
  #realDate;

  constructor(title, description, dueDate, priority) {
    this.#title = title;
    this.#description = description;
    this.#realDate = new Date(dueDate);
    this.#dueDate = format(this.#realDate, "dd/MM/yyyy");
    this.#priority = priority;
  }

  get title() {
    return this.#title;
  }

  get description() {
    return this.#description;
  }

  get dueDate() {
    return this.#dueDate;
  }

  get date() {
    return this.#realDate;
  }

  get priority() {
    return this.#priority;
  }

  toString() {
    return `${this.title} | with priority ${this.priority} | date: [${this.dueDate}]`;
  }
}

export class Todos {
  #todosArray;

  constructor() {
    this.#todosArray = [];
  }

  get todosArray() {
    return this.#todosArray;
  }

  add(todo) {
    this.todosArray.push(todo);
  }

  get size() {
    return this.todosArray.length;
  }

  remove(todo) {
    const index = this.#findIndexOfTodo(todo);
    if (index >= 0) {
      this.todosArray.splice(index, 1);
    }
  }

  #findIndexOfTodo(todo) {
    const index = this.todosArray.findIndex((elem) => {
      return (
        elem.title == todo.title &&
        elem.dueDate == todo.dueDate &&
        elem.description == todo.description
      );
    });
    return index;
  }

  filterByPriority(priority) {
    this.todosArray.filter((todo) => todo.priority === priority);
  }

  sortByDate() {
    return this.todosArray.sort((a, b) => compareAsc(a.date, b.date));
  }

  print() {
    //for debugging remove later
    this.todosArray.forEach((todo) => console.log(todo.toString()));
  }
}
