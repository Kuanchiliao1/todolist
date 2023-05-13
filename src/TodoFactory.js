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
    expanded: false,
    formHidden: true,
  };

  const toggleDone = () => {
    proto.done = !proto.done;
    console.log(`${proto.name} is done!`);
  };

  const toggleExpanded = () => {
    proto.expanded = !proto.expanded;
    console.log(`${proto.name} is expanded!`);
  };

  // for toggling done, expanded, and formHidden
  const toggleProperty = (property) => {
    proto[property] = !proto[property];
  };

  // Produce a shallow copy so the original cannot be edited from this
  const getTodoObject = () => ({ ...proto });

  const setTodoProperties = (object) => {
    for (const [prop, value] of Object.entries(object)) {
      console.log(prop, ":", value)
      proto[prop] = value;
    }
  };

  return Object.assign(Object.create(proto), {
    toggleDone,
    toggleExpanded,
    toggleProperty,
    getTodoObject,
    setTodoProperties,
  });
};

export default TodoFactory;
