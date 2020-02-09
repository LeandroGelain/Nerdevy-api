const express = require('express');
const router = express.Router();
const CardsController = require('../controllers/cardsController');

router.post("/add", CardsController.insert_card_challenge);
router.post("/delete",CardsController.delete_card_challenge);
router.post('/update', CardsController.update_card_challenge);
router.post('/listLimit', CardsController.get_cards_challenge);
router.post('/findById', CardsController.get_card_by_id);

module.exports = router;