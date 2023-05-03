import createId from './idGenerator';

const TodoFactory = (
  name,
  description = null,
  dueDate = null,
  priority = null,
  done = false,
  deleted = false
) => {
  const todoObj = {
    id: createId(),
    name,
    description,
    dueDate,
    priority,
    done,
    deleted,
  };

  const setTodoProperty = (property, value) => {
    todoObj[property] = value;
  };

  const getTodoProperty = (property) => todoObj[property];

  const getTodoObj = () => todoObj;

  const deleteTodo = () => {
    todoObj.deleted = true;
  };

  return { setTodoProperty, getTodoProperty, getTodoObj, deleteTodo };
};

export default TodoFactory;
