$(function () {

    $(document).ready(init);

    function init() {
        $('#button').click(processLoginId);
        $('#inputLoginId').keyup(resetValidity);
    }

    function processLoginId() {
        if (!check("#inputLoginId", "Please enter the login id!")) return true;

        var qrstr = $("#inputLoginId").val();


        if (qrstr.length < 8) return;
        var patient, idpatient, qrpassword;

        switch (qrstr.substring(0, 1)) {
            case "0":
                patient = false;
                break;
            case "1":
                patient = true;
                break;
            default:
                return;
        }
        qrpassword = qrstr.substring(1, 7);
        idpatient = qrstr.substring(7);

        sessionStorage.setItem("idpatient", idpatient);
        sessionStorage.setItem("qrpassword", qrpassword);
        sessionStorage.setItem('loginUsername', "");
        sessionStorage.setItem('loginPassword', "");
        if (patient) {

            window.location.href = "./questions.php";
        } else {
            window.location.href = "./viewPatient.php";
        }
        return false;
    }

});
