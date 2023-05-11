# todolist
Planning:
UI:
- use kevin's grid transition for accordion effect
- dialog elements
- Edit button for editing todo
- Expand button for expanding todo


M Todo
constructor(title, description, dueDate, priority, notes, checklist?)
m deleteTodo
m editTodo
m toggleDone

M Project
constructor(name = "default")
m createTodo
m renameProject
m deleteProject
m areTodosAllDone

M DOM
m render
m bindEventListeners
 m expandProjectTodos
 m expandTodo
 m removeProject
 m removeTodo

M LocalStorage
m setLocalStorage

M App
m new Project

M main.js
- run the app