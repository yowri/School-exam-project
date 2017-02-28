<?php 
	/**
	* In this file you can configure the database settings and the root path
	*/
	class DatabaseConfigure
	{
		public static $DBhost ='localhost';
		public static $DBuser = 'root';
		public static $DBpass = '';

		public static $DBname = 'utszeilboten';
		
		public static $mailHost = 'smtp.gmail.com';
		public static $SMTPAuth = true;
		public static $mailUsername = 'DewaaiZeilboten@gmail.com';
		public static $mailPassword = 'Dewaaiboten12';
		public static $smtpSecure = 'tls';
		public static $mailPort = 587 ;
		public static $mailFrom = 'DewaaiZeilboten@gmail.com';
		public static $mailFromname = 'De waai zeilboten';

		public static $SaltToken = 'xLJXoTpM4F1ZPjo7d5Vd';
	}
 ?>