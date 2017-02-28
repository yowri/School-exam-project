<?php 
	define('__ROOT__', dirname(__FILE__));
	require_once(__ROOT__.'/DatabaseConfig.php');
	require_once(__ROOT__.'/DatabaseGlobalFunctions.php');
	require_once(__ROOT__.'/DatabasePageValidation.php');
	require_once(__ROOT__.'/ImageUpload.php');
	
	/*
	* global controller of the database
	*/
	class DatabaseController extends DatabaseConfigure
	{
		public static function callStringFunction($functionName,$functionData,$returnObject){
			try {
				if($returnObject){
					if($functionName != null && $functionData != null){
						DatabaseController::returnMysqliObject(GlobalFunctions::$functionName($functionData));
					} else if($functionName != null){
						DatabaseController::returnMysqliObject(GlobalFunctions::$functionName());
					}
				} else {
					if($functionName != null && $functionData != null){
							DatabaseController::returnMysqliTextResult(GlobalFunctions::$functionName($functionData));
						} else if($functionName != null){
							DatabaseController::returnMysqliTextResult(GlobalFunctions::$functionName());
						}
				}
			} 
			catch (Exception $e) {
				echo 'Caught exception: ',  $e->getMessage(), "\n";
			}
		}

		public static function returnMysqliObject($data){
			$objectArray = array();
			if (is_object($data)) {
				if (property_exists($data,"num_rows") && $data->num_rows > 0) {
					while($row = $data->fetch_object()) {
						array_push($objectArray,$row);
					}
					echo json_encode($objectArray);
				} else {
					echo json_encode($data);
				}
			}else if(is_Array($data)){
				echo json_encode($data);
			} else {
				echo $data;
			}
		}

		public static function returnMysqliTextResult($data){
			if (is_object($data)) {
		       echo $data->fetch_assoc()['result'];
		    } else {
				echo $data;
			}
		}
	}

	if(isset($_FILES['Image'])){
		//if(DatabaseValidation::canRequest()){
			$uploads_dir = "./Images/";
			foreach($_FILES as $file)
			{
				$info = new SplFileInfo($file['name']);
				if($info->getExtension() == "jpg" || $info->getExtension() == "png")
			    {
					if(move_uploaded_file($file['tmp_name'], $uploads_dir . $file['name'])){
						ImageUpload::insertImageInDatabase($file['name']);
						echo "Uploaded";
					} else {
						echo "Failed";
					}
				} else {
					echo "This file is no image";
				}
	 		}
 		//}
	}

	// if there is a request for calling a target function
	if (isset($_POST["targetFunc"])){
		
		// if this ip is valid
		//if(DatabaseValidation::canRequest()){
			$postData = "";
			if (isset($_POST["requestData"])){
				
				$postData = json_decode($_POST["requestData"]);

				if($_POST["encrypted"]){
					// if enryption is added change postData here
				}
			}

			$targetFunction = $_POST["targetFunc"];
			$shouldReturnObject = $_POST["returnObject"];
			if($shouldReturnObject == "true" || $shouldReturnObject == "True"){
				$shouldReturnObject = true;
			} else {
				$shouldReturnObject = false;
			}
			DatabaseController::callStringFunction($targetFunction,$postData,$shouldReturnObject);
		//} else {
			//echo "invalid ip-adress";
		//}
	}
 ?>