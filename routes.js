const { Router } = require('express');
const route = new Router();

/** Rota Home */
const HomeController = require('./src/controllers/HomeController');
route.get('/', HomeController.index);

/** Rota Login */
const SessionController = require('./src/controllers/SessionController');
const UserController = require('./src/controllers/UserController');
route.get('/session', SessionController.index);
route.post('/session/login', SessionController.store);
route.post('/session/register', UserController.store);


module.exports = route;
