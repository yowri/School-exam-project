

var log = console.log.bind(console);
var cursusID = getUrlParam('id');

$(function(){
	loginInit();

	

});

function loginInit(){
	listeners();
	getUserData();
}
function getUserData(){
	
	var aantal = 0;
	

	setTimeout(function(){
		Database.callFunction({targetFunction:'getAllActiveCursus',callback:function(data){
			

			for(var i = 0; i < data.length ; i ++){
				
				if(data[i].cursustypeID == cursusID){
						addDates(data[i].datum_begin,data[i].ID);
						$('.cursus_naam').text(data[i].naam);

						if(currentUser != undefined){
							console.log();
							var dataSubscribtion = {userID:getUserID,cursusID:0,email:currentUser.Email,prijs:data[i].prijs};
							// user is ingelogd
							hideLogin(dataSubscribtion);
							setInputs();
						}
				}
			}	
		}});
	},200);	
}
function addDates(date,ID){
	$('.pick-date').append('<option value="'+ID+'">'+date+'</option>');
}
function resizeWindow(){
		$(window).resize(function(){
			setBackgroundFullWindowSize('.loginContainer');
		});
	}
function hideLogin(data){
	$('.baseLogin').css('display', 'none');
	$('.subscribe_user').removeClass('m6');
	$('.subscribe_user').addClass('m12');
	$('.password-hide').hide();
	$('#RegisterButton').hide();
	$('#subscribe-new-user').show();
	$('#subscribe-new-user').click(function(){
		subscribeCurrentUserClick(data);
	});
}

function listeners(){
	$("#RegisterLink").click(function(){
		$(".baseLogin").fadeOut('fast',function(){
			clearInput();
			fadeIn($(".baseRegister"));
		});
	});

	$("#goBackRegister").click(function(){
		$(".baseRegister").fadeOut('fast',function(){
			clearInput();
			window.location.href = 'cursus'
		});
	});

	$("#forgotpasswordBase").click(function(){
		$(".baseLogin").fadeOut('fast',function(){
			clearInput();
			fadeIn($(".forgotPassword"));
		});
	});

	$("#vraagAanGlobal").click(function(){
		vraagAan();
	});

	$("#RegisterButton").click(function(){
		subscribeClick();
	});
	
	$("#loginbutton").click(function(){
		loginCheck();
	});

	$("#goBackForgot").click(function(){
		$(".forgotPassword").fadeOut('fast',function(){
			clearInput();
			fadeIn($(".baseLogin"));
		});
	});
	$("#goBackRecoverd").click(function(){
		$(".passwordRecoverd").fadeOut('fast',function(){
			clearInput();
			fadeIn($(".baseLogin"));
		});
	});

	$(document).keypress(function (e) {
	    if (e.which == 13) {
	        loginCheck();
	    }
	});
}

function fadeOut(element){
	$(element).fadeOut('fast');
}

function vraagAan(){
	var emailInput = $(".forgotPassword #emailInput").val();
	var valid = !$('.forgotPassword #emailInput').hasClass('invalid');

	if(valid && emailInput.length > 0){
		$('.forgotPassword .progress').css('display','block');
		// email is valid in browser
		Database.callFunction({targetFunction:'requestNewPassword',data:emailInput,callback:function(value){
			$('.forgotPassword .progress').css('display','none');
			$('.forgotPassword #emailInput').val(null);
			if(value == 'SEND'){
				$(".forgotPassword").fadeOut('fast',function(){
					fadeIn($(".passwordRecoverd"));
				});
			} else if(value == 'NOT') {
				Materialize.toast("Vul een geldig email adress in", 2000);
			} else {
				log(value);
				Materialize.toast("Oops somthing went wrong", 2000);
			}
		},returnObject:false});

	} else {
		Materialize.toast("Vul een geldig email adress in", 2000);
	}
}


function clearInput(){
	var items = $('input');
	for(var i = 0; i < items.length; i++){
		$(items[i]).val(null);
		$(items[i]).removeClass('valid invalid');
	}
}

function fadeIn(element){
	$(element).fadeIn('fast');
}

