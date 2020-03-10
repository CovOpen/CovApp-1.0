$(function () {

    var addressFound=false;
    var lat;
    var lng;

    $(document).ready(init);

    function init() {
        $('#button').click(editProfile);
        getProfile();
    }

    function editProfile() {
        var loginUsername = sessionStorage.getItem('loginUsername');
        var loginPassword = sessionStorage.getItem('loginPassword');
        var lastname = $("#inputLastname").val();
        var firstname = $("#inputFirstname").val();
        var telephone = $("#inputTelephone").val();
        var address = $("#inputAddress").val();
        var hospital = $("#inputHospital").val();
        var notify_email;
        var notify_sms;

        if ($("#notify_email").prop("checked")) {
            notify_email = 1;
        } else {
            notify_email = 0;
        }

        if ($("#notify_sms").prop("checked")) {
            notify_sms = 1;
        } else {
            notify_sms = 0;
        }


        $.ajax({
            type: "POST",
            url: "database.php",
            data: {
                action: "editprofile",
                loginUsername: loginUsername,
                loginPassword: loginPassword,
                lastname: lastname,
                firstname: firstname,
                telephone: telephone,
                address: address,
                hospital: hospital,
                notify_sms: notify_sms,
                notify_email: notify_email

            },
            success: function (ret_str) {

                var ret = Number(ret_str);
                if (ret > 0) {
                    window.location.href = "./showPatients.php";
                    return true;
                }

                showMessage("Profile could not be added", "An error occured while the profile was saved to the database.");
                return false;
            }

        });

        return false;
    }

    function getProfile() {
        var loginUsername = sessionStorage.getItem('loginUsername');
        var loginPassword = sessionStorage.getItem('loginPassword');
        $.ajax({
            type: "POST",
            url: "database.php",
            data: {
                action: "getprofile",
                loginUsername: loginUsername,
                loginPassword: loginPassword
            },
            success: function (ret) {
                try {
                    profile = JSON.parse(ret);
                    $("#inputLastname").val(profile[0]['lastname']);
                    $("#inputFirstname").val(profile[0]['firstname']);
                    $("#inputHospital").val(profile[0]['hospital']);
                    $("#inputAddress").val(profile[0]['address']);
                    $("#inputTelephone").val(profile[0]['telephone']);
                    if (profile[0]['notify_sms'] == 1) {
                        $("#notify_sms").prop("checked", true);
                    } else {
                        $("#notify_sms").prop("checked", false);
                    }
                    if (profile[0]['notify_email'] == 1) {
                        $("#notify_email").prop("checked", true);
                    } else {
                        $("#notify_email").prop("checked", false);
                    }
                } catch (e) {
                    showMessage("Error.", "Profile could not be restored.");
                }

                return false;
            }

        });

    }
});