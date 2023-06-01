import _ from 'lodash';
import ProjectListFactory from './ProjectListFactory';

const ScreenController = () => {
  const projectList = ProjectListFactory();

  let activeProject;

  const currentActiveProject = () =>
    (activeProject = projectList
      .getProjects()
      .find((project) => project.active));

  const updateScreen = () => {
    renderTodos();
    renderProjects();
  };

  const renderProjects = () => {
    const projects = projectList.getProjects();
    const projectsContainerDiv = document.querySelector('.projects-container');
    projectsContainerDiv.innerHTML = '';

    projects.forEach((project) => {
      const projectDiv = document.createElement('div');
      const isActive = activeProject.id === project.id;
      isActive
        ? projectDiv.classList.add('project', 'active')
        : projectDiv.classList.add('project');
      projectDiv.dataset.projectId = project.id;
      projectDiv.textContent = project.name;
      projectsContainerDiv.append(projectDiv);

      const projectDeleteBtn = document.createElement('button');
      projectDeleteBtn.dataset.projectId = project.id;
      projectDeleteBtn.classList.add('project-delete-btn');

      projectDeleteBtn.append(createIcon('fas', 'fa-x'));

      projectDiv.append(projectDeleteBtn);
    });
  };

  const renderTodos = () => {
    const todos = activeProject.getTodos();
    const todosContainerDiv = document.querySelector('.todos-container');
    todosContainerDiv.innerHTML = '';

    todos.forEach((todo) => {
      const todoDiv = createTodoDiv(todo);
      todosContainerDiv.append(todoDiv);
      if (!todo.formHidden) {
        todosContainerDiv.append(createTodoForm(todo));
      }
    });
  };

  const createTodoDiv = (todo, container) => {
    const todoDiv = document.createElement('div');

    todoDiv.classList.add('todo');
    todoDiv.dataset.todoId = todo.id;

    const todoDeleteBtn = document.createElement('button');
    todoDeleteBtn.append(createIcon('fas', 'fa-x'));
    todoDeleteBtn.dataset.todoId = todo.id;
    todoDeleteBtn.classList.add('todo-delete-btn');

    const todoEditBtn = document.createElement('button');
    todoEditBtn.append(createIcon('fas', 'fa-edit'));
    todoEditBtn.dataset.todoId = todo.id;
    todoEditBtn.classList.add('todo-edit-btn');

    const todoNameP = document.createElement('p');
    todoNameP.textContent = `${todo.name}`;

    const todoDueDateP = document.createElement('p');
    todoDueDateP.textContent = `Due date: ${todo.dueDate || 'none'}`;
    todoDiv.append(todoNameP, todoDueDateP);

    todoDiv.append(todoEditBtn, todoDeleteBtn);
    return todoDiv;
  };

  const createTodoForm = (todo) => {
    if (todo.formHidden) return;

    const todoInfoForm = document.createElement('form');
    todoInfoForm.dataset.todoId = todo.id;
    const todoObject = todo.getTodoObject();
    for (const [prop, value] of Object.entries(todoObject)) {
      const formProperties = ['name', 'description', 'dueDate'];
      if (formProperties.includes(prop)) {
        const input = document.createElement('input');
        input.value = value;
        input.name = prop;
        const label = document.createElement('label');
        label.textContent = prop[0].toUpperCase() + prop.slice(1).toLowerCase();
        if (prop === 'dueDate') {
          input.type = 'date';
          label.textContent = 'Due date';
        }
        todoInfoForm.append(label, input);
      }
    }
    // eslint-disable-next-line no-restricted-syntax
    const button = document.createElement('button');
    button.textContent = 'SUBMIT';
    button.classList.add('todo-submit-edit-btn');
    button.dataset.todoId = todo.id;
    todoInfoForm.append(button);
    return todoInfoForm;
  };

  const createIcon = (...classes) => {
    const icon = document.createElement('i');
    icon.classList.add(...classes);
    return icon;
  };

  const initialRender = () => {
    // This is the first default project
    projectList.addProject();
    activeProject = currentActiveProject();

    // Add two todos to test
    activeProject.addTodo('Test todo 1');
    activeProject.addTodo('Test todo 2');

    const contentDiv = document.createElement('div');
    contentDiv.id = 'content';
    contentDiv.innerHTML = `
      <header>
        <div class="projects-container">
        </div>
        <button class="add-project-btn">
          <i class="fas fa-plus"></i>
        </button>
      </header>
      <div class="container">
        <div style="display: flex; justify-content: center;">
          <h1>Todos</h1>
          <button class="add-todo-btn"><i class="fas fa-plus"></i></button>
        </div>
        <div class="todos-container"></div>
      </div>
    `;
    document.body.append(contentDiv);
    updateScreen();
    bindEventListeners();
  };

  const storeToLocal = () => {
    const localCompatibleObject = projectList.getObject();
    localCompatibleObject.projects = projectList.projects.map((project) => {
      const projectObject = project.getObject();
      projectObject.todos = project.todos.map((todo) => todo.getTodoObject())
      return projectObject;
    });
    console.log(localCompatibleObject);
    // Figure out data structure compatible with localStorage
    // use the shell, then fill in "projects" property of projectList with appropriate
    // do the same for todos of projects

    // To load from local:
    // Add method to retrieve methods of target,
  };

  const retrieveFromLocal = () => {
    
  }

  const bindEventListeners = () => {
    const contentDiv = document.getElementById('content');
    // This is called an object lookup
    const actions = {
      'add-todo-btn': () => {
        const todoName = prompt('Enter todo name');
        activeProject.addTodo(todoName);
      },
      'todo-edit-btn': (todoId) => {
        activeProject.findTodo(todoId).toggleProperty('formHidden');
      },
      'todo-submit-edit-btn': (todoId) => {
        const todo = activeProject.findTodo(todoId);
        todo.toggleProperty('formHidden');
        const inputs = document.querySelectorAll(
          `form[data-todo-id="${todoId}"] input`
        );
        const inputsObject = [...inputs].reduce((obj, input) => {
          obj[input.name] = input.value;
          console.log(input.name);
          return obj;
        }, {});
        todo.setTodoProperties(inputsObject);
      },
      'add-project-btn': () => {
        projectList.addProject('Project');
      },
      'delete-project-btn': (projectId) => {
        projectList.deleteProject(projectId);
      },
      'todo-delete-btn': (todoId) => {
        activeProject.deleteTodo(todoId);
      },
      'project-delete-btn': (projectId) => {
        projectList.deleteProject(projectId);
      },
      project: (projectId) => {
        projectList.setActiveProject(projectId);
        currentActiveProject();
      },
    };

    contentDiv.addEventListener('click', (event) => {
      event.preventDefault();
      const action = actions[event.target.className];
      const { todoId } = event.target.dataset;
      const { projectId } = event.target.dataset;

      if (action) {
        if (todoId) {
          action(todoId);
        } else if (projectId) {
          action(projectId);
        } else {
          action();
        }
        updateScreen();

        localStorage.setItem('projectlist', JSON.stringify(projectList));

        // It does NOT store methods, nor the prototype of the children
        storeToLocal();
      }
    });
  };

  initialRender();
};

export default ScreenController;
