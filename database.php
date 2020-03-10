<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
define('__ROOT__', dirname(dirname(__FILE__)));

require 'includes/connect.php';

function numericRandomPassword($length = 8)
{
    $chars = '0123456789';
    $count = mb_strlen($chars);

    for ($i = 0, $result = ''; $i < $length; $i++) {
        if($i == 0) {
            $index = rand(1, $count - 1);
        } else
        {
            $index = rand(0, $count - 1);
        }
        $result .= mb_substr($chars, $index, 1);
    }

    return $result;
}

function login($database, $loginUsername, $loginPassword)
{
    if (empty($loginUsername)) return -2; // sanety check
    if (empty($loginPassword)) return -1; // do not allow empty passwords

    $query = 'select iddoctor,password from doctor where username = :username';
    $statement = $database->prepare($query);
    $statement->bindValue(':username', $loginUsername);
    $statement->execute();
    $result = $statement->fetch();
    if ($result) {
        $password = $result['password'];
        if (password_verify($loginPassword, $password)) {
            return $result['iddoctor']; // Success
        } else {
            return -1; // Incorrect Password
        }
    }
    return -2; // Account not found
}

function qrlogin_doctor($database, $idpatient, $doctor_password)
{
    if (empty($idpatient)) return -2; // sanety check
    if (empty($doctor_password)) return -1; // do not allow empty passwords

    $query = 'select * from patient where idpatient = :idpatient';
    $statement = $database->prepare($query);
    $statement->bindValue(':idpatient', $idpatient);
    $statement->execute();
    $result = $statement->fetch();
    if ($result) {
        $password = $result['password_doctor'];
        if (password_verify($doctor_password,$password)) {
            return 1;
        } else {
            return -1; // Incorrect Password
        }
    }
    return -2; // Patient not found
}

