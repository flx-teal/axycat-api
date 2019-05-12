/*jslint node: true, nomen: true*/
const checkAccessibility = require('../checkAccessibility');
const generatePdf = require('../generatePdf');
const express = require('express');
const router = express.Router();

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

router.get('/report', function (req, res, next) {
	const id = req.query.id;
  generatePdf(id)
    .then(result => {
      res.type('application/pdf');
      res.send(result);
    })
    .catch(error => next(error));
});

module.exports = router;