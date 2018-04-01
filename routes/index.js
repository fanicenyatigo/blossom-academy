var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blossom Academy' });
});


/* GET about page. */
router.get('/about/:id', function(req, res, next) {
  res.render('about.html', { title: 'Blossom Academy' });
});

/* GET hired page. */
router.get('/coding-bootcamp/:id', function(req, res, next) {
  res.render('coding-bootcamp/index.html', { title: 'Blossom Academy' });
});

module.exports = router;
