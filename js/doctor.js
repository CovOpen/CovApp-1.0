$(function () {

    $(document).ready(init);

    function init() {
        $("#button").click(login);
        $("#linkLostPassword").click(lostPassword);
        $('#inputLoginUsername').keyup(resetValidity);
        $('#inputLoginPassword').keyup(resetValidity);
    }


    function login() {
        if (!check("#inputLoginUsername", "Please enter a valid email address for registration!")) return true;
        if (!check("#inputLoginPassword", "Please enter your password!")) return true;

        var loginUsername = $("#inputLoginUsername").val();
        var loginPassword = $("#inputLoginPassword").val();
        $.ajax({
            type: "POST",
            url: "database.php",
            data: {
                action: "login",
                loginUsername: loginUsername,
                loginPassword: loginPassword
            },
            success: function (ret) {
                if (ret === "PasswordCorrect") {
                    sessionStorage.setItem('loginUsername', loginUsername);
                    sessionStorage.setItem('loginPassword', loginPassword);
                    window.location.href = "./scanPatients.php";
                } else {
                    showMessage("Incorrect password", "Please enter a correct user name and password.")
                }
            }
        });

        return false; // prevent submitting form
    }

    function lostPassword() {
        if (!check("#inputLoginUsername", "Please enter a valid email where your new password will be sent!")) return true;

        var loginUsername = $("#inputLoginUsername").val();
        $.ajax({
            type: "POST",
            url: "database.php",
            data: {
                action: "lostpassword",
                loginUsername: loginUsername
            },
            success: function (result) {
                console.log(result);
                if (result === "AccountNotFound") {
                    showMessage("Lost password", "Account not found. Please enter the email address of your account.")
                }
                if (result === "RecoveryEmailSent") {
                    showInfoMessage("Lost Password", "A new password has been sent to " + loginUsername + ".")
                }
            }
        });
    }
});
