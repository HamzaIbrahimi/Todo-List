import "./css/normalize.css";
import "./css/style.css";
import { Todo, Todos } from "./Todo.js";
const allTodos = new Todos();
allTodos.add(new Todo("fix machine", "manual", "2025-01-15", 4));
allTodos.add(new Todo("gym", "personal", "2024-12-15", 2));
allTodos.add(new Todo("read book", "personal", "2023-01-15", 4));
allTodos.add(new Todo("apply for job", "manual", "2024-11-07", 4));
allTodos.add(new Todo("fix table", "manual", "2025-01-30", 4));

allTodos.sortByDate().forEach((todo) => console.log(todo.toString()));
