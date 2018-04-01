var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blossom Academy' });
});


/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Blossom Academy' });
});

/* GET hired page. */
router.get('/coding-bootcamp', function(req, res, next) {
  res.render('index.html', { title: 'Blossom Academy' });
});

module.exports = router;
