import createId from './idGenerator';
import crudMethods from './crudMethods';

const TodoFactory = (name) => {
  const proto = {
    id: createId(),
    name,
    type: 'todo',
    description: null,
    dueDate: null,
    priority: null,
    done: false,
    deleted: false,
  };

  const crud = crudMethods(proto);

  return Object.assign(Object.create(proto), crud);
};

export default TodoFactory;
