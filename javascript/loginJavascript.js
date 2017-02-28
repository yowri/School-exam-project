var log = console.log.bind(console);
$(function(){
	loginInit();
});

function loginInit(){
	// activate listeners
	listeners();
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
			fadeIn($(".baseLogin"));
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
		registerClick();
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
		window.location.assign("./");
		} else {
			Materialize.toast("Ongeldig email adress en/of wachtwoord", 2000);
		}
	}});
}

function registerClick(){
	var Form = FormController.getFormData($(".baseRegister"));
	var Values = Object.keys( Form['Input'] );
	var Valids = Object.keys( Form['Valid'] );
	var register = true;
	for(var i = 0; i < Values.length; i++){
		if(Form['ObjectType'][Values[i]] == undefined){
			if(Form['Input'][Values[i]] == "" || Form['Input'][Values[i]] == undefined){
				Materialize.toast(Values[i] + " is leeg! vul hier de juiste gegevens in", 2000);
				register = false;
				break;
			} else {
				if(Form['Valid'][Values[i]] == "invalid" && Form['ObjectType'][Values[i]] != "optional"){
					Materialize.toast(Values[i] + " is ongeldig ingevoerd!", 2000);
					register = false;
					break;
				}
			}
		}
	}

	if(Form['Input']['Wachtwoord'] !== Form['Input']['WachtwoordControle'] && register){
		Materialize.toast("Wachtwoord en Wachtwoord check matchen niet!", 2000);
		register = false;
	}

	if(register){
		$(".baseRegister .progress").css('display','block');
		Database.callFunction({targetFunction:'registerUser',data:Form['Input'],callback:function(result){
			result = result[0].result;
			$(".baseRegister .progress").css('display','none');
			if(result == 0){
				Materialize.toast("Dit email adress is al in gebruik.", 2000);
			} else {
				Materialize.toast("Succesvol geregistreerd, er is een activatie email gestuurd naar uw email adress", 3000);
				$(".baseRegister").fadeOut('fast',function(){
					fadeIn($(".baseLogin"));
				});
			}
		},returnObject:true});
	}
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