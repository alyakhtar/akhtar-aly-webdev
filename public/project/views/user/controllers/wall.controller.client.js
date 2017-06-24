(function(){
	angular
		.module('Project')
		.controller('wallController', wallController)

		function wallController($location, $interval, $routeParams, userService, $route){

			var model = this;

			var userId = $routeParams['userId'];
			model.userId = userId;

			model.addPhotoToPost = addPhotoToPost;
			model.newPost = newPost;
			model.deletePost = deletePost;
			model.likeComment = likeComment;
			model.addComment = addComment;
			model.deleteComment = deleteComment;
			model.editPost = editPost;
			model.updatePost = updatePost;
			model.quantity = quantity;
			model.showMoreComments = showMoreComments;
			model.calculateTime = calculateTime;
			model.postQuantity = 7;
			model.morePosts = morePosts;
			model.postEdited = postEdited;


			function init(){
				model.imageUrl = false;
				userService
					.findUserById(userId)
					.then(function(user){
						model.user = user;
					})

				userService	
					.findAllPosts(model.userId)
					.then(function(posts){
						model.posts = posts;
					})
					.then(function(){
						model.commentQuantity = [];
						for(var p in model.posts){
							quantity = {}
							var id = model.posts[p]._id;

							quantity.quant = 1;
							quantity.postId = id;
							model.commentQuantity.push(quantity);
						}
					});


			}	
			init();

			function addPhotoToPost(){
				if(!model.imageUrl){
					model.imageUrl = true;
				} else{
					model.imageUrl = false;
				}
			}

			function newPost(post){
				post = checkHashTags(post);
				post.team = model.user.team;
				post.userId = model.user._id;
				post.userImage = model.user.image;
				post.time = new Date();
				post.like = 0;
				post.likesBy = [];
				post.hidden = false;
				post.comments = [];
				post.name = model.user.first_name +' '+ model.user.last_name;
				userService
					.createNewPost(post)
					.then(function(posts){
						model.posts = posts;
						$route.reload();
					});
			}

			function checkHashTags(post){
				words = post.text.split(" ");
				hashtags = [];
				text = [];
				sentence = '';
				for(var w in words){
					if(words[w].indexOf('#') > -1){
						if(words[w].indexOf('\n') > -1){
							wrds = words[w].split("\n");
							text.push(wrds[0]);
							hashtags.push(wrds[1]);
						} else{
							hashtags.push(words[w]);
						}
					} else{
						text.push(words[w]);
					}
				}

				for(var t in text){
					sentence += " "+text[t];
				}
				post.text = sentence;
				post.hashtags = hashtags;
				return post
			}


			function deletePost(postId,userId){
				userService
					.deletePost(postId)
					.then(function(posts){
						model.posts = posts;
					});
			}

			function likeComment(postId){
				userService
					.likePost(postId, model.userId)
					.then(function(posts){
						model.posts = posts;
					})
			}

			function addComment(postId, com){
				comment = {}
				comment.text = com;
				comment.userId = model.userId;
				comment.userImage = model.user.image;
				comment.user = model.user.first_name + ' '+ model.user.last_name;
				comment.time = new Date();
				comment.image = model.user.image;
				
				userService
					.addComment(postId, comment)
					.then(function(posts){
						model.posts = posts;
						$route.reload();
					});
			}

			function deleteComment(commentId, postId){
				userService
					.deleteComment(model.userId, postId, commentId)
					.then(function(posts){
						model.posts = posts;
					});
			}

			function editPost(post){
				model.edit = true;
				model.post = post;
			}

			function updatePost(post){
				post.edited = true;
				userService
					.updatePost(post)
					.then(function(posts){
						model.posts = posts;
						$route.reload();
						model.post = '';
					});
			}

			function quantity(postId){
				for(var p in model.commentQuantity){
					if(model.commentQuantity[p].postId == parseInt(postId)){
						return model.commentQuantity[p].quant;
					}	
				}
			}

			function showMoreComments(postId){
				for(var p in model.commentQuantity){
					if(model.commentQuantity[p].postId == parseInt(postId)){
						model.commentQuantity[p].quant += 2;
						return model.commentQuantity[p].quant;
					}	
				}

			}

			function calculateTime(oldTime){
				var date = new Date(oldTime);
				var currentDate = new Date();
				var miliseconds = currentDate - date;
				var seconds = miliseconds/1000;
				var minutes = seconds/60;
				var hours = minutes/60;
				var days = hours/24;

				if(parseInt(days) > 0){
					if(parseInt(days) == 1){
						return parseInt(days).toString() + ' day ago';
					} else{
						return parseInt(days).toString() + ' days ago';
					}
				} else if(parseInt(hours) > 0){
					if(parseInt(hours) == 1){
						return parseInt(hours).toString() + ' hour ago';
					} else{
						return parseInt(hours).toString() + ' hours ago';
					}
				} else if(parseInt(minutes) > 0){
					if(parseInt(minutes) == 1){
						return parseInt(minutes).toString() + ' minute ago';
					} else{
						return parseInt(minutes).toString() + ' minutes ago';
					}
				} else{
					return 'just now';
				}
			}

			function morePosts(){
				model.postQuantity += 3;
			}

			function postEdited(postEdit){
				if(postEdit){
					return 'Edited';
				}
			}

		}
})();