const express = require('express')
const router = express.Router();

const FriendController = require('../controllers/friendsController');

router.post("/addFriend", FriendController.store);
router.post("/removeFriend", FriendController.delete);
router.post("/showFriends", FriendController.show);

module.exports = router;