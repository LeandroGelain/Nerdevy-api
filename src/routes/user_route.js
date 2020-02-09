const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post("/signup", UserController.insert_user);
router.post("/login", UserController.login);
router.post("/view", UserController.view);
router.post("/edit", UserController.edit);
router.get("/list", UserController.list);

module.exports = router;