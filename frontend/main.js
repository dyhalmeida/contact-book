import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';
import LoginForm from './utils/login';
import ContactForm from './utils/contact';

const loginAccess = new LoginForm('.form-login-access');
const loginCreate = new LoginForm('.form-login-create');
const contactCreate = new ContactForm('.form-contact-create');
loginAccess.init();
loginCreate.init();
contactCreate.init();
