module.exports.isAuthorized  = function(req, res, next) {
  const User = require('../database/schema/AuthUser');

  User.findOne({authorised_jwt_token: req.session.token}).exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        var err = new Error('Not authorized! Go back!');
        err.status = 401;
        return next(err);
      } else {
        return next();
      }
    }
  });
}