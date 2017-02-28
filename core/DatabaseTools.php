<?php  
	require_once(__ROOT__.'/DatabaseConfig.php');
	/**
	* 
	*/
	class DBTools
	{
		/*Deze functie returned een database instance
		*
		* Voorbeeld: $var = DatabaseController::getDatabaseConnection();
		* returned mysqli database connection
		*/
		public static function getDatabaseConnection(){
			return mysqli_connect(DatabaseConfigure::$DBhost,DatabaseConfigure::$DBuser,DatabaseConfigure::$DBpass,DatabaseConfigure::$DBname);
		}

		public static function generateRandomPassword() {
			$length = 8;
		    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		    $charactersLength = strlen($characters);
		    $randomString = '';
		    for ($i = 0; $i < $length; $i++) {
		        $randomString .= $characters[rand(0, $charactersLength - 1)];
		    }
		    return $randomString;
		}
		public static function generateRandomToken($len) {
			$length = $len;
		    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		    $charactersLength = strlen($characters);
		    $randomString = '';
		    for ($i = 0; $i < $length; $i++) {
		        $randomString .= $characters[rand(0, $charactersLength - 1)];
		    }
		    return $randomString;
		}

		public static function sendMail($toEmail,$subject,$Body,$isHtml = true,$mailFrom = null){
				$mail = new PHPMailer;
				if($mailFrom == null){
					$mailFrom = DatabaseConfigure::$mailFrom;
				}

				$mail->isSMTP();
				$mail->Host = DatabaseConfigure::$mailHost;
				$mail->SMTPAuth = DatabaseConfigure::$SMTPAuth;
				$mail->Username = DatabaseConfigure::$mailUsername;              
				$mail->Password = DatabaseConfigure::$mailPassword;                       
				$mail->SMTPSecure = DatabaseConfigure::$smtpSecure;
				$mail->Port = DatabaseConfigure::$mailPort;

				$mail->setFrom($mailFrom, $mailFrom);
				$mail->addAddress($toEmail, $toEmail);
				$mail->isHTML($isHtml); 
				$mail->Subject = $subject;
				
				$mail->Body = $Body;

				if(!$mail->send()) {
				    return 'ERROR';
				} else {
				    return 'SEND';
				}
		}
		
		public static function mysqlToArray($result){
			$newArray = [];
			if ($result->num_rows > 0) {
				while($row = $result->fetch_assoc()) {
					array_push($newArray,$row);
				}
			}
			return $newArray;		
		}

		/*Rechtstreeks query uitvoeren
		*
		* Voorbeeld: $var = Database::execute("select * from") 
		* returned mysqli rows
		*/
		public static function execute($query){	
			$conn= DBTools::getDatabaseConnection() or die(mysqli_error($conn));

			$result = mysqli_query($conn,$query);
			mysqli_close($conn);
			
			return $result;
		}

		public static function executeToObj($query){
			$conn= DBTools::getDatabaseConnection() or die(mysqli_error($conn));

			$result = mysqli_query($conn,$query);
			mysqli_close($conn);
			$objArray = [];
			if ($result != null && $result->num_rows > 0) {
				while($row = $result->fetch_assoc()) {
					array_push($objArray, $row);
				}
			}
			return $objArray;
		}

		public static function PasswordHash($string){
			return password_hash($string, PASSWORD_BCRYPT);
		}

		public static function ConfirmPassword($password,$hash){
			if (password_verify($password, $hash)) {
				return true;
			} else {
				return false;
			}
		}

		/*Rechtstreeks query uitvoeren met mogelijkheid om per item een bewerking toe te passen
		*
		* Voorbeeld: $var = Database::executeWithCallbackPerItem("SELECT * FROM klas", callback($data);
		* 
		* Praktijk Voorbeeld

			$klassen["klassen"] = Database::executeWithCallbackPerItem("SELECT * FROM klas",
			function($data){
				$klas = array();
				array_push($klas,$data["ID"]);
				array_push($klas,$data["Klasnaam"]);
				
				return $klas;
			});		
		*returned array van zelf gedefineerde objecten
		*/
		public static function executeWithCallbackPerItem($sql,$callback){
			$result = array();
			$data = DBTools::execute($sql);
			if ($data->num_rows > 0) {
				while($row = $data->fetch_assoc()) {
					array_push($result,$callback($row));
				}
				return $result;
			}
		}

	}
?>