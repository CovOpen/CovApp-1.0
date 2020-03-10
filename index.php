<!DOCTYPE html>
<html>
    <head>
        <?php include("includes/head.php"); ?>
        <link href="css/bootstrap/example/jumbotron-narrow.css" rel="stylesheet">
        <script type="text/javascript" src="js/check.js"></script>
        <script type="text/javascript" src="js/leap.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
        <script type="text/javascript" src="js/ui.js"></script>

    </head>

    <body>
        <div class="container">
            <div class="jumbotron">
                <h1 class="crop">CovAPP</h1>
		        <button id="button1" type="button" class="btn btn-secondary btn-lg btn-block" onclick="setLanguage(1);"><img src="./image/flags/Germany.png"> Deutsch</button>
		        <button id="button2" type="button" class="btn btn-secondary btn-lg btn-block" onclick="setLanguage(0);"><img src="./image/flags/United-Kingdom.png"> English</button>
                <button id="button3" type="button" class="btn btn-secondary btn-lg btn-block" onclick="setLanguage(2);"><img src="./image/flags/Italy.png"> Italiano</button>
                <button id="button4" type="button" class="btn btn-secondary btn-lg btn-block" onclick="setLanguage(6);"><img src="./image/flags/South-Korea.png"> 한국말</button>
                <button id="button5" type="button" class="btn btn-secondary btn-lg btn-block" onclick="setLanguage(5);"><img src="./image/flags/China.png"> 标准汉语</button>
                <button id="button6" type="button" class="btn btn-secondary btn-lg btn-block" onclick="setLanguage(3);"><img src="./image/flags/Spain.png"> Español</button>
                <button id="button7" type="button" class="btn btn-secondary btn-lg btn-block" onclick="setLanguage(9);"><img src="./image/flags/Portugal.png"> Português</button>
                <button id="button8" type="button" class="btn btn-secondary btn-lg btn-block" onclick="setLanguage(4);" disabled><img src="./image/flags/France.png"> Français</button>
                <button id="button9" type="button" class="btn btn-secondary btn-lg btn-block" onclick="setLanguage(7);" disabled><img src="./image/flags/Iran.png"> زبان فارسی </button>
		        <button id="button10" type="button" class="btn btn-secondary btn-lg btn-block" onclick="setLanguage(8);" disabled><img src="./image/flags/Turkey.png"> Türkçe</button>

            </div>
            <?php include("includes/menu.php"); ?>
            <?php include("includes/footer.php"); ?>
        </div>
    </body>
</html>
