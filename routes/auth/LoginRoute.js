const Router = require('express').Router;
const router = new Router();
const SharedFunctions = require('../../utils/SharedFunctions');
const AuthUser = require('../../database/schema/AuthUser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  // check if cookie is set with jwt token and compare to db token
  if (AuthUser.findOne({authorised_jwt_token: req.cookies.jwt_auth}) !== null) {
    return res.status(200).json({
      message: 'already logged in'
    })
  }
})

router.post('/', (req, res) => {
  // check if cookie is set with jwt token and compare to db token
  let user = AuthUser.findOne({username: req.body.username});
  if (user !== null) {
    // user exists

    // check password with bcrypt
    if (bcrypt.compare(req.body.password, user.password)) {
      // sign jwt token to send in response
      let token = jwt.sign({username: user.username}, process.env.JWT_SECRET, { expiresIn: '12h' }, (err, token) => {
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
      AuthUser.updateOne({username: user.username}, {$set: {authorised_jwt_token: token}}).then(() => {
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

module.exports = router;