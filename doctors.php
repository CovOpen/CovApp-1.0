<!DOCTYPE html>
<html lang="en">
<head>
    <?php include("includes/head.php"); ?>


    <script src="js/check.js"></script>
    <script src="js/doctor.js"></script>

</head>

<body>

<div class="container">
    <div class="jumbotron">
        <h2>Login</h2>
        <p>Bitte geben Sie Ihre Login-Details ein.</p>
        <div class="row">
            <form class="form-Login">
                <input type="email" id="inputLoginUsername" class="formElementTop form-control" placeholder="E-Mail"
                       required autofocus>
                <input type="password" id="inputLoginPassword" class="formElementBottom form-control"
                       placeholder="Password" required>
                <button id="button" class="btn btn-lg btn-primary btn-block">Login</button>
<!--
                <div class="row">
                    <a href="#" id="linkLostPassword">Passwort verloren</a>
                </div>
-->
            </form>
        </div>


<!--
        <div class="row">
            <a href="newuser.php">Registrieren</a>
        </div>
-->
    </div>
    <?php include("includes/menu.php"); ?>
    <?php include("includes/footer.php"); ?>

</div> <!-- /container -->
</body>
</html>
