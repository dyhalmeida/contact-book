import validator from 'validator';

export default class Contact {

  constructor(selector) {
    this.form = document.querySelector(selector);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.isValid(event);
    });
  }

  isValid(event) {
    
    const element = event.target;

    const nameInput = element.querySelector("input[name='name']");
    const emailInput = element.querySelector("input[name='email']");
    const telephoneInput = element.querySelector("input[name='telephone']");
    let error = false;

    if (!nameInput.value || nameInput.value.length < 3) {
      alert('Nome do contato deve conter no mínimo 3 caracteres');
      error = true;
    }

    if (!validator.isEmail(emailInput.value)) {
      alert('E-mail inválido');
      error = true;
    }

    if (telephoneInput.value.length < 11 || telephoneInput.value.length > 11) {
      alert('Telefone deve ter 12 caracteres. Ex: 71982212621');
      error = true;
    }

    if (!error) {
      element.submit();
    }

  }

}