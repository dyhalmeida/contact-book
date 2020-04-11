const Contact = require('../models/ContactModel');

class ContactController {

  async store(req, res) {
    
   try {
      const contact = new Contact(req.body);
      await contact.register();

      if (contact.errors.length) {
        req.flash('errors', contact.errors);
        return req.session.save(() => res.redirect('back'));
      }

      req.flash('success', 'Contato cadastrado com sucesso');
      return req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
   } catch (error) {
      console.error(error);
      return res.render('404');
   }

  }

  async index(req, res) {
    return res.render('contact', { contact: {} });
  }

  async show(req, res) {
    if (!req.params.id) {
      return res.render('404');
    }
    const contact = await Contact.show(req.params.id);
    if (!contact) {
      return res.render('404');
    }
    return res.render('contact', { contact });
  }
}

module.exports = new ContactController();