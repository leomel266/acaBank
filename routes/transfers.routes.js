const { Router } = require('express');
const { transferAmount } = require('../controllers/transfers.controller');

const router = Router();

router.post('/', transferAmount);

module.exports = {
  transfersRouter: router,
};
