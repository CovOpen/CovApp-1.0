<!DOCTYPE html>
<html lang="en">
<head>
    <?php include("includes/head.php"); ?>
    <script type="text/javascript" src="js/check.js"></script>
    <script type="text/javascript" src="js/addPatient.js"></script>

</head>

<body>

<div class="container">
    <div class="jumbotron">
            <div class="container-fluid">
                <h2>Add Patient</h2>
                <p>Please enter the details of the new patient below.</p>
                <form class="form-horizontal" id="formaddpatient">
                    <div class="form-group">
                        <label class="control-label col-sm-3" for="inputForeignId">Foreign ID:</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="inputForeignId" placeholder="Foreign ID" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3" for="inputStartDate">Treatment Start Date:</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="inputStartDate" placeholder="StartDate (yyyy-mm-dd)" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3" for="selectorSheet">Sheet:</label>
                        <div class="col-sm-9">
                            <select class="form-control" id="selectorSheet"></select>
                        </div>
                    </div>
                    <button id="button" class="btn btn-lg btn-primary btn-block">Submit</button>
                </form>
            </div>
    </div>
    <?php include("includes/doctormenu.php"); ?>
    <?php include("includes/footer.php"); ?>
</div>
</body>
</html>
