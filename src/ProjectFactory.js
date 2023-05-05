// M Project
// constructor(name = "default")
// m createTodo
// m renameProject
// m deleteProject
// m areTodosAllDone

import createId from './idGenerator';
import crudMethods from './crudMethods';
import TodoFactory from './TodoFactory';

const ProjectFactory = (name) => {
  const proto = {
    id: createId(),
    name,
    type: 'project',
    todos: [],
    description: null,
    dueDate: null,
    priority: null,
    done: false,
    deleted: false,
    clearDeletedTodos() {
      console.table(this);
    },
  };

  const crud = crudMethods(proto);

  const addTodo = (todoName) => {
    proto.todos.push(TodoFactory(todoName));
    console.log('todo added!');
  };

  const viewTodos = () => {
    console.log('viewing todo ids!');
    console.log(proto.todos.map((todo) => todo.id));
  };

  const deleteTodo = (todoId) => {
    const todo = findTodo(todoId);
    todo.markDeleted();
    proto.clearDeletedTodos();
  };

  const findTodo = (id) => proto.todos.find((todo) => todo.id === id);

  return Object.assign(Object.create(crud), proto, {
    findTodo,
    addTodo,
    deleteTodo,
    viewTodos,
  });
};

export default ProjectFactory;
