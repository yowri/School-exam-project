var currentUser = userController.getuser();

if(currentUser != null && currentUser != "" && currentUser != undefined){
  var getUserID = userController.getuser().UserID;
  var isPersonalData = checkPersonalData(currentUser);
  console.log(isPersonalData);
}
function setInputs(){
    $('#first_name').val(currentUser.Voornaam);
    $('#in_between_name').val(currentUser.TussenVoegsel);
    $('#last_name').val(currentUser.Achternaam);
    $('#telephone').val(currentUser.TelefoonNummer);
    $('#mail').val(currentUser.Email);
    $('#birth_date').val(currentUser.Geboortedatum);
    $('#adres').val(currentUser.Adres);
    $('#house_number').val(currentUser.HuisNummer);
    $('#zip').val(currentUser.Postcode);
    $('#woonplaats').val(currentUser.Woonplaats);
    $('#sex').prop('checked', getOnOff(currentUser.Geslacht));
}

function setUser(){

  userController.clearuserData();

  currentUser.Voornaam = $('#first_name').val();
  currentUser.Tussenvoegsel = $('#in_between_name').val();
  currentUser.Achternaam = $('#last_name').val();
  currentUser.Email = $('#mail').val();
  currentUser.TelefoonNummer = $('#telephone').val();
  currentUser.Geboortedatum = $('#birth_date').val();
  currentUser.Adres = $('#adres').val();
  currentUser.HuisNummer = $('#house_number').val();
  currentUser.Postcode = $('#zip').val();
  currentUser.Woonplaats = $('#woonplaats').val();
  currentUser.Geslacht = '';

  userController.setUser(currentUser);
}
function updateUser(cb){
    Database.callFunction({targetFunction:isPersonalData,data:getDataUser(),callback:function(result){
          // console.log(result);
          cb(result[0].result);
      }
    });
}

function getDataUser(){
  var data = {

    id:getUserID,
    voornaam:$('#first_name').val(),
    tussenvoegsel:$('#in_between_name').val(),
    achternaam:$('#last_name').val(),
    geboortedatum:$('#birth_date').val(),
    email:$('#mail').val(),
    telefoonnummer:$('#telephone').val(),
    wachtwoord:$('#password').val(),
    adres:$('#adres').val(),
    huisnummer:$('#house_number').val(),
    postcode:$('#zip').val(),
    woonplaats:$('#woonplaats').val(),
    geslacht:getSex($('#sex').val()),
    currentEmail:currentUser.Email
  };
  return  data;                
}

function checkPersonalData(user){
  var qeury;
  console.log(currentUser.Geslacht);

  if(currentUser.Geslacht == undefined && currentUser.Adres == undefined && currentUser.HuisNummer == undefined && currentUser.Postcode == undefined && currentUser.Woonplaats == undefined){
    qeury = 'UpdateWithouthPersonalData';
  } 
  else{
    qeury = 'UpdateUser';
  }

  return qeury;
}