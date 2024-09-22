const express = require('express');
const jwt = require('jsonwebtoken');

const {CreateUser, login, verifyUser} = require('../controller/usercontroller');

const router = express.Router();

router.post('/signup', CreateUser);
router.post('/login', login, verifyUser);
router.get('/verify', verifyUser);

module.exports = router;