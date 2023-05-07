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

    // // Add the image to our existing div.
    // const myIcon = new Image();
    // myIcon.src = Icon;

    // contentDiv.appendChild(myIcon);
  };

  const renderProjects = () => {
    const projects = projectlist.getProjects();
    const projectsContainerDiv = document.querySelector('.projects-container');

    projects.forEach((project) => {
      const projectDiv = document.createElement('div');

      projectDiv.classList.add('project');
      projectDiv.id = project.id;
      projectDiv.textContent = project.name;
      projectsContainerDiv.append(projectDiv);
    });
  };

  const renderTodos = () => {
    // Add two todos to test
    activeProject.addTodo('todo #1');
    activeProject.addTodo('todo #2');

    const todos = activeProject.getTodos();
    const todosContainerDiv = document.querySelector('.todos-container');

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

    const contentDiv = document.createElement('div');
    contentDiv.id = 'content';
    contentDiv.innerHTML = `
      <div class="projects-container">
      </div>
      </div>
      <div class="todos-container">
        <h1>Todo</h1>
        <button class="add-todo-btn">Add todo</button>
      </div>
    `;
    document.body.append(contentDiv);

    renderProjects();
    renderTodos();
  };

  const bindEventListeners = () => {
    const contentDiv = document.getElementById('content');
    contentDiv.addEventListener("click", (event) => {

      if (event.target.matches(".add-todo-btn")) {
        console.log(event.target);
        activeProject.addTodo("test");
        updateScreen();
      }
    });
  };

  initialRender();
  updateScreen();
  bindEventListeners();
};

export default ScreenController;
