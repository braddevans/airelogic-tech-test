const Router = require('express').Router;
const router = new Router();
const authHandler = require('../middleware/authMiddleware');

router.get('/', authHandler.isAuthorized, (req, res) => {

})

module.exports = router;