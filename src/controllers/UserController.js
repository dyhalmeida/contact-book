const User = require('../models/UserModel');

class UserController {

  async store(req, res) {

    try {
      const user = new User(req.body);
      await user.register();
  
      if (user.errors.length) {
        req.flash('errors', [...user.errors]);
        return req.session.save(() => res.redirect('back'));
      }

      req.flash('success', 'Usuário criado com sucesso');
      req.session.user = user.user;
      return req.session.save(() => res.redirect('back'));
  
    } catch (error) {
      console.error(error);
      return res.render('404');
    }
   
  }
}

module.exports = new UserController();