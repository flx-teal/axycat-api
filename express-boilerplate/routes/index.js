/*jslint node: true, nomen: true*/
const checkAccessibility = require('../checkAccessibility');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.send({
		title: 'Express app'
	});
});

router.post('/check', function (req, res, next) {
  const { url } = req.body;
  checkAccessibility(url)
    .then(result => res.send(result))
    .catch(error => next(error));
});

module.exports = router;