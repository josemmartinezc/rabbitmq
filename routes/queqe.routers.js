const express = require('express');
const router = express.Router();
var QueqeController  = require('../controllers/queqeController');
var queqe = new QueqeController();
router.post('/send', queqe.send);
module.exports = router;
