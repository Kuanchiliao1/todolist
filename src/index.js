import TodoFactory from './TodoFactory';

const todo = TodoFactory('test Todo');
const todo2 = TodoFactory('test Todo2');

console.log("obj: ", todo.getObject());
console.log(todo2.getTodoObj());
