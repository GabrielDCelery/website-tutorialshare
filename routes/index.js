var express = require('express');
var router = express.Router();

var auth = require('./auth');
var test = require('./test');
var entry = require('./entry');

router.post('/auth/doesuserexist', auth.doesUserExist);
router.post('/auth/login', auth.login);
router.post('/auth/register', auth.register);
router.post('/auth/resetmail', auth.resetMail);
router.post('/auth/reset', auth.reset);

router.get('/log/list', entry.list)

module.exports = router;