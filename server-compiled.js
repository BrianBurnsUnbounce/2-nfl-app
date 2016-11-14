'use strict';

var express = require('express');
var request = require('request');

var key = '7hw378dceajv/';
var baseUrl = 'http://www.fantasyfootballnerd.com/service/';
var format = 'json/';

// Create a router
var router = express.Router();

var playerList = ["Andrew Luck", "Matt Forte"];

// Set up the collection routes

/**
 * GET /
 * Return the list of NFL teams
 */
router.get(['/'], function (req, res, next) {
    console.log('NFL teams');

    // Compose the url request for the teams
    var teamsListUrl = baseUrl + 'nfl-teams/' + format + key;

    // Get the list of teams
    request.get(teamsListUrl, function (err, response, body) {
        if (err) throw err;

        var parsed = JSON.parse(body);
        console.log(parsed);
        res.send(parsed);
    });
});

/**
 * GET /<team>/schedule
 * Return a list of a teams schedule
 */
router.get('/:team/schedule', function (req, res, next) {
    console.log(req.params['team'] + '\'s schedule');

    // Compose the url request for a teams schedule
    var teamScheduleUrl = baseUrl + 'schedule/' + format + key;
    console.log(teamScheduleUrl);

    // Get the full NFL schedule for all teams
    request.get(teamScheduleUrl, function (err, response, body) {
        if (err) throw err;

        // Parse the JSON response body
        var parsed = JSON.parse(body);
        console.log(parsed);

        // Filter the JSON to just return fixtures for the required team
        var teamSchedule = [];
        for (var i = 0; i < parsed.Schedule.length; i++) {
            if (parsed.Schedule[i].awayTeam === req.params['team'] || parsed.Schedule[i].homeTeam === req.params['team']) {
                teamSchedule.push(parsed.Schedule[i]);
            }
        }
        console.log(teamSchedule);
        res.send(teamSchedule);
    });
});

/**
 * GET /<team>/players
 * Return a list of the teams players
 */
router.get('/:team/players', function (req, res, next) {
    console.log(req.params['team'] + '\'s players');
    var team = req.params['team'];

    // Compose the url request for a teams schedule
    var teamPlayersUrl = baseUrl + 'players/' + format + key;

    // Get the full list of players for all teams
    request.get(teamPlayersUrl, function (err, response, body) {
        if (err) throw err;

        var parsed = JSON.parse(body);

        // Filter the JSON to just return players matching the selected team
        var players = [];
        console.log("Team: " + team);
        for (var i = 0; i < parsed.Players.length; i++) {
            if (parsed.Players[i].team === team) {
                players.push(parsed.Players[i]);
            }
        }
        console.log(players);
        res.send(players);
    });
});

/**
 * GET /rank/:position/:week
 * Return a ranked list of players score in a position for the previous week
 */
router.get('/rank/:position/:week', function (req, res, next) {
    console.log("Position: " + req.params['position']);
    console.log("Week: " + req.params['week']);

    var rankingsUrl = baseUrl + 'weekly-rankings/' + format + key + req.params['position'] + "/" + req.params['week'] + "/0";
    console.log(rankingsUrl);

    // Get the rank of players for the position provided
    request.get(rankingsUrl, function (err, response, body) {
        if (err) throw err;

        var parsed = JSON.parse(body);

        console.log(parsed.Rankings);
        res.send(parsed.Rankings);
    });
});

/**
 * GET /projection/:position/:week
 * Return a ranked list of the projected score of players in a position for a week
 */
router.get('/projection/:position/:week', function (req, res, next) {
    console.log("Position: " + req.params['position']);
    console.log("Week: " + req.params['week']);

    var projectionsUrl = baseUrl + 'weekly-projections/' + format + key + req.params['position'] + "/" + req.params['week'] + "/0";

    // Get the projections of players for the position provided
    request.get(projectionsUrl, function (err, response, body) {
        if (err) throw err;

        var parsed = JSON.parse(body);

        console.log(parsed.Projections);
        res.send(parsed.Projections);
    });
});

/**
 * GET /my-team
 * Return the players on my team
 */
router.get('/my-team', function (req, res, next) {
    console.log("My team");

    // http://www.fantasyfootballnerd.com/service/players/xml/7hw378dceajv/
    var playersUrl = baseUrl + 'players/' + format + key;
    console.log(playersUrl);

    request.get(playersUrl, function (err, response, body) {
        if (err) throw err;

        var parsed = JSON.parse(body);

        console.log(parsed.Players);
        console.log("Player List: " + playerList[0]);

        // <Players>
        // {/*<Player playerId="1" active="0" jersey="0" lname="Ainge" fname="Erik" displayName="Erik Ainge"*/}

        // Filter the JSON to just return just the players in my team
        var playersStats = [];
        for (var i = 0; i < playerList.length; i++) {
            console.log("I: " + i);
            for (var j = 0; j < parsed.Players.length; j++) {
                console.log("J: " + j);
                if (playerList[i] === parsed.Players[j].displayName) {
                    playersStats.push(parsed.Players[j]);
                    console.log(playerList[i]);
                    break;
                }
            }
        }
        res.send(playersStats);
    });
});

var app = express();

app.use('/', router).use(express.static(__dirname + '/public')).listen(3000, function () {
    console.log('Listening on port 3000...');
});

//# sourceMappingURL=server-compiled.js.map