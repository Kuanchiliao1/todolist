export default TodoFactory = (
  name,
  description = null,
  dueDate = null,
  priority = null,
  done = false
) => {
  const todoObj = {
    name,
    description,
    dueDate,
    priority,
    done,
  };

  const setTodoProperty = (property, value) => {
    todoObj[property] = value;
  };

  const getTodoProperty = (property) => todoObj[property];

  const getTodoObj = () => todoObj;

  const deleteTodo = () => {};

  return { setTodoProperty, getTodoProperty, getTodoObj };
};
