const express = require('express');
const router = express.Router();
var QueqeController  = require('../controllers/queqeController');
var queqe = new QueqeController();
router.post('/inserIntoQueue', queqe.inserIntoQueue);
router.post('/create', queqe.create);
router.post('/getElementFromQueue', queqe.getElementFromQueue);
router.post('/deleteQueqe', queqe.deleteQueqe);

module.exports = router;
