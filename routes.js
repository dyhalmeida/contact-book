const { Router } = require('express');
const route = new Router();

/** Rota Home */
const HomeController = require('./src/controllers/HomeController');
route.get('/', HomeController.index);

/** Rota Login */
const SessionController = require('./src/controllers/SessionController');
route.get('/session', SessionController.index);
route.post('/session/register', SessionController.create);


module.exports = route;
