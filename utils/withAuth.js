const withAuth = (req, res, next) => {
    if (req.session.loggedIn) {
      res.redirect('/landing');
    } else {
      next();
    }
};
  
module.exports = withAuth;