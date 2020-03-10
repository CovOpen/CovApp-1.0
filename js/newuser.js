$(function () {

    $(document).ready(init);

    function init() {
        $('#button').click(newuser);
        $('#inputNewUserUsername').keyup(resetValidity);
        $('#inputNewUserPassword').keyup(resetValidity);
        $('#inputNewUserPassword2').keyup(resetValidity);
    }

    function newuser() {

        if (!check("#inputNewUserUsername", "Please enter an email address for registration!")) return true;
        if (!check("#inputNewUserPassword", "Please enter a password with at least 6 characters!")) return true;
        if (!check("#inputNewUserPassword2", "Please repeat the password!")) return true;

        if ($("#inputNewUserPassword").val() !== $("#inputNewUserPassword2").val()) {
            showMessage("Password unmatched", "Password do not match. Please enter the same password twice.")
            return false; // no submit, display error via bootstrap popup
        }

        var loginUsername = $("#inputNewUserUsername").val();
        var loginPassword = $("#inputNewUserPassword").val();
        $.ajax({
            type: "POST",
            url: "database.php",
            data: {
                action: "newuser",
                loginUsername: loginUsername,
                loginPassword: loginPassword
            },
            success: function (ret) {
                if (ret === "AccountCreated") {
                    sessionStorage.setItem('loginUsername', loginUsername);
                    sessionStorage.setItem('loginPassword', loginPassword);
                    window.location.href = "./doctors.php";
                    return true;
                }

                if (ret === "UserExists") {
                    showMessage("User name exists", "An account has already been created for this email address.")
                    return false;
                }
                //Other Errors
                showMessage("An error occured while creating your account", ret)
                return false;
            }
        });

        return false;
    }
});
