import TodoFactory from './TodoFactory';
import ProjectFactory from './ProjectFactory';

const project = ProjectFactory('project name 0');
const project1 = ProjectFactory('project name 1');
const project2 = ProjectFactory('project name 2');


debugger

project.addTodo('test Todo');
project.addTodo('test Todo 2');
project1.addTodo('test Todo1');
project2.addTodo('test Todo2');
console.log(project.deleteTodo(4));
console.log({
  'list todos': project.getProperty('todos').map((todo) => todo.id),
});
