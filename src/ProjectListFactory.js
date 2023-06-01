import createId from './idGenerator';
import ProjectFactory from './ProjectFactory';

const ProjectListFactory = () => {
  const proto = {
    id: createId(),
    type: 'projectlist',
    projects: [],
    description: null,
    dueDate: null,
    priority: null,
    done: false,
  };

  const addProject = (projectName) => {
    proto.projects.push(ProjectFactory(projectName));
    console.log(`Project with name ${projectName} was added!`);
  };

  const getProjects = () => proto.projects;

  const deleteProject = (projectId) => {
    console.log(`project with id: ${projectId} has been deleted!`);
    const id = Number(projectId);
    proto.projects = proto.projects.filter((project) => project.id !== id);
  };

  const findProject = (id) => {
    const project = proto.projects.find((project) => project.id === id);
    console.log('id', project.id, 'name', project.name);
  };

  const setActiveProject = (projectId) => {
    const id = Number(projectId);
    proto.projects.forEach((project) => {
      project.active = id === project.id;
    });
  };

  const getObject = () => ({ ...proto });

  return Object.assign(Object.create(proto), {
    findProject,
    addProject,
    deleteProject,
    getProjects,
    setActiveProject,
    getObject,
  });
};

export default ProjectListFactory;
