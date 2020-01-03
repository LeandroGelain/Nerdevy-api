const express = require('express');
const router = express.Router();
const loginController = require('../controllers/user_controller');

router.post("/signup", loginController.insert_user);
router.post("/login", loginController.login);
router.post("/view", loginController.view);
router.get("/list", loginController.list);

module.exports = router;