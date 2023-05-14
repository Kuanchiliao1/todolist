// M Project
// constructor(name = "default")
// m createTodo
// m renameProject
// m deleteProject
// m areTodosAllDone

import createId from './idGenerator';
import TodoFactory from './TodoFactory';

const ProjectFactory = (name = 'Project', active) => {
  const proto = {
    id: createId(),
    name,
    type: 'project',
    todos: [],
    description: null,
    dueDate: null,
    priority: null,
    done: false,
    active: true,
  };

  const addTodo = (todoName) => {
    proto.todos.push(TodoFactory(todoName));
    console.log(`Todo with name ${todoName} was added!`);
  };

  const getTodos = () => proto.todos;

  const deleteTodo = (id) => {
    const todoId = Number(id);
    proto.todos = proto.todos.filter((todo) => todo.id !== todoId);
  };

  const findTodo = (id) => {
    const todoId = Number(id);
    return proto.todos.find((todo) => todo.id === todoId);
  };

  return Object.assign(Object.create(proto), {
    findTodo,
    addTodo,
    deleteTodo,
    getTodos,
  });
};

export default ProjectFactory;
