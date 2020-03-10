<!DOCTYPE html>
<html>
<head>
    <?php include("includes/head.php"); ?>
    <link href="css/bootstrap/example/jumbotron-narrow.css" rel="stylesheet">
    <script type="text/javascript" src="js/instascan.js"></script>
    <script type="text/javascript" src="js/check.js"></script>
    <script type="text/javascript" src="js/qr.js"></script>
    <script type="text/javascript" src="js/scanPatients.js"></script>
</head>

<body>

<div class="container">
    <div class="jumbotron">
        <h1 class="crop">CovAPP</h1>
        <p class="lead"></p>
    </div>
    <div class="jumbotron">
        <p class="lead"><h2>Bitte halten Sie den QR Code vor die Kamera!</h2></p>
    </div>
    <div class="jumbotron">
        <img src="image/qrcodescan.jpeg" alt="qrcode">
    </div>
    <?php include("includes/doctormenu.php"); ?>
    <?php include("includes/footer.php"); ?>
</div>
</body>
</html>
