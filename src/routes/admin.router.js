const express = require('express');
const productsController = require('../controllers/productsController.js'); 
const ticketsController = require('../controllers/ticketsController.js');
const { isAdmin } = require('../middleware/auth.js');

const router = express.Router();

router.get('/realtimeproducts', isAdmin, productsController.realTimeProducts);

router.get('/tickets', isAdmin, ticketsController.getTickets)

module.exports = router;
