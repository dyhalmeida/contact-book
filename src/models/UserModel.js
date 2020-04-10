const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model('User', UserSchema);

class User {

  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.valid();
    if (this.errors.length) return;
    this.user = await UserModel.findOne({ email: this.body.email });
    if (!this.user) {
      this.errors.push('Usuário inválido');
      return;
    }
    if (!bcrypt.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha invalida');
      this.user = null;
      return;
    }
  }

  async register() {
    
    this.valid();
    
    if (this.errors.length) return;
    await this.userExist();
    if (this.errors.length) return;

    const salt = bcrypt.genSaltSync();
    this.body.password = bcrypt.hashSync(this.body.password, salt);
    this.user = await UserModel.create(this.body);

  }

  async userExist() {
    
    this.user = await UserModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push('Usuário já existe');

  }

  valid() {
    this.clean();
    const { email, password } = this.body;
    if (!validator.isEmail(email)) {
      this.errors.push('E-mail inválido');
    }
    if (password.length < 3 || password.length > 10) {
      this.errors.push('Senha deve conter entre 3 e 10 caracteres');
    }
  }

  clean() {
    for(const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
    const { email, password } = this.body;
    this.body = { email, password };
  }

}

module.exports = User;
