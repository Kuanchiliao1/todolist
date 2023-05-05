import createId from './idGenerator';

const TodoFactory = (name, project) => {
  const proto = {
    id: createId(),
    name,
    project,
    type: 'todo',
    description: null,
    dueDate: null,
    priority: null,
    done: false,
  };

  const toggleDone = () => {
    proto.done = !proto.done;
    console.log(`${proto.name} is done!`);
  };

  return Object.assign(Object.create(proto), { toggleDone });
};

export default TodoFactory;
