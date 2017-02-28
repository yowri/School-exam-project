@RenderDefault@
    <link rel="stylesheet" href="stylesheets/css/subscribe.css">
    <script src="javascript/subscribe.js"></script>


<div class="row loginContainer">
	<div class="overlay">
		<h2 class="success-text">U hebt zich ingeschreven! controleer uw email</h2>
	</div>
	<div class="container subscribe-card">

		<div class="row">
			<div class="col m6 s12">
				<!-- login view -->
						<div class="baseLogin">
							<div class="baseContainer row ">
								<div class="col l12 m12 LoginVlak">
									<div class="loginHead">
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
						</div>
					</div>

					<!-- register view -->
					<div class="col m6 s12 subscribe_user">
						<div class="baseRegister">
							<div class="baseContainer row ">
								<h4 class="welkomText cursus_naam"></h4>
								<div class="input-field col s6">
									 <select class="browser-default pick-date">
									    <option value="" disabled selected>Kies datum</option>
									  </select>
								</div>
								<div class="col s12 LoginVlak">

									<h4>Inloggegevens</h4>
										
										<div class="switch">
								           	<label>
								            	Mevrouw
								            <input  id="sex" ObjectNaam="Geslacht" type="checkbox"  class="validate formInput">
								            <span class="lever"></span>
								            	De Heer
								          </label>
								        </div>
										<div class="input-field col s12">
								          <input id="mail" placeholder="Email" ObjectNaam="Email" type="email" class="validate formInput">
								          <label for="emailInput">* Email</label>
								        </div>
								        <div class="input-field col s6 password-hide">
								          <input id="password" placeholder="Wachtwoord" ObjectNaam="Wachtwoord" value="" type="password" class="validate formInput">
								          <label for="wachtwoordInput">* Wachtwoord</label>
								        </div>
								        <div class="input-field col s6 password-hide">
								          <input placeholder="Wachtwoord controle" ObjectNaam="WachtwoordControle" type="password" class="validate formInput">
								          <label for="wachtwoordInputCheck">* Wachtwoord controle</label>
								        </div>
								        <div class="input-field col s9">
								          <input id="first_name" placeholder="Voornaam" ObjectNaam="Voornaam" type="text" class="validate formInput">
								          <label for="VoornaamInput">* Voornaam</label>
								        </div>
								        <div class="input-field col s3">
								          <input id="in_between_name" placeholder="Tussenvoegsel" ObjectType="optional" ObjectNaam="TussenVoegsel" type="text" class="validate formInput">
								          <label for="TussenVoegselInput">Tussenvoegsel</label>
								        </div>
								        <div class="input-field col s12">
								          <input id="last_name" placeholder="Achternaam" ObjectNaam="Achternaam" type="text" class="validate formInput">
								          <label for="AchternaamInput">* Achternaam</label>
								        </div>
								        <div class="input-field col s4">
								          <input id="birth_date" type="date" ObjectNaam="Geboortedatum" max="2008-01-01" class="datepicker formInput">
								          <label for="GeboortedatumInput" class="active">* Geboortedatum</label>
								        </div>
								        <div class="input-field col s8">
								          <input id="telephone" placeholder="Telefoon Nummer" ObjectNaam="Telefoonnummer" type="tel" class="formInput">
								          <label for="TelInput">* Telefoonnummer</label>
								        </div>
										<h4>Adres</h4>
								        <div class="input-field col s7">
								          <input id="woonplaats" placeholder="Woonplaats"  ObjectNaam="Woonplaats" type="text" class="validate formInput">
								          <label for="WoonplaatsInput">* Woonplaats</label>
								        </div>
								        <div class="input-field col s5">
								          <input id="zip" placeholder="Postcode" ObjectNaam="Postcode" type="text" class="validate formInput">
								          <label for="PostcodeInput">* Postcode</label>
								        </div>
								        <div class="input-field col s9">
								          <input id="adres" placeholder="Adres"  ObjectNaam="Adres" type="text" class="validate formInput">
								          <label for="AdresInput">* Adres</label>
								        </div>
								        <div class="input-field col s3">
								          <input id="house_number" placeholder="Huisnummer" ObjectNaam="Huisnummer" type="text" val="" class="validate formInput">
								          <label for="HuisNummerInput">* Huisnummer</label>
								        </div>
								        
								        <div class="col s12 marginTop">
								        	<a class="waves-effect waves-light base-color btn floatRight" id="RegisterButton" >Schrijf in</a>
								        	<a class="waves-effect waves-light base-color btn floatRight" id="subscribe-new-user" >Schrijf in</a>
								        </div>
								        <div class="col s6"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
		</div>
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
</body>

</html>


