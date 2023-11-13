const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
      res.render('landing');
    } else {
      next();
    }
};
  
module.exports = withAuth;