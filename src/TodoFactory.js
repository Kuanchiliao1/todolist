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
    expanded: false
  };

  const toggleDone = () => {
    proto.done = !proto.done;
    console.log(`${proto.name} is done!`);
  };

  const toggleExpanded = () => {
    proto.expanded = !proto.expanded;
    console.log(`${proto.name} is expanded!`);
  };

  return Object.assign(Object.create(proto), { toggleDone, toggleExpanded });
};

export default TodoFactory;
