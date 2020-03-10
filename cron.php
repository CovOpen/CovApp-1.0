<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
define('__ROOT__', dirname(dirname(__FILE__)));

include 'includes/connect.php';

$statement = $database->prepare("SELECT patient.idpatient, patient.foreignid, doctor.username FROM answer,question,patient,doctor where answer.idquestion = question.idquestion and answer.idpatient = patient.idpatient and patient.iddoctor = doctor.iddoctor and answer.answervalue >= question.alert and answer.notified = 0 and doctor.notify_email = 1 and answer.dateofanswer <= (NOW() - INTERVAL 10 MINUTE) group by patient.idpatient;");
$statement->execute();


while ($result = $statement->fetch()) {
	$notifications_email[] = array(
		'username' => $result['username'],
		'idpatient' => $result['idpatient'],
	        'foreignid' => $result['foreignid'],
	);
}

if(isset($notifications_email)) {
	for($i=0; $i<count($notifications_email); $i++) {
		$from = "info@toxicity.pro";
		$to = $notifications_email[$i]['username'];
		$headers = 'From: ' . $from . "\r\n" . 'Reply-To: ' . $from . "\r\n";
		$subject = "Toxicity.Pro Email Notification";
		$body = "A patient has entered a critical answer.\r\n";
		$body .= "Patient ID: " . $notifications_email[$i]['idpatient'] . "\r\n";;
	        $body .= "Foreign ID: " . $notifications_email[$i]['foreignid'] . "\r\n";;
		mail($to, $subject, $body, $headers);
	}
}

$statement = $database->prepare("SELECT patient.idpatient, patient.foreignid, doctor.username, doctor.telephone FROM answer,question,patient,doctor where answer.idquestion = question.idquestion and answer.idpatient = patient.idpatient and patient.iddoctor = doctor.iddoctor and answer.answervalue >= question.alert and answer.notified = 0 and doctor.notify_sms = 1 and answer.dateofanswer <= (NOW() - INTERVAL 10 MINUTE) group by patient.idpatient;");
$statement->execute();

while ($result = $statement->fetch()) {
	$notifications_sms[] = array(
        	'username' => $result['username'],
        	'idpatient' => $result['idpatient'],
        	'foreignid' => $result['foreignid'],
        	'telephone' => $result['telephone']
	);
}

if(isset($notifications_sms)) {
	for($i=0; $i<count($notifications_sms); $i++) {
		$from = "info@toxicity.pro";
		$to = $notifications_sms[$i]['telephone'] . "@email2sms.websms.com";
		$headers = 'From: ' . $from . "\r\n" . 'Reply-To: ' . $from . "\r\n";
		$subject = "SMSGW-Auth: a.engels7@gmx.de:Blablabla1";
		$body = "A patient has entered a critical answer.\r\n";
        	$body .= "Patient ID: " . $notifications_sms[$i]['idpatient'] . "\r\n";
        	$body .= "Foreign ID: " . $notifications_sms[$i]['foreignid'] . "\r\n";
		mail($to, $subject, $body, $headers);
	}
}

if(isset($notifications_email)) {
	for($i=0; $i<count($notifications_email); $i++) {
		$statement = $database->prepare("update answer set notified = 1 where idpatient = :idpatient");
		$statement->bindValue(':idpatient', $notifications_email[$i]['idpatient']);
		$statement->execute();
	}
}


if(isset($notifications_sms)) {
	for($i=0; $i<count($notifications_sms); $i++) {
		$statement = $database->prepare("update answer set notified = 1 where idpatient = :idpatient");
		$statement->bindValue(':idpatient', $notifications_sms[$i]['idpatient']);
		$statement->execute();
	}
}

return 0;


?>
