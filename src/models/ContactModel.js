const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false, default: '' },
  telephone: { type: String, required: false, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body) {
  this.body = body;
  this.errors = [];
  this.contact = null;
}

Contact.prototype.update = async function(id) {

  this.valid();
  if (this.errors.length) return;
  this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });

}

Contact.prototype.register = async function() {
  
  this.valid();

  if (this.errors.length) return;
  this.contact = await ContactModel.create(this.body);
  
}

Contact.prototype.valid = function() {

  this.clean();

  /** Valida e-mail */
  if (this.body.email && !validator.isEmail(this.body.email)) {
    this.errors.push('E-mail inválido');
  }

  /** Valida name vazio */
  if (!this.body.name) {
    this.errors.push('Campo nome obrigatório');
  }

  /** Valida email ou telfone */
  if (!this.body.email || !this.body.telephone) {
    this.errors.push('É necessário pelo menos e-mail ou telepone');
  }

}

Contact.prototype.clean = function() {
  for (const key in this.body) {
    if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }
  this.body = {
    name: this.body.name,
    email: this.body.email,
    telephone: this.body.telephone
  }
}

/** Static Method */
Contact.show = async function(id) {
  const contact = await ContactModel.findById(id);
  return contact;
}

Contact.index = async function() {
  return await ContactModel.find().sort({ createdAt: -1 });
}

Contact.delete = async function(id) {
  return await ContactModel.findOneAndDelete({ _id: id });
}

module.exports = Contact;
