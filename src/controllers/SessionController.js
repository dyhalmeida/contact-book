const User = require('../models/UserModel');

class SessionController {

  async index(req, res) {

    if (req.session.user) {
      return res.render('test');
    }
    return res.render('session'); 
    
  }

  async store(req, res) {

    try {
      const user = new User(req.body);
      await user.login();
  
      if (user.errors.length) {
        req.flash('errors', [...user.errors]);
        return req.session.save(() => res.redirect('back'));
      }

      req.flash('success', 'Login realizado com sucesso');
      req.session.user = user.user;
      return req.session.save(() => res.redirect('back'));
  
    } catch (error) {
      console.error(error);
      return res.render('404');
    }
   
  }

  async delete(req, res) {
    req.session.destroy();
    return res.redirect('/');
  }
}

module.exports = new SessionController();