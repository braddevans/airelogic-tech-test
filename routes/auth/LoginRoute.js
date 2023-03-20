const Router = require('express').Router;
const router = new Router();
const SharedFunctions = require('../../utils/SharedFunctions');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class LoginRoute {
  constructor(DatabaseHandler) {
    this.DatabaseHandler = DatabaseHandler;
    this.router = router;
    this.SharedFunctions = SharedFunctions;
    this.router.get('/', (req, res) => {
      // check if cookie is set with jwt token and compare to sequelize token
      if (![null, undefined].includes(req.headers.token)) {

      }
      this.DatabaseHandler.get_authuser_model().findOne({
        where: {
          authorised_jwt_token: req.headers.cookies.jwt_auth
        }
      }).then(user => {
        if (user !== null) {
          return res.status(200).json({
            message: 'already logged in'
          })
        } else {
          return res.status(200).json({
            message: 'not logged in'
          })
        }
      });
    });

    this.router.post('/', (req, res) => {
      // check if cookie is set with jwt token and compare to sequelize token
      let user = this.DatabaseHandler.get_authuser_model().findOne({where:{username: req.body.username}});
      if (user !== null) {
        // user exists

        // check password with bcrypt
        if (bcrypt.compare(req.body.password, user.password)) {
          // sign jwt token to send in response
          let token = jwt.sign({username: user.username}, process.env.JWT_SECRET, {expiresIn: '12h'}, (err, token) => {
            if (err) {
              return res.status(500).json({
                message: 'Internal server error'
              })
            }
            return res.status(200).json({
              message: 'logged in',
              token: token
            })
          })

          res.document.cookie = `jwt_token=${token}; SameSite=None; Secure`;
          this.DatabaseHandler.get_authuser_model().updateOne({where: {username: user.username}, set: {authorised_jwt_token: token}}).then(() => {
            SharedFunctions.log_debug("User " + user.username + " logged in");
            SharedFunctions.log_debug("User JWT Token has been updated will expire automatically in 12 hours");
          })
          console.log("cookie set");
        } else {
          return res.status(401).json({
            message: 'incorrect password'
          })
        }
      }
    })
  }

  get_router() {
    return this.router;
  }
}

module.exports = LoginRoute;