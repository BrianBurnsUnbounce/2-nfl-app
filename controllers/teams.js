var express = require('express')
    , router = express.Router()
    , http = require('http')
    , request = require('request')
    , xml2js = require('xml2js');


var baseUrl = 'http://www.fantasyfootballnerd.com/service/';
var apiKey = '7hw378dceajv';

/**
 * GET /teams
 * Get the list of NFL teams
 * URL Structure: /service/{SERVICE-NAME}/{FORMAT}/{API-KEY}/
 */
router.get('/', function (req, response) {

    var teamsUrl = baseUrl + 'nfl-teams/xml/' + apiKey;

    var parser = new xml2js.Parser();

    request.get(teamsUrl, function (err, res) {
        console.log("Attempting parse");
        parser.parseString(res.body, function (err, parsedXml) {
            try {
                console.log("Parsing teams...");
                var team = parsedXml.NFLTeams.Team[0].$.fullName;
                console.log(team);
                response.send(team);
            } catch (err) {
                console.log("error");
                return response.status(400).send({ message: 'XML Parse Error' });
            }
        });

    });
});

module.exports = router;










