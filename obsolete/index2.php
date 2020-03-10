<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include("includes/head.php"); ?>
        <link href="css/bootstrap/example/jumbotron-narrow.css" rel="stylesheet">
        <script type="text/javascript" src="js/instascan.js"></script>
        <script type="text/javascript" src="js/check.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
    </head>

    <body>
	    <video playsinline controls="true" width="100" height="100" id="preview"></video>

        <div class="container">
            <div class="jumbotron">
                <h1 class="crop">CovApp.de</h1>
                <h2>Ambulanzbogen Coronavirus.</h2>
                <p class="lead"><h2>Bitte halten Sie den QR Code vor die Kamera Ihres Gerätes!</h2></p>
            </div>
            <div class="jumbotron">
                <img src="image/qrcodescan.jpeg" alt="qrcode">
            </div>
            <?php include("includes/menu.php"); ?>
            <?php include("includes/footer.php"); ?>
        </div>
    </body>
</html>
