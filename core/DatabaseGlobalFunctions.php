<?php 
	require_once(__ROOT__.'/DatabaseTools.php');
	require_once(__ROOT__.'/DatabasePageValidation.php');
	require ('../vendor/phpmailer/phpmailer/PHPMailerAutoload.php');
	class GlobalFunctions{
		// DO NOT REMOVE------------------------------------------------------------
		public static function removeImageFromDatabase($imageName){
			// validate if user is admin

			//removeImage here
			//DBTools::execute();
			return "done removal";
		}
		public static function loginFunction($data){
			$qeury = "SELECT users.*, user_gegevens.* from users, user_gegevens where users.Email = '".$data->Email."' and users.beschikbaar = 1 AND users.UserID = user_gegevens.userID ";
			$qeury2 = "SELECT * from users WHERE Email='".$data->Email."' and beschikbaar=1";
			$result = DBTools::execute($qeury);
			$result2 = DBTools::execute($qeury2);
			if ($result->num_rows > 0) {
				while($row = $result->fetch_assoc()) {
					if(DBTools::ConfirmPassword($data->Wachtwoord,$row['Wachtwoord'])){
						$row['Wachtwoord'] = '';
						DatabaseValidation::login($row);
						return $row;
					}
				}
				return '0';
			}
			if($result2->num_rows > 0) {
				while($row2 = $result2->fetch_assoc()) {
					if(DBTools::ConfirmPassword($data->Wachtwoord,$row2['Wachtwoord'])){
						$row2['Wachtwoord'] = '';
						DatabaseValidation::login($row2);
						return $row2;
					}
				}
				return '0';
			}

		}
			
		public static function registerUser($data){
			$token = DBTools::generateRandomToken(100);

			$link = 'http://localhost/utszeilboten/subverif?vtok='.$token;

			GlobalFunctions::sendVerifMail($data->Email,$link);

			return GlobalFunctions::getRegisterUser($data,$token);
		
		}
		public static function getSex($input){
		$sex = "";
		  if($input == "on"){
		      $sex = "V";
		  }
		  else{
		      $sex = "M";
		  }
		  return $sex;
		}
		public static function getRegisterUser($data,$token){
				$password = DBTools::PasswordHash($data->Wachtwoord);

				return DBTools::executeToObj('CALL RegisterNewUser("'.$data->Email.'","'.$data->Voornaam.'","'.$data->Achternaam.'","'.$data->TussenVoegsel.'","'.$data->Telefoonnummer.'","'.$password.'","'.$data->Geboortedatum.'","'.$token.'")');
		}
		public static function subscribeNewUser($data){
			$result = DBTools::execute('SELECT COUNT(Email) as "result" FROM users WHERE Email="'.$data->Email.'"');

			$token = DBTools::generateRandomToken(100);

			$getID = GlobalFunctions::getRegisterUser($data,$token)[0]['result'];
			
			$sex = GlobalFunctions::getSex($data->Geslacht);

			$subToken = $getID.'_'.$data->cursusID;

			$link = 'http://localhost/utszeilboten/subscribesuccess?vtok='.$subToken;

			GlobalFunctions::sendVerifMail($data->Email,$link);

			DBTools::execute('CALL RegisterPersonalData("'.$data->Postcode.'","'.$data->Huisnummer.'","'.$data->Woonplaats.'","'.$data->Adres.'","'.$sex.'",'.$getID.')');

			return $result;

		}

		public static function addFacture($data){
				$orderNr = uniqid();
				$factNr = uniqid();

				$subscribtionID = DBTools::executeToObj('CALL AddSubscription('.$data->userID.','.$data->cursusID.')');

				DBTools::execute('CALL AddFacture("'.$orderNr.'","'.$factNr.'",'.$subscribtionID[0]['result'].','.$data->prijs.')');


		}
		public static function updateFacture($data){
			DBTools::execute('CALL UpdateFacture('.$data->ID.','.$data->Prijs.')');

			return $data->ID;
		}
		public static function addSubscribor($data){
			
			GlobalFunctions::sendSubrictionMail($data->email);

			GlobalFunctions::addFacture($data);

			DBTools::execute('UPDATE `users` SET `beschikbaar`= 1 WHERE users.UserID = '.$data->userID.'');

			DBTools::execute('UPDATE cursus SET aantal_deelnemers = (SELECT COUNT(*) FROM inschrijving WHERE cursusID = '.$data->cursusID.') WHERE ID = '.$data->cursusID.'');
		}



		public static function getUserData(){
			if(DatabaseValidation::isLoggedIn()){
				return DatabaseValidation::getUserData();
			} else {
				return null;
			}
		}
		public static function updateUserData($data){
			$id = $data->ID;
			DatabaseValidation::updateUsersession($id);
		}

		public static function activateAccount($data){
			DBTools::execute('CALL SetValidEmail("'.$data->token.'")');
			return '';
		}

		public static function sendVerifMail($mail,$link){
			$result = DBTools::sendMail(
					$mail,
					'Verifier Email',
					'
					<p>
					Om uw email adress te verifieren klik op de link onder deze tekst </br>
					<a href="'.$link.'">verifier email</a>
					</p>
					',
					true
				);
		}
		public static function sendSubrictionMail($mail){
			$result = DBTools::sendMail(
					$mail,
					'Bedank voor uw inschrijving!',
					'
					<p>
					Uw inschrijving word bevestigd u ontvangt spoedig bericht</br>
					</p>
					',
					true
				);
		}


		public static function logOut(){
			DatabaseValidation::logOut();
			return null;
		}

		public static function contactPageSend($data){
			$result = DBTools::sendMail(DatabaseConfigure::$mailUsername,'Question asked by '.$data->voornaam. ' '. $data->achternaam . ' Email:'.$data->email,$data->message,false,$data->email);
			return $result;
		}

		public static function getAllActiveCursusType(){
			return DBTools::executeToObj('CALL GetActiveCourseType()');
		}
		public static function getAllActiveCursus(){
			return DBTools::executeToObj('CALL GetActiveCourses()');
		}

		public static function requestNewPassword($email){
			$rows = DBTools::execute('SELECT * from users where Email="'.$email.'"');
			$rows = DBTools::mysqlToArray($rows);


			if(count($rows) > 0){
				$user = $rows[0];

				$newPassword = DBTools::generateRandomPassword();
				$hash = DBTools::PasswordHash($newPassword);

				DBTools::execute('UPDATE users SET Wachtwoord="'.$hash.'" WHERE UserID='.$user['UserID'].'');

				$result = DBTools::sendMail(
					$user['Email'],
					'Wachtwoord herstellen',
					'
					<div style="width:100%; height:auto;">
						<div style="width:calc(100% - 16px);margin-bottom:16px !important;padding-left:16px; height:64px; background-color:#0277BD !important;">
							<p style="color:white; font-size:16px; font-family: Roboto; line-height:64px;">Wachtwoord herstellen '.$user['Email'].'</p>
						</div>
						<div style="width: 100%; height:auto;">
							<p style="font-family: Roboto;">	
								</br>Uw wachtwoord voor '.$user['Email'].' is succesvoll aangevraagd.</br>
								Uw nieuwe wachtwoord is: '.$newPassword.'</br>
								Als u uw wachtwoord wilt veranderen log dan in en ga naar de profiel pagina om uw wachtwoord aan te passen.</br></br>
								Log hier in : <a href="http://localhost/utszeilboten/login">Login pagina</a>
							</p>
						</div>
					</div>
					',
					true
				);
				echo $result;
			} else {
				echo 'NOT';
			}
		}

		
		// END DO NOT REMOVE--------------------------------------------------------

		// getters
		
		// end getters


		// ----------------------------------------------
		// desktop functions
		// ----------------------------------------------
		public static function getAllCursusType(){
			return DBTools::executeToObj('CALL GetAllCourseTypes()');
		}

		public static function updateCursusType($data){
			return DBTools::execute('UPDATE `cursus_type` SET `naam`="'.$data->naam.'",`prijs`="'.$data->prijs.'",`subTitle`="'.$data->subTitle.'",`beschrijving`="'.$data->beschrijving.'",`beschikbaar`="'.$data->beschikbaar.'" WHERE ID="'.$data->ID.'"');
		}

		public static function removeCursusType($data){
			return DBTools::execute('DELETE FROM `cursus_type` WHERE ID='.$data->ID.'');
		}

		public static function addNewCursusType($data){
			return DBTools::execute('INSERT INTO `cursus_type`(`naam`, `prijs`, `subTitle`, `beschrijving`, `beschikbaar`) VALUES ("'.$data->naam.'",'.$data->prijs.',"'.$data->subTitle.'","'.$data->beschrijving.'",'.$data->beschikbaar.')');
		}

		public static function getCursusPlanningen($data){
			$cursussen = DBTools::executeToObj('CALL GetTypeCoursesAfterNow('.$data->ID.')');
			$cursusType = DBTools::executeToObj('CALL GetCursusTypeByID('.$data->ID.')');

			$obj = new stdClass();
			$obj->cursussen = $cursussen;
			$obj->cursusType = $cursusType;
			return $obj;
		}

		public static function getUserIns($data){
			return DBTools::executeToObj('CALL GetUserInschrijvingen('.$data.')');
		}
		public static function getInstructeurCourse($data){
			return DBTools::executeToObj('CALL GetInstructeurCourse('.$data.')');
		}
		public static function getFacturen($data){
			return DBTools::executeToObj('CALL GetFacturen('.$data.')');
		}

		public static function UpdateUser($data){

			GlobalFunctions::CheckPassNeeded($data);

			DBTools::execute('CALL UpdateUserGegevens('.$data->id.',"'.$data->adres.'","'.$data->huisnummer.'","'.$data->postcode.'","'.$data->woonplaats.'","'.$data->geslacht.'")');

			return GlobalFunctions::emailCheck($data);
		}
		public static function emailCheck($data){
			$result = DBTools::executeToObj('CALL CheckEmail("'.$data->email.'","'.$data->currentEmail.'")');
			if($data->email != $data->currentEmail){

					$token = DBTools::generateRandomToken(100);

					$link = 'http://localhost/utszeilboten/subverif?vtok='.$token;

					DBTools::execute('UPDATE users SET verifToken = "'.$token.'" WHERE UserID = '.$data->id.'');

					GlobalFunctions::sendVerifMail($data->email,$link);

					DBTools::execute('CALL UpdateEmail("'.$data->email.'",'.$data->id.')');
			}
			return $result;
			
		}
		public static function UpdateWithouthPersonalData($data){
			GlobalFunctions::CheckPassNeeded($data);

			DBTools::execute('CALL RegisterPersonalData("'.$data->postcode.'","'.$data->huisnummer.'","'.$data->woonplaats.'","'.$data->adres.'","'.$data->geslacht.'",'.$data->id.')');

			return GlobalFunctions::emailCheck($data);
		}
		public static function CheckPassNeeded($data){
				$hash = DBTools::PasswordHash($data->wachtwoord);

			if($data->wachtwoord != ''){
				DBTools::execute('CALL UpdateUserFull('.$data->id.',"'.$data->voornaam.'","'.$data->tussenvoegsel.'","'.$data->achternaam.'","'.$data->geboortedatum.'","'.$data->email.'","'.$data->telefoonnummer.'","'.$hash.'")');
			}
			else{
				DBTools::execute('CALL UpdateUserPersonalData('.$data->id.',"'.$data->voornaam.'","'.$data->tussenvoegsel.'","'.$data->achternaam.'","'.$data->geboortedatum.'","'.$data->telefoonnummer.'")');
			}
		}
		public static function combineData($data){
			$courses = [];
			
			$cursData = GlobalFunctions::getUserIns($data->id1);
			for($i = 0; $i < count($cursData); $i++){
				array_push($courses,$cursData[$i]);
				$instructors =GlobalFunctions::getInstructeurCourse($cursData[$i]['ID']);
				$facturen =GlobalFunctions::getFacturen($cursData[$i]['ID']);
				$courses[$i]['ins'] = $instructors;
				$courses[$i]['facs'] = $facturen;
			}
			
			return  $courses;

		}
	}
?>