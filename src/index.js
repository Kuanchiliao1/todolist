import './style.css';
import _ from 'lodash';
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import TodoFactory from './TodoFactory';
import ProjectFactory from './ProjectFactory';
import ProjectListFactory from './ProjectListFactory';
import ScreenController from './ScreenController';

library.add(faCheck);
dom.watch();

ScreenController();
const projectlist = ProjectListFactory('project list #1');
