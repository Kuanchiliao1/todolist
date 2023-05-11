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
    projectlist.addProject();
    activeProject = currentActiveProject();

    // Add two todos to test
    activeProject.addTodo('todo #1');
    activeProject.addTodo('todo #2');

    const contentDiv = document.createElement('div');
    contentDiv.id = 'content';
    contentDiv.innerHTML = `
      <div class="projects-container"></div>
        <div class="container">
          <h1>Todo</h1>
          <div class="todos-container"></div>
          <button class="add-todo-btn">Add todo</button>
        </div>
      </div>
    `;
    document.body.append(contentDiv);
    console.log(document.querySelector('.add-todo-btn'));
    console.log(contentDiv);

    updateScreen();
  };

  const bindEventListeners = () => {
    const contentDiv = document.getElementById('content');
    // This is called an object lookup
    const actions = {
      'add-todo-btn': () => {
        const todoName = prompt('Enter todo name');
        activeProject.addTodo(todoName);
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
