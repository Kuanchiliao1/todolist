import _ from 'lodash';
import Icon from './maxim-tolchinskiy-3v-kCslxqiY-unsplash.jpg';
import ProjectListFactory from './ProjectListFactory';

const ScreenController = () => {
  const projectlist = ProjectListFactory();
  projectlist.addProject();

  const updateScreen = () => {
    const contentDiv = document.getElementById("content");

    // Add the image to our existing div.
    const myIcon = new Image();
    myIcon.src = Icon;

    contentDiv.appendChild(myIcon);
  };

  const renderProjects = () => {
    projectlist.getProjects();
  };

  const initialRender = () => {
    const contentDiv = document.createElement('div');
    contentDiv.id = "content";
    contentDiv.innerHTML = `
      <div class="project-container"></div>
      <div class="todo-container hello"></div>
    `;
    document.body.append(contentDiv)
  }

  const bindEventListeners = () => {};

  initialRender()
  updateScreen();
};

export default ScreenController;
