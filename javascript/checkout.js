$(function(){
	loadContent();
});

function loadContent()
{
	ToBetalen();
}

function betalen(){
	ToBetalen();
}
function Bevestigen(){
	ToBevestigen();
}

function Homepagina(){
	window.location = "home";
}


function changeButtonActions(buttonname,buttoncallback, parameters){
	$("#NextButton").unbind("click");
	$("#NextButton").text(buttonname);
	$("#NextButton").click({"callback":buttoncallback,"parameters":parameters},function(event){
		event.data.callback(event.data.parameters);
	});
}

function ToBetalen(){
	$("#betalen").addClass("colorWhite");

	$("#Bevestigen").removeClass("colorWhite");

	$("#NextButton").text("Bevestigen");

	$("#BetalenItem").css("display","initial");
	$("#BevestigenItem").css("display","none");

	changeButtonActions("Bevestigen",Bevestigen,null);
}

function ToBevestigen(){
	var facID = getUrlParam('ID');
	var prijs = getUrlParam('price');

	console.log(facID);
	console.log(prijs);

	$("#Bevestigen").addClass("colorWhite");

	$("#betalen").removeClass("colorWhite");

	$("#NextButton").text("Terug naar home pagina");

	$("#BetalenItem").css("display","none");
	$("#BevestigenItem").css("display","initial");

	changeButtonActions("Terug naar home pagina",Homepagina,null);

	Database.callFunction({targetFunction:'updateFacture',data:{ID:facID,Prijs:prijs},callback:function(result){
		console.log(result);
	}
	});

}

function activateLabel(parent){
	$(parent).closest(".input-field").find("label").addClass("active");
}