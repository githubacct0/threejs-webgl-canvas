<?php
	error_reporting(0);
	$name = $_POST["name"];
	$email = $_POST["email"];
	$company = $_POST["company"];
	$subject = 'Nikalabs - One Page Website';
	$content = $_POST["content"];

	$toEmail = $email;
	$mailHeaders = "From: Nikalabs <info@nikalabs.com>\r\n";
	//$res = array('success' =>1, 'message' => "Your contact information is received successfully.");
	
	$res = array();
	
	if(mail($toEmail, $subject, $content, $mailHeaders)) {
	    $res = array('success' =>1, 'message' => "Your contact information is received successfully.");
	}
	else {
		$res = array('success' =>0, 'message' => "Mail server not configured. Please check the server administration.");
	}
	
	echo json_encode($res);
	die();
?>