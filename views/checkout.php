@RenderDefault@

<script type="text/javascript" src="javascript/checkout.js"></script>
<link rel="stylesheet" type="text/css" href="stylesheets/css/checkout.css">

<div class="container">
	<div class="row">
	  <div class="col s12">
		<div class="col s12">
	  	<div class="row">
			<nav>
				<div class="checkout-nav nav-wrapper">
				    <div class="col s12">
	            		<a href="javascript:;" id="betalen" class="breadcrumb">1. Betalen</a>
	            		<a href="javascript:;" id="Bevestigen" class="breadcrumb">2. Bevestiging</a>
				    </div>
				</div>
			</nav>
		</div>

	    <!-- betalen pagina -->
	    <div class="row" id="BetalenItem">
	        <div class="input-field col s12">
	          <input placeholder="Placeholder" id="Rekeningnummer" type="text" class="validate">
	          <label class="BetalenInput" for="Rekeningnummer">Bankrekeningnummer: </label>
	        </div>
	    </div>

	    <!-- bevistige pagina -->
	    <div class="row" id="BevestigenItem">
	      <div class="row">
	        <p class="color-blue">Gefeliciteerd! De betaling is ontvangen en wacht op de mail met de acceptatie van de gekozen cursus.</p>
	      </div>
	    </div>

	    <div class="row">
	        <div class="col s12">
	            <a class="waves-effect waves-light btn blue" id="NextButton">Betalen</a>
	        </div>
	    </div>

	    <div class="col s8">
	      <div class="row">

	      </div>
	    </div>
		</div>
	</div>
</div>