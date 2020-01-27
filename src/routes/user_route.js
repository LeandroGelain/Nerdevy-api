const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.post("/signup", userController.store);
router.post("/login", userController.login);
router.post("/view", userController.show);
router.get("/list", userController.index);

module.exports = router;    