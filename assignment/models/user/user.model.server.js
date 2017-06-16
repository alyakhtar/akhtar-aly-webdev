var mongoose = require('mongoose');
var userSchema = require('./user.schema.server.js');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUser =findAllUser;
userModel.findUserByUsername =findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.findUserByGithubId = findUserByGithubId;

module.exports = userModel;

function findUserByGoogleId(googleId){
	return userModel.findOne({'google.id':googleId});
}

function findUserByFacebookId(facebookid){
	return userModel.findOne({'facebook.id':facebookid});
}
function findUserByGithubId(githubId){
	return userModel.findOne({'github.id':githubId});
}

function createUser(user){
	return userModel.create(user);
}

function findUserById(userId){
	return userModel.findById(userId);
}

function findAllUser(){
	return userModel.find();
}

function findUserByUsername(username){
	return userModel.findOne({username: username});
}

function findUserByCredentials(username,password){
	return userModel.findOne({username: username, password: password});
}

function updateUser(userId,newUser){
	return userModel.update({_id: userId},{$set: newUser});
}

function deleteUser(userId){
	return userModel.remove({_id: userId});
}