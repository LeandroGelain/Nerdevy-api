const express = require('express');
const router = express.Router();
const loginController = require('../controllers/user_controller');

router.post("/signup", loginController.store);
router.post("/login", loginController.login);
router.post("/view", loginController.show);
router.get("/list", loginController.index);

module.exports = router;