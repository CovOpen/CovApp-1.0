<!DOCTYPE html>
<html lang="en">
<head>
    <?php include("includes/head.php"); ?>
    <script src="js/check.js"></script>
    <script src="js/newuser.js"></script>

</head>

<body>

<div class="container">

    <div class="jumbotron">

        <div class="row">
            <h2>New User</h2>
            <p>To create a new account, please enter your email address and password below.</p>
                <form class="formnewuser">
                    <input type="email" id="inputNewUserUsername" class="formElementTop form-control"
                           placeholder="E-Mail"
                           required>
                    <input type="password" id="inputNewUserPassword" class="formElementMiddle form-control"
                           placeholder="Password" required pattern=".{6,100}">
                    <input type="password" id="inputNewUserPassword2" class="formElementBottom form-control"
                           placeholder="Repeat Password" required>
                    <button id="button" class="btn btn-lg btn-primary btn-block">Sign Up</button>
                </form>

        </div>
    </div>
    <?php include("includes/menu.php"); ?>
    <?php include("includes/footer.php"); ?>

</div> <!-- /container -->
</body>
</html>
