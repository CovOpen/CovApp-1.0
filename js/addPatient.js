$(function () {

    $(document).ready(init);

    function init() {

        $('#button').click(addPatient);
        $('#inputLastname').keyup(resetValidity);
        $('#inputFirstname').keyup(resetValidity);
        $('#inputBirthday').keyup(resetValidity);
        $('#inputStartDate').keyup(resetValidity);
        $('#inputForeignId').keyup(resetValidity);


        getSheets();

    }

    function getSheets() {

        $.getJSON("database.php?query=getsheets", function (sheets) {
            for (var i = 0; i < sheets.length; i++) {
                $("#selectorSheet").append($('<option>', {value: sheets[i].idsheet, text: sheets[i].name}));
            }
        });
    }

    function addPatient() {


        if (!check("#inputForeignId", "Please enter the foreign id of the patient or \"none\"!")) return true;
        //if (!check("#inputLastname", "Please enter the last name of the patient!")) return true;
        //if (!check("#inputFirstname", "Please enter the first name of the patient!")) return true;
        //if (!check("#inputBirthday", "Please enter the birthday of the patient!")) return true;
        if (!check("#inputStartDate", "Please enter the treatment start date of the patient!")) return true;


        var loginUsername = sessionStorage.getItem('loginUsername');
        var loginPassword = sessionStorage.getItem('loginPassword');
        var idsheet = $("#selectorSheet").val();
        var foreignid = $("#inputForeignId").val();
        var startdate = $("#inputStartDate").val();


        $.ajax({
            type: "POST",
            url: "database.php",
            data: {
                action: "addpatient",
                loginUsername: loginUsername,
                loginPassword: loginPassword,
                startdate: startdate,
                foreignid: foreignid,
                idsheet: idsheet
            },
            success: function (idpatient_str) {

                var idpatient = Number(idpatient_str);
                if (idpatient > 0) {
                    sessionStorage.setItem('idpatient', idpatient);
                    window.location.href = "./qrPatient.php";
                    return true;
                }

                showMessage("Patient could not be added", "An error occured while the patient was added to the database.");
                return false;
            },

        });

    return false;
    }
});
