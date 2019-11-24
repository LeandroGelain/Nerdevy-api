const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login_controller');

router.post("/signup", loginController.insert_user);
router.post("/login", loginController.login)

module.exports = router;