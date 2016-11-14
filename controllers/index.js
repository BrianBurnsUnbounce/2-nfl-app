
var express = require('express')
    , router = express.Router();

// router.use('/comments', require('./comments'));

router.use('/teams', require('./teams.js'));

router.get('/', function(req, res) {
    res.render('./views/index.html');
});

module.exports = router;










