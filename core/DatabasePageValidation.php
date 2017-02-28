<?php 
	class DatabaseValidation{
		public static function initValidation(){
			if (session_status() == PHP_SESSION_NONE) {
			    session_start();
			}
			if(!DatabaseValidation::canRequest()){
				$_SESSION["pageValidation"] = DatabaseValidation::generateRandomString();
			}
			if(!DatabaseValidation::hasEncryptionKey()){
				$_SESSION["encryptKey"] = DatabaseValidation::generateRandomEncKey();
			}
		}

		public static function canRequest(){
			if (session_status() == PHP_SESSION_NONE) {
			    session_start();
			}
			if(isset($_SESSION["pageValidation"]) && !empty($_SESSION["pageValidation"])){
				return true;
			} else {
				return false;
			}
		}

		public static function hasEncryptionKey(){
			if (session_status() == PHP_SESSION_NONE) {
			    session_start();
			}
			if(isset($_SESSION["encryptKey"]) && !empty($_SESSION["encryptKey"])){
				return true;
			} else {
				return false;
			}
		}

		public static function getEncryptionKey(){
			if (session_status() == PHP_SESSION_NONE) {
			    session_start();
			}
			if(isset($_SESSION["encryptKey"]) && !empty($_SESSION["encryptKey"])){
				return $_SESSION["encryptKey"];
			} else {
				return null;
			}
		}

		public static function isLoggedIn(){
			if (session_status() == PHP_SESSION_NONE) {
			    session_start();
			}
			if(isset($_SESSION["userData"]) && !empty($_SESSION["userData"]) && !$_SESSION["userData"] == null){
				return true;
			} else {
				return false;
			}
		}

		public static function login($dataObject){
			if (session_status() == PHP_SESSION_NONE) {
			    session_start();
			}

			if(!isset($_SESSION["userData"]) && empty($_SESSION["userData"])){
				$_SESSION["userData"] = json_encode($dataObject);
			}
		}

		public static function logOut(){
			if (session_status() == PHP_SESSION_NONE) {
			    session_start();
			}
			unset($_SESSION["userData"]);
		}

		public static function getUserData(){
			if (session_status() == PHP_SESSION_NONE) {
			    session_start();
			}

			if(isset($_SESSION["userData"]) && !empty($_SESSION["userData"])){
				return $_SESSION["userData"];
			} else {
				return null;
			}
		}

		public static function updateUsersession($userID){
			if (session_status() == PHP_SESSION_NONE) {
			    session_start();
			}
			$qeury ="SELECT users.*, user_gegevens.* from users, user_gegevens where users.UserID = ".$userID."  AND users.UserID = user_gegevens.userID";
			$qeury2 = "SELECT * from users WHERE UserID =".$userID."";
			$users = DBTools::executeToObj($qeury);
			if(count($users) > 0 && isset($_SESSION["userData"]) && !empty($_SESSION["userData"])){
				$_SESSION["userData"] = json_encode($users[0]);
			}
		}

		public static function generateRandomString() {
			$length = rand(20,40);
		    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		    $charactersLength = strlen($characters);
		    $randomString = '';
		    for ($i = 0; $i < $length; $i++) {
		        $randomString .= $characters[rand(0, $charactersLength - 1)];
		    }
		    return $randomString;
		}
		public static function generateRandomEncKey() {
			$length = 8;
		    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		    $charactersLength = strlen($characters);
		    $randomString = '';
		    for ($i = 0; $i < $length; $i++) {
		        $randomString .= $characters[rand(0, $charactersLength - 1)];
		    }
		    return $randomString;
		}
	}
 ?>