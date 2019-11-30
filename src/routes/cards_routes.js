const express = require('express');
const router = express.Router();
const CardsController = require('../controllers/cards_controller');

router.post("/add", CardsController.insert_card_challenge);
router.post("/delete",CardsController.delete_card_challenge);
router.post('/update', CardsController.update_card_challenge);
router.get('/view', CardsController.get_cards_challage);

module.exports = router;