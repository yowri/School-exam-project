$(function(){
	mailVerif.init();
});

var mailVerif = {
	data:{
		verifToken:''
	},
	init:function(){
		mailVerif.data.verifToken = getUrlParam('vtok');
		setTimeout(function(){
			mailVerif.checkMailVerif();
		},5);
		
	},
	checkMailVerif:function(){
		if(mailVerif.data.verifToken != undefined){
			Database.callFunction({targetFunction:'activateAccount',data:{token:mailVerif.data.verifToken},callback:function(result){
				// done
			},returnObject:false});
		} else {
			// if is null
		}
	}
}