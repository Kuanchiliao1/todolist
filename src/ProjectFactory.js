// M Project
// constructor(name = "default")
// m createTodo
// m renameProject
// m deleteProject
// m areTodosAllDone

import createId from './idGenerator';
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
  };

  const addTodo = (todoName) => {
    proto.todos.push(TodoFactory(todoName));
    console.log(`Todo with name ${todoName} was added!`);
  };

  const viewTodos = () => {
    console.table(
      proto.todos.map((todo) => ({ name: todo.name, id: todo.id }))
    );
  };

  const deleteTodo = (todoId) => {
    console.log(`todo with id: ${todoId} has been deleted!`);
    proto.todos = proto.todos.filter((todo) => todo.id !== todoId);
  };

  const findTodo = (id) => {
    const todo = proto.todos.find((todo) => todo.id === id);
    console.log('id', todo.id, 'name', todo.name);
  };

  return Object.assign(Object.create(proto), {
    findTodo,
    addTodo,
    deleteTodo,
    viewTodos,
  });
};

export default ProjectFactory;
