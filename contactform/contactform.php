<?php
/**
 * PHP contact form script
 * Version: 2.0
 * Hermes Garcia
 * info@hermesgarcia.com
 */

require '../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/***************** Configuration *****************/
//SMTP Config
$SMTPHost = '';
$SMTPUsername = '';
$SMTPPassword = '';
//Mailing Config
$contactEmailFrom = '';
$contactEmailTo = '';
$ccEmail = '';
$subjectTitle = 'Mensaje desde hermesgarcia.com';
$nameTitle = 'Nombre:';
$emailTitle = 'Email:';
$messageTitle = 'Mensaje:';
//Error Config
$contactErrorName = 'El nombre es muy corto o muy largo';
$contactErrorEmail = 'Por favor ingresa un email válido';
$contactErrorSubject = 'El asunto es muy corto o muy largo';
$contactErrorMessage = 'Tu mensaje es muy corto, escribe un poco más para nosotros';

/********** Send Script ***********/
$tz = 'America/Mexico_City';
$timestamp = time();
$dt = new DateTime("now", new DateTimeZone($tz));
$dt->setTimestamp($timestamp);
$date = $dt->format('Y-m-d H:i:s');

if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
	die('Lo sentimos, la petición debe ser tipo Ajax POST');
}

if(isset($_POST)) {

	$name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
	$email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
	$subject = filter_var($_POST["subject"], FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
	$message = filter_var($_POST["message"], FILTER_SANITIZE_STRING);

	if($contactEmailTo == '') {
		die('El email de recepción para el formulario de contacto no ha sudo configurado');
	}

	if(strlen($name)<3 || strlen($name)>50){
		die($contactErrorName);
	}

	if(!$email){
		die($contactErrorEmail);
	}

	if(strlen($subject)<3 || strlen($subject)>50){
		die($contactErrorSubject);
	}

	if(strlen($message)<3 || strlen($message)>256){
		die($contactErrorMessage);
	}

	if(!isset($contactEmailFrom)) {
		$contactEmailFrom = 'contacto@' . @preg_replace('/^www\./','', $_SERVER['SERVER_NAME']);
	}
	
	$mail = new PHPMailer(true);
	
	try {
		$mail->isSMTP();
		$mail->Host       = $SMTPHost;
		$mail->SMTPAuth   = true;
		$mail->Username   = $SMTPUsername;
		$mail->Password   = $SMTPPassword;
		$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
		$mail->Port       = 465;
		$mail->setFrom($contactEmailFrom, $name);
		$mail->addReplyTo($email);
		$mail->addAddress($contactEmailTo);
		if($ccEmail != ''){
			$mail->addCC($ccEmail);
		}
		if(isset($bccEmail) && $bccEmail != ''){
			$mail->addBCC($bccEmail);
		}
		
		$message_content = '<strong>' . $nameTitle . '</strong> ' . $name . '<br>';
		$message_content .= '<strong>' . $emailTitle . '</strong> ' . $email . '<br>';
		$message_content .= '<strong>' . $messageTitle . '</strong> ' . nl2br($message);
		
		$mail->isHTML(true);
		$mail->Subject = $subjectTitle . ' ' . $subject;
		$mail->Body    = $message_content;
		$mail->AltBody = $message_content;
		
		$mail->send();
		echo 'OK';
	} catch (Exception $e) {
		echo 'El mensaje no pudo ser enviado, intentalo de nuevo.';
	}
	
}
