$(function(){
	userController.initUser();
});

var userController = {
	getuser:function(){
		if(JSON.parse(sessionStorage.getItem('userData')) != null){
			return JSON.parse(sessionStorage.getItem('userData'));
		}
	},
	setUser:function(userObject){
		var res = JSON.stringify(userObject);
		sessionStorage.setItem('userData', res);
		setTimeout(function(){
			Database.callFunction({targetFunction:'updateUserData',data:{ID:userObject.UserID}});
		},10);
	},
	clearuserData:function(){
		sessionStorage.setItem('userData', null);
	},
	initUser:function(){

			if(userController.getuser() != null && userController.getuser() != "" && userController.getuser() != undefined){
				console.log('here');
				userController.setUser(userController.getuser());

				if($("#LoginID").length > 0){

					$("#LoginID").attr('href','javascript:;');
					$('.MijnAccountLink').css('display','block');
					$("#LoginID").html('Uitloggen');
					$("#LogoName").css("font-size","20px");
					$("#LoginID").click(function(event){
						userController.signOut(event);
					});
				}
			} else {
				$(".MijnAccountLink").remove();
			}
	},
	signOut:function(event){
		event.preventDefault();
		userController.clearuserData();
		Database.callFunction({targetFunction:'logOut'});
		window.location.assign("./");
	}
}