const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login_controller');

// router.get("/", loginController.login);
router.post("/cadastro", loginController.insert_user);
router.post("/login", loginController.login)

module.exports = router;