const express = require('express');
const router = express.Router();
const CardsController = require('../controllers/cardsController');

router.post("/add", CardsController.insert_card);
router.post("/delete",CardsController.delete_card);
router.post('/update', CardsController.update_card);
router.post('/listLimit', CardsController.get_cards);
router.post('/findById', CardsController.get_card_by_id);
router.post('/insertMember',CardsController.insert_member_on_card);
router.post('/removeMember', CardsController.removeMember);
router.post('/findByMember', CardsController.findByMember);

module.exports = router;