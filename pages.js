var Firebase = require('firebase');

var firebase = new Firebase('https://vnds-wiki.firebaseio.com/');
var pages = firebase.child('data');

var router = require('express').Router();

router.use(require('body-parser').json());
router.use(require('cookie-parser')());

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/api/page', function (req, res) {
    var title = req.query.title;
    pages.orderByChild('title')
        .equalTo(title)
        .on('value', function(data) {
            res.json({
                content: data.val()
            });
        })
});

module.exports = router;
