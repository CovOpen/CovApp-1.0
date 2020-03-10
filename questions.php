<!DOCTYPE html>
<html>
<head>
    <?php include("includes/head.php"); ?>
    <link href="css/bootstrap/example/jumbotron-narrow.css" rel="stylesheet">
    <script type="text/javascript" src="js/XMLWriter.js"></script>
    <script type="text/javascript" src="js/leap.js"></script>
    <script type="text/javascript" src="js/check.js"></script>
    <script type="text/javascript" src="js/ui.js"></script>
    <script type="text/javascript" src="js/qr.js"></script>
    <script type="text/javascript" src="js/questions.js"></script>

</head>

<body>

<div class="container">


    <div class="jumbotron">
        <div class="container-fluid text-left">
            <div class="row text-right">
                <label id="labelNumQuestion"></label>
            </div>
            <div class="row">
                <h2><label id="labelQuestionText"></label></h2>
            </div>
<h3>
            <form class="form-horizontal" id="radiobuttons">
                <fieldset>
                    <div class="radio">
                        <label id="option1"><input type="radio" id="roption1"></label>
                    </div>
                    <div class="radio">
                        <label id="option2"><input type="radio" id="roption2"></label>
                    </div>
                    <div class="radio">
                        <label id="option3"><input type="radio" id="roption3"></label>
                    </div>
                    <div class="radio">
                        <label id="option4"><input type="radio" id="roption4"></label>
                    </div>
                    <div class="radio">
                        <label id="option5"><input type="radio" id="roption5"></label>
                    </div>
                    <div class="radio">
                        <label id="option6"><input type="radio" id="roption6"></label>
                    </div>
                    <div class="radio">
                        <label id="option7"><input type="radio" id="roption7"></label>
                    </div>
                    <div class="radio">
                        <label id="option8"><input type="radio" id="roption8"></label>
                    </div>
                    <div class="radio">
                        <label id="option9"><input type="radio" id="roption9"></label>
                    </div>
                    <div class="radio">
                        <label id="option10"><input type="radio" id="roption10"></label>
                    </div>
                </fieldset>
                <div class="form-group">
                    <label class="control-label col-sm-3" id="labelText" for></label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="inputText">
                    </div>
                </div>
            </form>
</h3>
            <button id="next" class="btn btn-lg btn-primary btn-block">Nächste Frage</button>
        </div>
    </div>
    <?php include("includes/footer.php"); ?>
</div>
</body>
</html>
