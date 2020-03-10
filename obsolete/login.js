$(function () {

    jQuery(document).ready(init);

    function init() {
        jQuery("#btnSignIn").click(login);
        jQuery("#btnRegister").click(register);
        jQuery("#passwordForgottonLink").click(createNewPassword);

        $('#inputEmailSignIn').keyup(resetCustomValidity);
        $('#inputPasswordRegister').keyup(resetCustomValidity);

        $('#inputEmailRegister').keyup(resetCustomValidity);
        $('#inputPasswordRegister').keyup(resetCustomValidity);
        $('#inputPasswordRegisterRepeat').keyup(resetCustomValidity);
    }

    function resetCustomValidity(event) {
        event.target.setCustomValidity('');
    }

    function register() {
        $("#inputEmailRegister")[0].checkValidity();

        if ($("#inputEmailRegister")[0].validity.valueMissing) {
            $("#inputEmailRegister")[0].setCustomValidity("Please enter an email address for registration!");
            $("#btnRegister").effect('shake');
            return true; // simulate submit to enforce displaying error
        }

        if (!$("#inputEmailRegister")[0].validity.valid) {
            $("#inputEmailRegister")[0].setCustomValidity("Invalid email address!");
            $("#btnRegister").effect('shake');
            return true; // simulate submit to enforce displaying error
        }

        $("#inputPasswordRegister")[0].checkValidity();

        if ($("#inputPasswordRegister")[0].validity.valueMissing) {
            $("#inputPasswordRegister")[0].setCustomValidity("Please enter a password!");
            $("#btnRegister").effect('shake');
            return true; // simulate submit to enforce displaying error
        }
        
        if (!$("#inputPasswordRegister")[0].validity.valid) {
            $("#inputPasswordRegister")[0].setCustomValidity("Password must at least contain 8 characters.");
            $("#btnRegister").effect('shake');
            return true; // simulate submit to enforce displaying error
        }

        $("#inputPasswordRegisterRepeat")[0].checkValidity();

        if ($("#inputPasswordRegisterRepeat")[0].validity.valueMissing) {
            $("#inputPasswordRegisterRepeat")[0].setCustomValidity("Please repeat password.");
            $("#btnRegister").effect('shake');
            return true; // simulate submit to enforce displaying error
        }

        if ($("#inputPasswordRegisterRepeat").val() !== $("#inputPasswordRegister").val()) {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                title: 'Error',
                message: 'Passwords do not match.'
            });
            $("#btnRegister").effect('shake');
            return false; // no submit, display error via bootstrap popup
        }

        var loginEmail = $("#inputEmailRegister").val();
        var loginPassword = $("#inputPasswordRegister").val();
        $.ajax({
            type: "POST",
            url: "crudController.php",
            data: {action: "register",
                loginEmail: loginEmail,
                loginPassword: loginPassword},
            success: function (id) {
                if (id === "-1") { // User unbekannt oder Passwort falsch
                    $("#btnRegister").effect('shake');
                    return false; // prevent submitting form
                } else if (id === "-2") { // Account schon vergeben
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_WARNING,
                        title: 'Error: Email address already in database.',
                        message: 'An account has already been created for this email address.'
                    });
                    $("#btnRegister").effect('shake');
                    return false; // prevent submitting form
                } else {
                    sessionStorage.setItem('loginEmail', loginEmail);
                    sessionStorage.setItem('loginPassword', loginPassword);
                    sessionStorage.setItem('id', id);
                    window.location.href = "./doctormenu.php";
                }
            }
        });

        return false; // prevent submitting form
    }

    function login() {
        $("#inputEmailSignIn")[0].checkValidity();

        if ($("#inputEmailSignIn")[0].validity.valueMissing) {
            $("#inputEmailSignIn")[0].setCustomValidity("Please enter email address for login!");
            $("#btnSignIn").effect('shake');
            return true; // simulate submit to enforce displaying error
        }

        if (!$("#inputEmailSignIn")[0].validity.valid) {
            $("#inputEmailSignIn")[0].setCustomValidity("Invalid email address!");
            $("#btnSignIn").effect('shake');
            return true; // simulate submit to enforce displaying error
        }

        $("#inputPasswordSignIn")[0].checkValidity();

        if ($("#inputPasswordSignIn")[0].validity.valueMissing) {
            $("#inputPasswordSignIn")[0].setCustomValidity("Please enter your password!");
            $("#btnSignIn").effect('shake');
            return true; // simulate submit to enforce displaying error
        }

        var loginEmail = $("#inputEmailSignIn").val();
        var loginPassword = $("#inputPasswordSignIn").val();
        $.ajax({
            type: "POST",
            url: "crudController.php",
            data: {action: "login",
                loginEmail: loginEmail,
                loginPassword: loginPassword},
            success: function (id) {
                if (id !== "-1") {
                    sessionStorage.setItem('loginEmail', loginEmail);
                    sessionStorage.setItem('loginPassword', loginPassword);
                    sessionStorage.setItem('id', id);
                    window.location.href = "./doctormenu.php";
                } else {
                    $("#btnSignIn").effect('shake');
                }
            }
        });

        return false; // prevent submitting form
    }

    function createNewPassword() {
        var loginEmail = $("#inputEmailSignIn").val();

        $("#inputEmailSignIn")[0].checkValidity();

        if ($("#inputEmailSignIn")[0].validity.valueMissing) {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                title: 'Lost password',
                message: 'Please enter your email address where the password will be sent.'
            });
            return;
        }

        if (!$("#inputEmailSignIn")[0].validity.valid) {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                title: 'Lost password',
                message: 'Please enter a valid password!'
            });
            return;
        }

        $.ajax({
            type: "POST",
            url: "crudController.php",
            data: {action: "forgotten",
                loginEmail: loginEmail},
            success: function (result) {
                console.log(result);
                if (result === "-1") {
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_WARNING,
                        title: 'Lost password',
                        message: 'Account not found.'
                    });
                } else if (result === "1") {
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_INFO,
                        title: 'Lost password',
                        message: 'A new password has been sent to ' + loginEmail + '.'
                    });
                }
            }
        });
    }
});
