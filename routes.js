const { Router } = require('express');
const route = new Router();

/** Rota Home */
const HomeController = require('./src/controllers/HomeController');
route.get('/', HomeController.index);


module.exports = route;
