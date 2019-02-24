const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/login', ctrlUser.authenticate);
router.get('/logout', jwtHelper.verifyJwtToken, ctrlUser.logout);
router.get('/user-details', jwtHelper.verifyJwtToken, ctrlUser.userProfile);


module.exports = router;
