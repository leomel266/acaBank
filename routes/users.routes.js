const { Router } = require('express');
const { register, loginUser } = require('../controllers/users.controller');

const router = Router();

router.post('/signup', register);

router.get('/login', loginUser);

module.exports = {
  usersRouter: router,
};
