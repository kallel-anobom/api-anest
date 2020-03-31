const express = require('express');

const UserController = require('./controllers/UserController');
const TasksController = require('./controllers/TaskController');
const RoleController = require('./controllers/RoleController');

const routes = express.Router();

// Users
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users/:user_id', UserController.update);

//Tasks
routes.get('/users/:user_id/tasks', TasksController.index);
routes.post('/users/:user_id/tasks', TasksController.store);
routes.put('/users/:user_id/tasks/:task_id', TasksController.update);
routes.delete('/users/:user_id/tasks', TasksController.delete);

//Roles
routes.get('/users/:user_id/roles', RoleController.index);
routes.post('/users/:user_id/roles', RoleController.store);
routes.delete('/users/:user_id/roles', RoleController.delete);


module.exports = routes;