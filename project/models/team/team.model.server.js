var mongoose = require('mongoose');
var teamSchema = require('./team.schema.server.js');
var teamModel = mongoose.model('TeamProjectModel', teamSchema);

teamModel.getTeams = getTeams;
teamModel.updateTeam = updateTeam;

module.exports = teamModel;

function getTeams(){
	return teamModel.find();
}

function updateTeam(teamId, team){
	return teamModel.update({_id: teamId},{$set: team});
}

