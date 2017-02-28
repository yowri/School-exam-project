var log = console.log.bind(console);

$(function(){
	contactController.init();
});

var contactController = {
	init:function(){
		// set listeners

		var cardHeight = $(".content-wrapper").height();

		setBackgroundFullWindowSize("#map");

		$(".info-contact").height(cardHeight);
		contactController.setListeners();
		contactController.resizeWindow();
		contactController.initMap();
	},
	setListeners:function(){
		$('#GlobalSendButton').click(function(){
			contactController.getInputAndTextData($('.contactMailHolder'));
		});
	},
	getInputAndTextData:function(domparent){
		var finalArray = [];
		var inputs = $(domparent).find('input');
		var textAreas = $(domparent).find('textarea');
		var canGo = true;

		for(var i = 0; i < inputs.length; i++){
			var value = $(inputs[i]).val();
			var key = $(inputs[i]).attr('contactID');
			var inValid = $(inputs[i]).hasClass('invalid');
			var errorMessage = $(inputs[i]).attr('errorMessage');
			if(value.length <= 0){
				inValid = true;
			}
			finalArray.push({'ID':key,'value':value,'valid':!inValid,'errorMessage':errorMessage});
		}
		for(var i = 0; i < textAreas.length; i++){
			var value = $(textAreas[i]).val();
			var key = $(textAreas[i]).attr('contactID');
			var inValid = $(textAreas[i]).hasClass('invalid');
			if(value.length <= 0){
				inValid = true;
			}
			var errorMessage = $(textAreas[i]).attr('errorMessage');
			finalArray.push({'ID':key,'value':value,'valid':!inValid,'errorMessage':errorMessage});
		}

		for(var i = 0; i < finalArray.length; i++){
			if(!finalArray[i].valid){
				canGo = false;
				Materialize.toast(finalArray[i].errorMessage, 3000);
			}
		}

		if(canGo == true){
			$('.sendProgressBar').css('display','block');
			var data = {'voornaam':finalArray[0].value,'achternaam':finalArray[1].value,'email':finalArray[2].value,'message':finalArray[3].value};
			Database.callFunction({targetFunction:'contactPageSend',data:data,callback:function(value){
				$('.sendProgressBar').css('display','none');
				Materialize.toast('Uw vraag is successvol verzonden', 3000);
				$(domparent).find('input').val(null);
				$(domparent).find('textarea').val(null);
			},returnObject:false});
		}
	},
	resizeWindow:function(){
		$(window).resize(function(){
			var cardHeight = $(".content-wrapper").height();

				$(".info-contact").height(cardHeight);

				setBackgroundFullWindowSize("#map");
			
				contactController.initMap();
		});
	},
	initMap:function(){
			var myLatLng = {lat: 53.404607, lng: 6.207551};

		  	var map = new google.maps.Map(document.getElementById('map'), {
		    zoom: 16,
		    center: myLatLng,
		    scrollwheel:false
		 	});

		  	var marker = new google.maps.Marker({
		    position: myLatLng,
		    map: map,
		    title: 'Hello World!'
		  });
	}
};

