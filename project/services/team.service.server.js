var app = require('../../express.js');
const https = require('https');
var q = require('q');
 
app.get('/api/team/:teamId', findTeam);

function findTeam(req, res) {
    var teamId = req.params['teamId'];
    getTeamDetails(teamId)
        .then(function(response){
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}


function getTeamDetails(teamId){
    var key = process.env.SPORTSRADAR_CLIENT_ID;
    var urlBase = "https://api.sportradar.us/nfl-ot1/teams/"+teamId+"/profile.json?api_key="+key;
    var deferred = q.defer();
    https.get(urlBase, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch(e) {
                deferred.reject({error: e});
            }
        });
    });
    return deferred.promise;
}