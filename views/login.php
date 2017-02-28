<!DOCTYPE html>
<html>
<head>
	<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="stylesheets/libs/materialize.min.css">
    <link rel="stylesheet" href="stylesheets/css/login.css">
    <script src="javascript/jquery.js"></script>
    <script type="text/javascript" src="core/DatabaseController.js"></script>
    <script src="javascript/materialize.min.js"></script>
    <script src="javascript/loginJavascript.js"></script>
    <script type="text/javascript" src="core/validationController.js"></script>
	<title>Login</title>
</head>
<body>

	<!-- login view -->
	<div class="baseLogin">
		<div class="baseContainer row container">
			<div class="col l6 m12 offset-l3 LoginVlak  z-depth-1">
				<div class="loginHead blue">
					<h4 class="welkomText">LOGIN</h4>
				</div>
				<div class="row inputArea">
					<div class="input-field col s12">
			          <input placeholder="Email" id="emailInput" type="email" class="validate">
			          <label for="emailInput">Email</label>
			        </div>
			        <div class="input-field col s12">
			          <input placeholder="Wachtwoord" id="wachtwoordInput" type="password" class="validate">
			          <label for="wachtwoordInput">Wachtwoord</label>
			        </div>
			        <div class="col s12 marginTop">
			        	<a href="javascript:;" id="forgotpasswordBase" class="color-base">Forgot Password?</a>
			        	<a class="waves-effect waves-light base-color btn floatRight" id="loginbutton">Login</a>
			        </div>
				</div>
			</div>
		</div>
		<div class="textCenter">
			<a href="javascript:;" id="RegisterLink" class="color-base">Nog geen account? Registreer hier!</a>
			<p style="opacity: 0.5;">© utz web development</p>
		</div>
	</div>

	<!-- forgot password view -->
	<div class="forgotPassword">
		<div class="baseContainer row container">
			<div class="col offset-m2 m8 s12 forgotPasswordVlak z-depth-1 noPadding">
				<div class="registerHead blue">
					<h4 class="welkomText">Forgot Password</h4>
				</div>
				<div class="row marginAuto sidePadding">
					<div class="col s12 noPadding">
						<blockquote class="baseBorderColor">
							Ben je je wachtwoord vergeten? Geen probleem, hier kun je een nieuw wachtwoord aanvragen. Vul je email adress hier onder in en we sturen je nieuwe wachtwoord direct op.
						</blockquote>
					</div>
					<div class="input-field col s12 noPadding">
			          <input id="emailInput" placeholder="Email" ObjectNaam="Email" type="email" class="validate formInput">
			          <label for="emailInput">* Email</label>
			        </div>
			        <div class="col s12 marginTop marginBottom">
			        	<a class="waves-effect waves-light base-color btn floatRight" id="vraagAanGlobal" >Vraag aan</a>
			        	<a class="waves-effect waves-light base-color btn" id="goBackForgot">Ga Terug</a>
			        </div>
			          <div class="progress marginTop left" style="display: none;">
  					      <div class="indeterminate"></div>
  					  </div>
				</div>
			</div>
		</div>
	</div>
		<!-- forgot password view -->
	<div class="passwordRecoverd">
		<div class="baseContainer row container">
			<div class="col offset-m2 m8 s12 forgotPasswordVlak z-depth-1 noPadding">
				<div class="registerHead blue">
					<h4 class="welkomText">Wachtwoord hersteld</h4>
				</div>
				<div class="row marginAuto sidePadding">
					<div class="col s12 noPadding">
						<blockquote class="baseBorderColor">
							Uw wachtwoord is succesvol hersteld. Er is een email gestuurd naar <span id="emailShow"></span> met uw nieuwe tijdelijke wachtwoord. U kunt hiermee inloggen en op de profiel pagina uw wachtwoord veranderen naar smaak.
						</blockquote>
					</div>
			        <div class="col s12 marginTop marginBottom">
			        	<a class="waves-effect waves-light base-color btn" id="goBackRecoverd">Ga Terug</a>
			        </div>
				</div>
			</div>
		</div>
	</div>

	<!-- register view -->
	<div class="baseRegister">
		<div class="baseContainer row container">
			<div class="col m12 LoginVlak z-depth-1">
				<div class="registerHead blue">
					<h4 class="welkomText">Registreren</h4>
				</div>
				<div class="row inputArea">
					<div class="input-field col s12">
			          <input placeholder="Email" ObjectNaam="Email" type="email" class="validate formInput">
			          <label for="emailInput">* Email</label>
			        </div>
			        <div class="input-field col s6">
			          <input placeholder="Wachtwoord" ObjectNaam="Wachtwoord" type="password" class="validate formInput">
			          <label for="wachtwoordInput">* Wachtwoord</label>
			        </div>
			        <div class="input-field col s6">
			          <input placeholder="Wachtwoord controle" ObjectNaam="WachtwoordControle" type="password" class="validate formInput">
			          <label for="wachtwoordInputCheck">* Wachtwoord controle</label>
			        </div>

			        <div class="input-field col s4">
			          <input placeholder="Voornaam" ObjectNaam="Voornaam" type="text" class="validate formInput">
			          <label for="VoornaamInput">* Voornaam</label>
			        </div>
			        <div class="input-field col s4">
			          <input placeholder="Tussen Voegsel" ObjectType="optional" ObjectNaam="TussenVoegsel" type="text" class="validate formInput">
			          <label for="TussenVoegselInput">Tussenvoegsel</label>
			        </div>
			        <div class="input-field col s4">
			          <input placeholder="Achternaam" ObjectNaam="Achternaam" type="text" class="validate formInput">
			          <label for="AchternaamInput">* Achternaam</label>
			        </div>
			        <div class="input-field col s6">
			          <input type="date" ObjectNaam="Geboortedatum" max="1995-01-02" class="datepicker formInput">
						<label for="birth_date" class="active">Geboortedatum*</label>
			        </div>
			        <div class="input-field col s6">
			          <input placeholder="Telefoon Nummer" ObjectType="optional" ObjectNaam="Telefoonnummer" type="tel" class="formInput">
			          <label for="TelInput">Telefoonnummer</label>
			        </div>
			        <div class="col s12 marginTop">
			        	<a class="waves-effect waves-light base-color btn floatRight" id="RegisterButton" >Registreer</a>
			        	<a class="waves-effect waves-light base-color btn" id="goBackRegister">Ga Terug</a>
			        </div>
			        <div class="progress marginTop left" style="display: none;">
  					      <div class="indeterminate"></div>
  					 </div>
				</div>
			</div>
		</div>
		<div class="textCenter">
			<p style="opacity: 0.5;">© utz web development</p>
		</div>
	</div>

</body>
</html>