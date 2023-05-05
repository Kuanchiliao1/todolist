import _ from 'lodash';
import Icon from './maxim-tolchinskiy-3v-kCslxqiY-unsplash.jpg';
import ProjectListFactory from './ProjectListFactory';

const ScreenController = () => {
  const projectlist = ProjectListFactory();
  projectlist.addProject();

  const currentActiveProject = () =>
    projectlist.find((project) => project.active);

  const updateScreen = () => {
    const contentDiv = document.getElementById('content');
    renderProjects();

    // // Add the image to our existing div.
    // const myIcon = new Image();
    // myIcon.src = Icon;

    // contentDiv.appendChild(myIcon);
  };

  const renderProjects = () => {
    const projects = projectlist.getProjects();
    projects.forEach((project) => {
      const projectDiv = document.createElement('div');
      const projectContainerDiv = document.querySelector('.projects-container');

      projectDiv.classList.add('project');
      projectDiv.textContent = project.name;
      projectContainerDiv.append(projectDiv);
    });
    console.log(projectlist.getProjects());
  };

  const renderTodos = () => {
    projectlist.getProjects();
  };

  const initialRender = () => {
    const contentDiv = document.createElement('div');
    contentDiv.id = 'content';
    contentDiv.innerHTML = `
      <div class="projects-container">
      </div>
      </div>
      <div class="todos-container">
        <h1>Todo</h1>
      </div>
    `;
    document.body.append(contentDiv);
  };

  const bindEventListeners = () => {};

  initialRender();
  updateScreen();
};

export default ScreenController;
