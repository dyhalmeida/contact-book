const Contact = require('../models/ContactModel');

class HomeController {
  async index(req, res) {
    try {
      const contacts = await Contact.index();
      res.render('index', { contacts });
    } catch (error) {
      return res.render('404');
    }
  }
}
module.exports = new HomeController();