function loginCheck(){
	var emailInput = $("#emailInput").val();
	var passwordInput = $("#wachtwoordInput").val();

	var dataObject = {'Email':emailInput,'Wachtwoord':passwordInput};
	Database.callFunction({targetFunction:'loginFunction',data:dataObject,callback:function(result){

		if(result != 0 && result != '0'){
			userController.setUser(result);

			window.location.assign("subscribe?id="+cursusID);

		} else {
			Materialize.toast("Ongeldig email adress en/of wachtwoord", 2000);
		}
	}});
}

function subscribeClick(){
	var Form = FormController.getFormData($(".baseRegister"));

	var subscribe = subscribeCheck(Form);

		if(Form['Input']['Wachtwoord'] !== Form['Input']['WachtwoordControle'] && subscribe){
			Materialize.toast("Wachtwoord en Wachtwoord check matchen niet!", 2000);
			subscribe = false;
		}
		if(subscribe){
			console.log(Form['Input']);
			Database.callFunction({targetFunction:'subscribeNewUser',data:Form['Input'],callback:function(result){
				console.log(result);
				if(result == "0"){
					Materialize.toast('ingeschreven controleer uw e-mail',2000);
					$(".baseRegister").fadeOut('fast',function(){
						subscribedTemplateShow();
					});
				} else if(result == "1") {
					Materialize.toast("Dit email adress is al in gebruik.", 2000);
				} else {
					 // TODO remove
				}
			},returnObject:false});
		}
		
}
function subscribeCheck(Form){
	
	Form['Input'].cursusID =  $('.pick-date').val();

	// Form['Input'].userID = item.UserID;
	var Values = Object.keys( Form['Input'] );
	
	var subscribe= true;

	if($('.pick-date').val() == null){
		Materialize.toast("Kies een beschikbare datum", 2000);
	}
	else{
		for(var i = 0; i < Values.length-1; i++){
			if(Form['ObjectType'][Values[i]] == undefined){
				if(Form['Input'][Values[i]] == "" || Form['Input'][Values[i]] == undefined){
					Materialize.toast(Values[i] + " is leeg! vul hier de juiste gegevens in", 2000);
					
					subscribe = false;
					break;
				}

				 else {
					if(Form['Valid'][Values[i]] == "invalid" && Form['ObjectType'][Values[i]] != "optional"){
						Materialize.toast(Values[i] + " is ongeldig ingevoerd!", 2000);
						subscribe = false;
						break;
					}
				}
			}
		}
	}

	return subscribe;
}
function subscribeCurrentUserClick(data){
	if($('.pick-date').val() == null){
			Materialize.toast("Kies een beschikbare datum.", 2000);
	}
	else{
			data.cursusID = $('.pick-date').val();


			 updateUser(function(result){
          console.log(result);
          if(result > 0){
              Materialize.toast('e-mail bestaad al',2000);
          }
          else{
              setUser();
              Materialize.toast('gebruiker opgeslagen',2000);
          }
          // submitCallback();
      });

			console.log(data);
			
			setTimeout(function(){
				Database.callFunction({targetFunction:'addSubscribor',data:data,callback:function(){
						
						}
				});
			},200);
			subscribedTemplateShow();
	}
	
}

function userCallBack()
{
	console.log('cb');
}
function subscribedTemplateShow(){
	$(".baseRegister").fadeOut('fast',function(){
		fadeOut($(".subscribe-card"));
		$('.loginContainer').addClass('subscribe-new-success');
		$('.overlay').show();
		setBackgroundFullWindowSize('.loginContainer');
		resizeWindow();
	});
}

var FormController = {
	getFormData: function(container){  
		var inputFields = $(container).find(".formInput");
		var FormObject = {Input:{},Valid:{},ObjectType:{}};
		for(var i = 0; i < inputFields.length; i++){
			var inputFieldID = $(inputFields[i]).attr('ObjectNaam');
			FormObject['Input'][inputFieldID] = $(inputFields[i]).val();
			if($(inputFields[i]).hasClass("invalid")){
				FormObject['Valid'][inputFieldID] = 'invalid';
			} else {
				FormObject['Valid'][inputFieldID] = 'valid';
			}
			FormObject['ObjectType'][inputFieldID] = $(inputFields[i]).attr('ObjectType');
		}
		return FormObject;
	}
}

function getUrlParam(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