function qrlogin_patient($database, $idpatient, $patient_password)
{
    if (empty($idpatient)) return -2; // sanety check
    if (empty($patient_password)) return -1; // do not allow empty passwords

    $query = 'select * from patient where idpatient = :idpatient';
    $statement = $database->prepare($query);
    $statement->bindValue(':idpatient', $idpatient);
    $statement->execute();
    $result = $statement->fetch();
    if ($result) {
        $password = $result['password_patient'];
        if (password_verify($patient_password,$password)) {
            return 1;
        } else {
            return -1; // Incorrect Password
        }
    }
    return -2; // Patient not found
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $loginUsername = "";
    $loginPassword = "";
    $qrpassword = "";
    $idpatient = "";

    if(isset($_POST['loginUsername'])) {
        $loginUsername = $_POST['loginUsername'];
    }
    if(isset($_POST['loginPassword'])) {
        $loginPassword = $_POST['loginPassword'];
    }
    if(isset($_POST['qrpassword'])) {
        $qrpassword = $_POST['qrpassword'];
    }
    if(isset($_POST['idpatient'])) {
        $idpatient = $_POST['idpatient'];
    }

    switch ($_POST['action']) {
        case 'login':
            $result = login($database, $loginUsername, $loginPassword);
            if ($result > 0) {
                echo 'PasswordCorrect';
            } else {
                echo 'PasswordIncorrect';
            }
            break;

        case 'newuser':
            $result = login($database, $loginUsername, $loginPassword);
            if ($result != -2) {
                echo 'UserExists';
            } else {
                $query = 'insert into doctor (username, password) value (:username, :password)';
                $statement = $database->prepare($query);
                $statement->bindValue(':username', $loginUsername);
                $statement->bindValue(':password', password_hash($loginPassword, PASSWORD_BCRYPT));
                $statement->execute();

                $from = "info@toxicity.pro";
                $to = $loginUsername;
                $headers = 'From: ' . $from . "\r\n" . 'Reply-To: ' . $from . "\r\n";
                $subject = "Toxicity.Pro Login";
                $body = "Welcome to Toxicity.Pro\r\n";
                $body .= "\r\n";
                $body .= "You can now login into your account.\r\n";
                $body .= "\r\n";
                $body .= "Username: " . $loginUsername . "\r\n";
                $body .= "\r\n";
                $body .= "Have a great day!\r\n";
                mail($to, $subject, $body, $headers);

                echo 'AccountCreated'; // Success
            }
            break;

        case 'addpatient':
            $startdate = $_POST['startdate'];
            $foreignid = $_POST['foreignid'];
            $idsheet = $_POST['idsheet'];
            $iddoctor = login($database, $loginUsername, $loginPassword);
            if ($iddoctor < 0) {
                echo 'PasswordIncorrect';
                return;
            }
            $query = 'insert into patient (foreignid, startdate, idsheet,iddoctor) value (:foreignid, :startdate, :idsheet, :iddoctor)';

            $statement = $database->prepare($query);
            $statement->bindValue(':foreignid', $foreignid);
            $statement->bindValue(':startdate', $startdate);
            $statement->bindValue(':idsheet', $idsheet);
            $statement->bindValue(':iddoctor', $iddoctor);
            if ($statement->execute()) {
                echo $database->lastInsertId(); // Success
                return;
            }
            echo -1;

            break;

        case 'editprofile':
            $lastname = $_POST['lastname'];
            $firstname = $_POST['firstname'];
            $address = $_POST['address'];
            $telephone = $_POST['telephone'];
            $hospital = $_POST['hospital'];
            $notify_sms = $_POST['notify_sms'];
            $notify_email = $_POST['notify_email'];
            $iddoctor = login($database, $loginUsername, $loginPassword);
            if ($iddoctor < 0) {
                echo 'PasswordIncorrect';
                return;
            }
            $statement = $database->prepare("update doctor set lastname = :lastname, firstname = :firstname, address = :address, telephone = :telephone, hospital = :hospital, notify_sms = :notify_sms, notify_email = :notify_email where username = :username");
            $statement->bindValue(':username', $loginUsername);
            $statement->bindValue(':lastname', $lastname);
            $statement->bindValue(':firstname', $firstname);
            $statement->bindValue(':address', $address);
            $statement->bindValue(':telephone', $telephone);
            $statement->bindValue(':hospital', $hospital);
            $statement->bindValue(':notify_sms', $notify_sms);
            $statement->bindValue(':notify_email', $notify_email);
            $statement->execute();
            if ($statement->execute()) {
                echo 1; // Success
                return;
            }
            echo -1;

            break;
        case 'getprofile':
            $iddoctor = login($database, $loginUsername, $loginPassword);
            if ($iddoctor < 0) {
                echo 'PasswordIncorrect';
                return;
            }

            $profile = array();
            $statement = $database->prepare("select * from doctor where username = :username");
            $statement->bindValue(':username', $loginUsername);
            $statement->execute();
            while ($result = $statement->fetch()) {
                $profile[] = array(
                    'lastname' => $result['lastname'],
                    'firstname' => $result['firstname'],
                    'hospital' => $result['hospital'],
                    'address' => $result['address'],
                    'telephone' => $result['telephone'],
                    'notify_sms' => $result['notify_sms'],
                    'notify_email' => $result['notify_email']
                );
            }
            echo json_encode($profile);
            break;


        case 'lostpassword':
            $loginPassword = "dummy";

            $result = login($database, $loginUsername, $loginPassword);
            if ($result == -2) {
                echo 'AccountNotFound';
            } else {
                $loginPassword = numericRandomPassword(8);
                $statement = $database->prepare("update doctor set password = :password where username = :username");
                $statement->bindValue(':username', $loginUsername);
                $statement->bindValue(':password', password_hash($loginPassword, PASSWORD_BCRYPT));
                $statement->execute();

                $from = "info@toxicity.pro";
                $to = $loginUsername;
                $headers = 'From: ' . $from . "\r\n" . 'Reply-To: ' . $from . "\r\n";
                $subject = "Toxicity.Pro Login";
                $body = "Welcome to Toxicity.Pro\r\n";
                $body .= "\r\n";
                $body .= "Below you can find your login credentials.\r\n";
                $body .= "\r\n";
                $body .= "Username: " . $loginUsername . "\r\nYour Password: " . $loginPassword;
                $body .= "\r\n";
                $body .= "Have a great day!\r\n";
                mail($to, $subject, $body, $headers);
                echo 'RecoveryEmailSent';
            }
            break;
        case 'createqr':
		// FIXME client can great an unlimited amount of ids, DDOS possible
            $new_qrcode = array();

            $password = numericRandomPassword(9);
            $id = numericRandomPassword(9); // use random id, so number of users is not exploited, low probability of duplicate entry
            $new_qrcode[] = array( 'password' => $password,'id' => $id);
            $statement = $database->prepare("insert into qrcode (id,password,time,qrread) value (:id, :password, now(), '0')");
            $statement->bindValue(':id', $id);
            $statement->bindValue(':password', $password);
            $statement->execute();

            echo json_encode($new_qrcode);
            break;

        case 'getui':
            $language = $_POST['language'];
            $ui = array();
            $statement = $database->prepare("select * from ui where language = :language");
            $statement->bindValue(':language', $language);
            $statement->execute();
            while ($result = $statement->fetch()) {
                $ui[] = array(
                    'idui' => $result['idui'],
                    'text' => $result['text']
                );
            }
            echo json_encode($ui);
            break;
        case 'getquestions':
            $language = $_POST['language'];
            $questions = array();
            $statement = $database->prepare("select * from question as q, questiontext as qt, sheetquestion as s where s.idsheet = 8 and q.idquestion = s.idquestion and q.idquestion = qt.idquestion and qt.language = :language and q.enabled = 1 order by q.idquestion");
            $statement->bindValue(':language', $language);
            $statement->execute();
            while ($result = $statement->fetch()) {
                $questions[] = array(
                    'idquestion' => $result['idquestion'],
                    'XMLFIELD' => $result['XMLFIELD'],
                    'text' => $result['text'],
                    'type' => $result['type'],
                    'option1' => $result['option1'],
                    'option2' => $result['option2'],
                    'option3' => $result['option3'],
                    'option4' => $result['option4'],
                    'option5' => $result['option5'],
                    'option6' => $result['option6'],
                    'option7' => $result['option7'],
                    'option8' => $result['option8'],
                    'option9' => $result['option9'],
                    'option10' => $result['option10'],
                    'nextquestion1' => $result['nextquestion1'],
                    'nextquestion2' => $result['nextquestion2'],
                    'nextquestion3' => $result['nextquestion3'],
                    'nextquestion4' => $result['nextquestion4'],
                    'nextquestion5' => $result['nextquestion5'],
                    'nextquestion6' => $result['nextquestion6'],
                    'nextquestion7' => $result['nextquestion7'],
                    'nextquestion8' => $result['nextquestion8'],
                    'nextquestion9' => $result['nextquestion9'],
                    'nextquestion10' => $result['nextquestion10'],
                    'score1' => $result['score1'],
                    'score2' => $result['score2'],
                    'score3' => $result['score3'],
                    'score4' => $result['score4'],
                    'score5' => $result['score5'],
                    'score6' => $result['score6'],
                    'score7' => $result['score7'],
                    'score8' => $result['score8'],
                    'score9' => $result['score9'],
                    'score10' => $result['score10']
                );
            }
            echo json_encode($questions);
            break;

        case 'saveanswer':
            $password_patient = $qrpassword;
            $idquestion = $_POST['idquestion'];
            $answervalue = $_POST['answervalue'];

            if (qrlogin_patient($database, $idpatient, $password_patient) < 0) {
                echo 'PasswordIncorrect';
                return;
            }

            $query = "insert into answer (idpatient,idquestion,answervalue,dateofanswer,notified) value (:idpatient, :idquestion, :answervalue, now(),0)";
            $statement = $database->prepare($query);
            $statement->bindValue(':idpatient', $idpatient);
            $statement->bindValue(':idquestion', $idquestion);
            $statement->bindValue(':answervalue', $answervalue);
            $statement->execute();
            echo "AnswerSaved";
            break;

        case 'getanswers':
            $password_doctor = $qrpassword;

            if($password_doctor == "") {
                $iddoctor = login($database, $loginUsername, $loginPassword);
                if ($iddoctor < 0) {
                    echo 'PasswordIncorrect';
                    return;
                }

            } else {
                if (qrlogin_doctor($database, $idpatient, $password_doctor) < 0) {
                    echo 'PasswordIncorrect';
                    return;
                }
            }



            $answers = array();
            $statement = $database->prepare("select * from answer as a, question as q where a.idpatient = :idpatient and a.idquestion = q.idquestion");
            $statement->bindValue(':idpatient', $idpatient);
            $statement->execute();
            while ($result = $statement->fetch()) {
                $answers[] = array(
                    'idquestion' => $result['idquestion'],
                    'text' => $result['text'],
                    'type' => $result['type'],
                    'option1' => $result['option1'],
                    'option2' => $result['option2'],
                    'option3' => $result['option3'],
                    'option4' => $result['option4'],
                    'option5' => $result['option5'],
                    'yellow' => $result['yellow'],
                    'red' => $result['red'],
                    'alert' => $result['alert'],
                    'answervalue' => $result['answervalue'],
                    'dateofanswer' => $result['dateofanswer']
                );
            }
            echo json_encode($answers);
            break;
        case 'deletepatient':


            $iddoctor = login($database, $loginUsername, $loginPassword);
            if ($iddoctor < 0) {
                echo 'PasswordIncorrect';
                return;
            }

            $statement = $database->prepare("delete from answer where idpatient = :idpatient");
            $statement->bindValue(':idpatient', $idpatient);
            $statement->execute();

            $statement = $database->prepare("delete from patient where idpatient = :idpatient");
            $statement->bindValue(':idpatient', $idpatient);
            $statement->execute();

            echo 'DeleteSuccess';
            break;

        case 'getpatients':

            $iddoctor = login($database, $loginUsername, $loginPassword);
            if ($iddoctor < 0) {
                echo 'PasswordIncorrect';
                return;
            }
            $patients = array();
            $statement = $database->prepare("select * from patient where iddoctor = :iddoctor");
            $statement->bindValue(':iddoctor', $iddoctor);
            $statement->execute();
            while ($result = $statement->fetch()) {
                $patients[] = array(
                    'idpatient' => $result['idpatient'],
                    'foreignid' => $result['foreignid'],
                    'password_patient' => $result['password_patient'],
                    'password_doctor' => $result['password_doctor'],
                    'lastname' => $result['lastname'],
                    'firstname' => $result['firstname']
                );
            }
            echo json_encode($patients);
            break;


    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = array();
    if ($_GET['query'] === 'getsheets') {
        $queryResult = $database->query('select * from sheet');
        foreach ($queryResult as $row) {
            $result[] = array(
                'idsheet' => $row['idsheet'],
                'name' => $row['name']
            );
        }
    }
    echo json_encode($result);
}
?>
