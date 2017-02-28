@RenderDefault@

<link rel="stylesheet" href="stylesheets/css/profile.css">
<script src="javascript/countUp.js"></script>
<script src="javascript/jspdf/jspdf.js"></script>
<script src="javascript/jspdf/deflate.js"></script>
<script src="javascript/jspdf/addimage.js"></script>
<script src="javascript/jspdf/png_support.js"></script>
<script src="javascript/jspdf/png.js"></script>
<script src="javascript/jspdf/zlib.js"></script>
<script src="javascript/filesaver.js"></script>
<script src="javascript/profile.js"></script>
<div class="container">
  <div class="row">
    <div class="col m2">

      <ul class="profile-nav">
        <li class="nav-account active-category"><span class="nav-account">Account</span></li>
        <li class="nav-persoonlijk"><span class="nav-persoonlijk">Persoonlijk</span></li>
      </ul>
    </div>
    <div class="col m10 show-category account">
      <h3 class="profile-titel">Account</h3>
      <h4>Cursussen</h4>
      <table class="sub-table">
        <thead>
          <tr>
              <th data-field="number">Naam</th>
              <th data-field="date-start">Datum start</th>
              <th data-field="date-end">Datum eind</th>
              <th data-field="Price">Instructeur</th>
              <th ></th>
          </tr>
        </thead>

        <tbody class="course-body">
          
        </tbody>
      </table>
      <h1 id="myTargetElement"></h1>
      <h4>Vragen en antwoorden</h4>
    </div>
    <form id="account-form">
      <div class="col m10 show-category persoonlijk">
        <h3 class="profile-titel">Persoonlijke gegevens</h3>
        <div class="switch">

           <label>
            Mevrouw
            <input type="checkbox" id="sex">
            <span class="lever"></span>
            De Heer
          </label>
        </div>
        <div class="row">
          <div class="col m6">
            <div class="input-field col m12">
              <input placeholder="Placeholder" id="first_name" type="text" class="validate" value="yori">
              <label for="first_name">Voornaam*</label>
            </div>
            <div class="input-field col m6">
              <input placeholder="Placeholder" id="zip" type="text" class="validate empty_after">
              <label for="zip">Postcode*</label>
            </div>
             <div class="input-field col m6">
              <input placeholder="Placeholder" id="house_number" type="text" class="validate empty_after">
              <label for="house_number">Huisnummer en toevoeging*</label>
            </div>
            <div class="input-field col m12">
              <input placeholder="Placeholder" id="adres" type="text" class="validate empty_after">
              <label for="adres">Adres*</label>
            </div>
            <div class="input-field col m12">
              <input placeholder="Placeholder" id="woonplaats" type="text" class="validate empty_after">
              <label for="woonplaats">Woonplaats*</label>
            </div>
            <div class="input-field col m12">
              <input placeholder="Placeholder" id="telephone" type="tel" class="validate">
              <label for="telephone">Telefoon*</label>
            </div>
            <div class="input-field col m12">
              <input placeholder="Placeholder" id="birth_date" type="date" class="validate">
              <label for="birth_date" class="active">Geboortedatum*</label>
            </div>
          </div>
          <div class="col m2">
          <div class="input-field col m12">
            <input placeholder="Placeholder" id="in_between_name" type="text" class="validate empty_after">
            <label for="in_between_name">Tussenvoegsel</label>
          </div>
          </div>
          <div class="col m4">
            <div class="input-field col m12">
              <input placeholder="Placeholder" id="last_name" type="text" class="validate">
              <label for="last_name">Achternaam*</label>
            </div>
          </div>
          <div class="col m6">
            <h4 class="login-txt">Inloggegevens</h4>
            <div class="input-field col m12">
              <input placeholder="Placeholder" id="mail" type="email" value="yori_vanloo@live.nl" class="validate equal-mail mail">
              <label for="mail">E-mailadres*</label>
            </div>
            <div class="input-field col m12">
              <input placeholder="Placeholder" type="email" class="validate check-equal-mail mail empty_after">
              <label for="mail">E-mailadres bevestigen</label>
            </div>
            <div class="input-field col m12">
              <input placeholder="Placeholder" id="password" type="password" class="validate equal-password password empty_after">
              <label for="password">Wachtwoord</label>
            </div>
            <div class="input-field col m12">
              <input placeholder="Placeholder" type="password" class="validate check-equal-password password empty_after">
              <label for="password">Wachtwoord bevestigen</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col m12">
            <a type="submit" class="waves-effect waves-light base-color btn floatRight save_data" >Opslaan</a>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>