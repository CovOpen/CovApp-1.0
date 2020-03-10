<?php
try {
    $database = new PDO('mysql:host=localhost;port=7777;dbname=webprojekt', 'toxicity', 'toxicity14916');
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $database->exec('SET NAMES "utf8"');
} catch (PDOException $e) {
    $error = 'Error connecting to database server: ' . $e->getMessage();
    include 'error.php';
    exit();
}
?>