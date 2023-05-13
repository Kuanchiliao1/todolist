import _ from 'lodash';
import Icon from './maxim-tolchinskiy-3v-kCslxqiY-unsplash.jpg';
import ProjectListFactory from './ProjectListFactory';

const ScreenController = () => {
  const projectlist = ProjectListFactory();
  let activeProject;

  const currentActiveProject = () =>
    (activeProject = projectlist
      .getProjects()
      .find((project) => project.active));

  const updateScreen = () => {
    const contentDiv = document.getElementById('content');
    renderTodos();
    renderProjects();

    // // Add the image to our existing div.
    // const myIcon = new Image();
    // myIcon.src = Icon;

    // contentDiv.appendChild(myIcon);
  };

  const renderProjects = () => {
    const projects = projectlist.getProjects();
    const projectsContainerDiv = document.querySelector('.projects-container');
    projectsContainerDiv.innerHTML = '';

    projects.forEach((project) => {
      const projectDiv = document.createElement('div');

      projectDiv.classList.add('project');
      projectDiv.id = project.id;
      projectDiv.textContent = project.name;
      projectsContainerDiv.append(projectDiv);
    });
  };

  const renderTodos = () => {
    const todos = activeProject.getTodos();
    const todosContainerDiv = document.querySelector('.todos-container');
    todosContainerDiv.innerHTML = '';

    todos.forEach((todo) => {
      const todoDiv = document.createElement('div');

      todoDiv.classList.add('todo');
      todoDiv.id = todo.id;
      todoDiv.textContent = todo.name;
      todosContainerDiv.append(todoDiv);
    });
  };

  const initialRender = () => {
    // This is the first default project
    projectList.addProject();
    activeProject = currentActiveProject();

    // Add two todos to test
    activeProject.addTodo('todo #1');
    activeProject.addTodo('todo #2');

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
        debugger;
        todo.toggleProperty('formHidden');
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

      if (action) {
        action(event.target.id);
        updateScreen();
      }
    });
  };

  initialRender();
  updateScreen();
  bindEventListeners();
};

export default ScreenController;
