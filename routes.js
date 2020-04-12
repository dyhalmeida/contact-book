const { Router } = require('express');
const route = new Router();

const { loginRequired } = require('./src/middlewares/middleware');

/** Rota Home */
const HomeController = require('./src/controllers/HomeController');
route.get('/', HomeController.index);

/** Rota Login */
const SessionController = require('./src/controllers/SessionController');
const UserController = require('./src/controllers/UserController');
route.get('/session', SessionController.index);
route.post('/session/login', SessionController.store);
route.get('/session/logout', SessionController.delete);
route.post('/session/register', UserController.store);

/** Rota contatoc */
const ContactController = require('./src/controllers/ContactController');
route.get('/contact', loginRequired, ContactController.index);
route.get('/contact/:id', loginRequired, ContactController.show);
route.put('/contact/:id', loginRequired, ContactController.update);
route.get('/contact/delete/:id', loginRequired, ContactController.delete);
route.post('/contact', loginRequired, ContactController.store);


module.exports = route;
