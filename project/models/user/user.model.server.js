var mongoose = require('mongoose');
var userSchema = require('./user.schema.server.js');
var userModel = mongoose.model('UserProjectModel', userSchema);
var wallModel = require('../wall/wall.model.server.js');

userModel.createUser = createUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.followUser = followUser;
userModel.unfollowUser = unfollowUser;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.findUserByGithubId = findUserByGithubId;
userModel.findAllUsers = findAllUsers;
userModel.searchUsers = searchUsers;


module.exports = userModel;

function searchUsers(username){
	return userModel.find({'$or':[
		{first_name: {$regex : ".*"+username+".*", $options: "i"}},
		{last_name: {$regex : ".*"+username+".*", $options: "i"}}
	]})
}

function createUser(user){
	return userModel.create(user);
}

function findUserByCredentials(username,password){
	return userModel.findOne({username: username, password: password});
}

function findUserById(userId){
	return userModel.findById(userId);
}

function updateUser(userId,newUser){
	return userModel.update({_id: userId},{$set: newUser});
}

function deleteUser(userId){
	return userModel
				.remove({_id: userId})
				.then(function(){
					return wallModel.deleteAllPostsOfUser(userId)
				});
}

function followUser(userId, name){
	return userModel
			.findUserById(userId)
			.then(function(user){
				user.followers.push(name);
				user.save();
				return;
			});
}

function unfollowUser(userId, followId){
	return userModel
				.findUserById(userId)
				.then(function(user){
					if(user.following.length > 0){
						for(i = 0; i < user.following.length; i++){
							if(user.following[i].id == followId){
								user.following.splice(i, 1);
								user.save();
								return;
							}
						}
					} else{
						res.sendStatus(404);
					}
				})
				.then(function(){
					return userModel
								.findUserById(followId)
								.then(function(user){
									for(i = 0; i < user.followers.length; i++){
										if(user.followers[i].id == userId){
											user.followers.splice(i, 1);
											user.save();
											return;
										}
									}
								});
				})
}


function findUserByGoogleId(googleId){
	return userModel.findOne({'google.id':googleId});
}

function findUserByFacebookId(facebookid){
	return userModel.findOne({'facebook.id':facebookid});
}
function findUserByGithubId(githubId){
	return userModel.findOne({'github.id':githubId});
}

function findAllUsers(){
	return userModel.find();
}

