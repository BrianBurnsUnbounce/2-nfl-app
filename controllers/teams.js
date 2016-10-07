var express = require('express')
    , router = express.Router();


// var baseUrl = 'http://www.fantasyfootballnerd.com/service/';
// var apiKey = '7hw378dceajv';

/**
 * GET /teams
 * Get the list of NFL teams
 * URL Structure: /service/{SERVICE-NAME}/{FORMAT}/{API-KEY}/
 */
router.get('/', function (req, res) {

    req.get('http://www.fantasyfootballnerd.com/service/nfl-teams/xml/test/', function (err, request, xml) {
        if (err) return next(err);
        parser.parseString(xml, function (err, parsedXml) {
            if (err) return next(err);
            try {
                var team = parsedXml.NFLTeams.team[0].$.fullName;
            } catch (err) {
                return res.status(400).send({ message: 'XML Parse Error' });
            }
        })
    });

    res.render('teams');

});

module.exports = router;










