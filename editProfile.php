<!DOCTYPE html>
<html lang="en">
<head>
    <?php include("includes/head.php"); ?>
    <script type="text/javascript" src="js/check.js"></script>
    <script type="text/javascript" src="js/editProfile.js"></script>
</head>

<body>

<div class="container">
    <div class="jumbotron">
        <div class="container-fluid">
            <h2>Edit Profile</h2>
            <p>Please add information to your profile below.</p>
            <form class="form-horizontal" id="formeditprofile">
                <div class="form-group">
                    <label class="control-label col-sm-3" for="inputFirstName">First Name:</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="inputFirstname" placeholder="First Name">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3" for="inputLastname">Last Name:</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="inputLastname" placeholder="Last Name">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3" for="inputAddress">Hospital:</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="inputHospital" placeholder="Hospital">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3" for="inputAddress">Address:</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="inputAddress" placeholder="Address">
                    </div>
                </div>
                <div class="form-group">
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="notify_email">
                        <label class="custom-control-label" for="notify_email">Receive notifications by email</label>
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-3" for="inputAddress">Mobile:</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="inputTelephone" placeholder="Mobile telephone number">
                    </div>
                </div>
                <div class="form-group">
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="notify_sms">
                        <label class="custom-control-label" for="notify_sms">Receive notifications by SMS</label>
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
