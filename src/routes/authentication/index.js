const express = require('express');
const router = express.Router();
const {AuthenticationController} = require('../../controller');
const { authJwt } = require("../../../src/middleware");

router.post('/signup', AuthenticationController.signup);
router.post('/login',AuthenticationController.login);

module.exports = router;