$(function () {

    var append_str;
    $(document).ready(init);

    function init() {
        deletePatient();
    }

    function app_init() {
        append_str = "";
    }

    function app(str) {
        append_str = append_str + str;
    }
    function app_finish() {
        $("#dynamicdata").append(append_str);
    }


    function displayDeleteSuccess(idpatient) {
        app_init();
        app("Successfully deleted patient with id:" + idpatient)
        app_finish();
    }

    function deletePatient() {

        var loginUsername = sessionStorage.getItem('loginUsername');
        var loginPassword = sessionStorage.getItem('loginPassword');
        var idpatient = sessionStorage.getItem('idpatient');
        $.ajax({
            type: "POST",
            url: "database.php",
            data: {
                action: "deletepatient",
                loginUsername: loginUsername,
                loginPassword: loginPassword,
                idpatient: idpatient
            },
            success: function (ret) {
                if (ret != "DeleteSuccess") {
                    showMessage("Patient was not deleted", "The patient could not be deleted:\n" + ret);
                    return false;
                }
                displayDeleteSuccess(idpatient);

                return false;
            }

        });

    }

});