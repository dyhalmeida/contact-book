const validator = require('validator');

export default class Login {

  constructor(selector) {
    this.form = document.querySelector(selector);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) {
      return;
    }
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.isValid(event);
    });
  }

  isValid(event) {
    
    const element = event.target;
    const emailInput = element.querySelector("input[name='email']");
    const passwordInput = element.querySelector("input[name='password']");
    let error = false;

    if (!validator.isEmail(emailInput.value)) {
      alert('E-mail inválido');
      error = true;
    }

    if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
      alert('Senha deve conter entre 3 e 50 caracteres');
      error = true;
    }

    if (!error) {
      element.submit();
    }

  }

}