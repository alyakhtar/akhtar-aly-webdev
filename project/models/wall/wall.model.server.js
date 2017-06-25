var mongoose = require('mongoose');
var wallSchema = require('./wall.schema.server.js');
var wallModel = mongoose.model('WallProjectModel', wallSchema);

wallModel.createPost = createPost;
wallModel.findPostsByTeamName = findPostsByTeamName;
wallModel.findPostById = findPostById;
wallModel.deletePost = deletePost;
wallModel.updatePost = updatePost;
wallModel.likePost = likePost;
wallModel.commentPostById = commentPostById
wallModel.deleteComment = deleteComment;
wallModel.deleteAllPostsOfUser = deleteAllPostsOfUser;

module.exports = wallModel;

function createPost(post){
	return wallModel.create(post);
}

function findPostsByTeamName(team){
	return  wallModel.find({team:team});
}

function findPostById(postId){
	return wallModel.findById(postId);
}

function deletePost(postId){
	return wallModel.remove({_id: postId});
}

function updatePost(postId, newPost){
	return wallModel.update({_id: postId},{$set: newPost});
}

function likePost(postId, userId){
	
	return wallModel
				.findById(postId)
				.then(function(post){
					if(post){
		                if(post.likesBy.indexOf(userId) >  -1){
		                    post.like -= 1;
		                    var ind = post.likesBy.indexOf(userId);
		                    post.likesBy.splice(ind, 1);
		                    post.save();
		                    return;
		                } else{
		                    post.like += 1;
		                    post.likesBy.push(userId);
		                    post.save();
		                    return;
		                }
					}
				});
}


function commentPostById(postId, comment){
	return wallModel
				.findById(postId)
				.then(function(post){
					if(post){
						comment._id = post.comments.length;
						post.comments.push(comment)
						post.save();
						return;
					} else{
						res.sendStatus(404);
					}
				});
}

function deleteComment(postId, commentId, userId){
	return wallModel
				.findById(postId)
				.then(function(post){
					if(post){
						for(i = 0; i < post.comments.length; i++){
							if(post.comments[i]._id == commentId &&
								post.comments[i].userId == userId){
								post.comments.splice(i, 1);
								post.save();
								return;
							}
						}
					} else{
						res.sendStatus(404);
					}
				});
}

function deleteAllPostsOfUser(userId){
	return wallModel.remove({userId: userId});
}


