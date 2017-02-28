<?php
define('__ROOT__', dirname(__FILE__));
require_once(__ROOT__.'/core/DatabasePageValidation.php');
if(!DatabaseValidation::canRequest()){
	// init validation
	DatabaseValidation::initValidation();
}

 $site_path = realpath(dirname(__FILE__));
 define ('SITE_PATH', $site_path);
 define ('VIEWS_PATH', $site_path."/views/");
 require_once SITE_PATH.'/core/init.php';
 
  /*** error reporting on ***/
 error_reporting(E_ALL);

?>
