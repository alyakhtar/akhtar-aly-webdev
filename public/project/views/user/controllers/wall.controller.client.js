(function(){
	angular
		.module('Project')
		.controller('wallController', wallController)

		function wallController($location, $interval, $routeParams, userService, $route, currentUser){

			var model = this;

			var userId = currentUser._id;
			model.userId = userId;

			model.addPhotoToPost = addPhotoToPost;
			model.newPost = newPost;
			model.deletePost = deletePost;
			model.likePost = likePost;
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
			model.logout = logout;
			model.searchUsers = searchUsers;


			function init(){
				model.imageUrl = false;
				userService
					.findUserById(userId)
					.then(function(user){
						model.user = user;
					})
					.then(function(){
						userService	
							.findAllPosts(model.user.team)
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
					});
			}	
			init();

			function searchUsers(username){
				if(username !== ""){
					userService
						.searchUsers(username)
						.then(function(users){
							checkUsers(users)
						});
				} else{
					model.users = [];
				}
			}

			function checkUsers(users){
				for(var u in users){
					if(users[u].username === 'admin'){
						users.splice(u,1)
					}
					if(users[u].username === model.user.username){
						users.splice(u,1)
					}
				}
				model.users = users;
			}

			function logout(){
	            userService
	                .logout()
	                .then(function(){
	                    $location.url('/login');
	                });
	        }

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


			function deletePost(postId){
				userService
					.deletePost(postId, userId)
					.then(function(){
						userService	
							.findAllPosts(model.user.team)
							.then(function(posts){
								model.posts = posts;
							});
					});
			}

			function editPost(post){
				if(post.userId === userId){
					model.edit = true;
					hashtags = post.hashtags.join(" ");
					post.text += " " + hashtags;
					model.post = post;
				}
			}

			function updatePost(post){
				post = checkHashTags(post);
				post.edited = true;
				userService
					.updatePost(post)
					.then(function(posts){
						userService	
							.findAllPosts(model.user.team)
							.then(function(posts){
								model.posts = posts;
								model.edit = false;
								model.imageUrl = false;
							});
						model.post = '';
					});
			}

			function likePost(postId){
				userService
					.likePost(postId, model.userId)
					.then(function(){
						userService	
							.findAllPosts(model.user.team)
							.then(function(posts){
								model.posts = posts;
							});
					})
			}

			function addComment(postId, com){
				comment = {}
				comment.text = com;
				comment.userId = model.userId;
				comment.userImage = model.user.image;
				comment.user = model.user.first_name + ' '+ model.user.last_name;
				comment.time = new Date();
				
				userService
					.addComment(postId, comment)
					.then(function(){
						$route.reload();
					});
			}

			function deleteComment(commentId, postId){
				userService
					.deleteComment(model.userId, postId, commentId)
					.then(function(posts){
						userService	
							.findAllPosts(model.user.team)
							.then(function(posts){
								model.posts = posts;
							});
					});
			}


			function quantity(postId){
				for(var p in model.commentQuantity){
					if(model.commentQuantity[p].postId == postId){
						return model.commentQuantity[p].quant;
					}	
				}
			}

			function showMoreComments(postId){
				for(var p in model.commentQuantity){
					if(model.commentQuantity[p].postId == postId){
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
				var months = days/30;

				if(parseInt(months) > 0){
					if(parseInt(months) == 1){
						return parseInt(months).toString() + ' month ago';
					} else{
						return parseInt(months).toString() + ' months ago';
					}
				} else if(parseInt(days) > 0){
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