@RenderDefault@

<link rel="stylesheet" href="stylesheets/css/contact.css">
<script type="text/javascript" src="javascript/contactPageJavascript.js"></script>
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfY_YrwcV-2DBIR5KTPVbDt_fzSioIh8I&callback=initMap">
    </script>

<div>
	<div id="map">
		
	</div>

	<div class="container contact-container">
		<div class="content-wrapper">
			<div class="col s8 color-white contact-form contactMailHolder">
				<div>
					<h4 class="contact-titel">STEL EEN VRAAG</h4>
				</div>
		        <div class="input-field col s6">
		          	<input placeholder="Voornaam" id="first_name" type="text" class="validate">
		          	<label for="first_name">Voornaam*</label>
		        </div>
		        <div class="input-field col s6">
		          	<input placeholder="Achternaam" id="last_name" type="text" class="validate" contactID="achternaam" errorMessage="Vul een geldige achternaam in">
		          	<label for="last_name">Achternaam*</label>
		        </div>
		        <div class="input-field col s12">
		        	<i class="material-icons prefix">email</i>
		          	<input placeholder="Uw email" id="email" type="email" class="validate" contactID="email" errorMessage="Vul een geldige email in">
		          	<label for="email">Email</label>
		        </div>
		        <div class="input-field col s12">
		        	<i class="material-icons prefix">mode_edit</i>
		          	<textarea placeholder="Uw vraag" id="text" type="text" minlength='10' contactID="bericht" class="materialize-textarea validate" errorMessage="Vul een geldig bericht in (minimaal 10 tekens)"></textarea>
		          	<label for="text">Vraag</label>
		        </div>
		        <div class="col s12">
		        	<a class="waves-effect waves-light btn blue form-btn" id="GlobalSendButton">verstuur</a>
		        </div>
		        <div class="progress sendProgressBar" style='display:none;'>
 				    <div class="indeterminate"></div>
 				</div>
	    	</div>
		    <div class="col s4 color-blue info-contact">
		    	<h4>Contact <br> informatie</h4>
		    	<a href="help" class="btn-floating btn-large waves-effect waves-dark white ">FAQ</a>
		    	<p>Klik op de knop hierboven om naar de FAQ te gaan<p>
	    		<ul class="social-icons">
	                <li><a href="#" class="social-icon"> <i class="accent-color fa fa-facebook light-grey"></i></a></li>
	                <li><a href="#" class="social-icon"> <i class="accent-color fa fa-twitter light-grey"></i></a></li>
	                <li><a href="#" class="social-icon"> <i class="accent-color fa fa-rss light-grey"></i></a></li>
	            </ul>
		    </div>
		</div>
	</div>	
</div>

<script>
		
</script>