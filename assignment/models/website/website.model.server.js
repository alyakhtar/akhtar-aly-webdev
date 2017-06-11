var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server.js');
var userModel = require('../user/user.model.server.js');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);


websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById =findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

function createWebsiteForUser(userId, website){
	return websiteModel
				.create(website)
				.then(function(website){
					return userModel
								.findUserById(userId)
								.then(function(user){
									website._user = user._id;
									user.websites.push(website._id);
									website.save();
		                            user.save();
		                            return website;
								}, function(err){
									return err;
								});
				}, function(err){
					return err;
				});
}

function findAllWebsitesForUser(userId){
	return websiteModel.find({"_user": userId})
}

function findWebsiteById(websiteId){
	return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId,newWebsite){
	return websiteModel.update({_id: websiteId},{$set: newWebsite});
}

function deleteWebsite(websiteId){
	return websiteModel
			.findById(websiteId).populate('_user')
			.then(function(website){
				index = website._user.websites.indexOf(websiteId);
				website._user.websites.splice(index,1);
				website._user.save();
				return websiteModel.remove({_id: websiteId});
			});
}