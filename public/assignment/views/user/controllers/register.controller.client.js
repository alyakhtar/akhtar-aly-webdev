(function (){
	angular
		.module('WebAppMaker')
		.controller('registerController', registerController);

	function registerController($location,userService){

		var model = this;
		model.register = register;

		function register(username, password, vpassword){
			var un = angular.element(document.querySelector('#username'));
            var ps = angular.element(document.querySelector('#password'));
            var vps = angular.element(document.querySelector('#vpassword'));
			if (!username && !password && !vpassword){
				model.message = 'Please enter username and password';
				un.addClass('validate');
                ps.addClass('validate');
                vps.addClass('validate');
                model.messageUsername='';
                model.messagePassword='';
                model.messageVPassword='';
                model.passwordsMatch='';
			} else if(!username){
				model.messageUsername = 'Please enter username';
				un.addClass('validate');
                ps.removeClass('validate');
                vps.removeClass('validate');
                model.message='';
                model.messagePassword='';
                model.messageVPassword='';
                model.passwordsMatch='';
			} else if(!password && !vpassword){
				model.messagePassword = 'Please enter password';
				model.messageVPassword = 'Please verify password';
				un.removeClass('validate');
                ps.addClass('validate');
                vps.addClass('validate');
                model.message='';
                model.messageUsername='';
                model.passwordsMatch='';
			} else if(!password){
				model.messagePassword = 'Please enter password';
				un.removeClass('validate');
                ps.addClass('validate');
                vps.removeClass('validate');
                model.message='';
                model.messageUsername='';
                model.messageVPassword='';
                model.passwordsMatch='';
			} else if(!vpassword){
				model.messageVPassword = 'Please verify password';
				un.removeClass('validate');
                ps.removeClass('validate');
                vps.addClass('validate');
                model.message='';
                model.messageUsername='';
                model.messagePassword='';
                model.passwordsMatch='';
			} else{
				if (password === vpassword){
					userService
						.findUserByUsername(username)
						.then(
							function(user){
								if(user === null){
									var newUser = {
										username: username,
										password: password,
									}
									userService
										.register(newUser)
										.then(function(user){
											$location.url('/profile');
										});	
								} else{
									model.message = 'User Already Exists!!';
									un.addClass('validate');
					                ps.removeClass('validate');
					                vps.removeClass('validate');
					                model.messageUsername='';
					                model.messagePassword='';
					                model.messageVPassword='';
					                model.passwordsMatch='';
								}
							},
							function(){
								model.message = 'User Already Exists!!';
								un.addClass('validate');
				                ps.removeClass('validate');
				                vps.removeClass('validate');
				                model.messageUsername='';
				                model.messagePassword='';
				                model.messageVPassword='';
				                model.passwordsMatch='';
						});
				} else{
					model.passwordsMatch = 'Passwords do not match';
					un.removeClass('validate');
	                ps.addClass('validate');
	                vps.addClass('validate');
	                model.message='';
	                model.messageUsername='';
	                model.messagePassword='';
	                model.messageVPassword='';
				}
			}
		}
	}
})();