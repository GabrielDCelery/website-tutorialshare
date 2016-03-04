var express = require('express');
var router = express.Router();

var auth = require('./auth');
var test = require('./test');
var log = require('./log');

router.post('/auth/doesuserexist', auth.doesUserExist);
router.post('/auth/login', auth.login);
router.post('/auth/register', auth.register);
router.post('/auth/resetmail', auth.resetMail);
router.post('/auth/reset', auth.reset);

router.get('/log/list', log.list);
router.post('/log/add', log.add);
router.post('/log/delete', log.delete);

module.exports = router;