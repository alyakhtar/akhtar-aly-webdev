var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
	name: {type: String, unique: true},
	teamId: String,
	url: String
}, {collection: 'projectTeams'});

module.exports = teamSchema;