const express = require('express');
const router = express.Router();
const CardsController = require('../controllers/cards_controller');

router.post("/add", CardsController.store);
router.post("/delete",CardsController.delete);
router.post('/update', CardsController.update);
router.post('/listLimit', CardsController.index);
router.post('/findById', CardsController.show);
router.post('/insertMember', CardsController.insertMember);
router.post('/removeMember', CardsController.removeMember);

module.exports = router;