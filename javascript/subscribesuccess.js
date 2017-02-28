
$(function(){
	resizeWindow();
	backgroundInit();
  setSubscription();
});

function resizeWindow(){
	$(window).resize(function(){
		setBackgroundFullWindowSize('.success-container');
		resizeWindow();
	});
}

function backgroundInit() {
	setBackgroundFullWindowSize('.success-container');
}


function setSubscription(){
  var token = getUrlParam('vtok');

  Database.callFunction({targetFunction:'addSubscribor',data:{userID:token.split('_')[0],cursusID:token.split('_')[1]},callback:function(data){
      }
  });


  console.log();
}