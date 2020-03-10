<!DOCTYPE html>
<html>
<head>
    <?php include("includes/head.php"); ?>
    <script type="text/javascript" src="js/qrcode.min.js"></script>
    <script type="text/javascript" src="js/check.js"></script>
    <script type="text/javascript" src="js/qr.js"></script>
    <script type="text/javascript" src="js/ui.js"></script>
    <script type="text/javascript" src="js/qrPatient.js"></script>

</head>

<body>

<div class="container">
    <div class="jumbotron">


        <div id="score" align="left"></div>

        <div align="left" id="high_risk_card" class="card" style="width:300px">
            <img class="card-img-top" src="image/high_risk.png" alt="High Risk" width="300">
            <div class="card-body">
                <h3 class="card-title">Hohes Risiko</h3>
                <p id = "high_risk" class="card-text"></p>
            </div>
        </div>

        <div align="left" id="medium_risk_card" class="card" style="width:500px">
            <img class="card-img-top" src="image/medium_risk.png" alt="Medium Risk" width="300">
            <div class="card-body">
                <h3 class="card-title">Mittleres Risiko</h3>
                <p id = "medium_risk" class="card-text"></p>
                <a href="https://www.infektionsschutz.de/coronavirus-sars-cov-2.html" class="btn btn-primary">Weitere Informationen</a>
            </div>
        </div>

        <div align="left" id="low_risk_card" class="card" style="width:500px">
            <img class="card-img-top" src="image/low_risk.png" alt="Low Risk" width="300">
            <div class="card-body">
                <h3 class="card-title">Niedriges Risiko</h3>
                <p id = "low_risk" class="card-text"></p>
                <a href="https://www.infektionsschutz.de/coronavirus-sars-cov-2.html" class="btn btn-primary">Weitere Informationen</a>
            </div>
        </div>

        <div id="qrcode">
        <h3><div id="qrcode_instructions" align="left"></div></h3>
            <br>QR Code (efficient encoding):
        <div id="qrcode_patient" style="width:300px; height:300px; margin-top:50px;" class="container-fluid"></div>
            <br>QR Code (XML encoding):
            <div id="qrcode_patient_xml" style="width:300px; height:300px; margin-top:50px;" class="container-fluid"></div></div>

</div>
</body>
</html>
