class SessionController {
  async index(req, res) {
    res.render('session'); 
  }
}

module.exports = new SessionController();