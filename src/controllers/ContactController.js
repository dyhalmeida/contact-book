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

  async update(req, res) {
    if (!req.params.id) {
      return res.render('404');
    }
    try {
      const contact = new Contact(req.body);
      await contact.update(req.params.id);

      if (contact.errors.length) {
        req.flash('errors', contact.errors);
        return req.session.save(() => res.redirect('back'));
      }

      req.flash('success', 'Contato alterado com sucesso');
      return req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));

    } catch (error) {
      console.error(error);
      return res.render('404');
    }
  }

  async delete(req, res) {
    
    if (!req.params.id) return res.render('404');
   
    try {
      const contact = await Contact.delete(req.params.id);
      if (!contact) return res.render('404');  
      req.flash('success', 'Contato excluido com sucesso');
      return req.session.save(() => res.redirect('back'));
    } catch (error) {
      console.error(error);
      return res.render('404');
    }
    
  }

}

module.exports = new ContactController();