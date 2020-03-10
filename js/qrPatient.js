$(function () {
    const HIGHRISK = 3;
    const MEDIUMRISK = 2;
    const LOWRISK = 1;

    var qrcode_patient = new QRCode(document.getElementById("qrcode_patient"), {
        width: 300,
        height: 300,
        correctLevel: QRCode.CorrectLevel.H
    });

    var qrcode_patient_xml = new QRCode(document.getElementById("qrcode_patient_xml"), {
        width: 300,
        height: 300,
        correctLevel: QRCode.CorrectLevel.H
    });

    $(document).ready(init);

    function refreshUI() {
        $("#qrcode_instructions").append(UI(UI_QRCODEINSTRUCTIONS));
        $("#low_risk").append(UI(UI_LOWRISK));
        $("#medium_risk").append(UI(UI_MEDIUMRISK));
        $("#high_risk").append(UI(UI_HIGHRISK));
    }

    function init() {
        generateQR();
        getUI(refreshUI);
    }

    function risk_from_score(score) {
        if (score >= 1000) return HIGHRISK;
        if (score == 0) return LOWRISK;
        return MEDIUMRISK;
    }

    function hidecontrols(risk) {
        switch (risk) {
            case HIGHRISK:
                $("#medium_risk_card").hide();
                $("#low_risk_card").hide();
                break;
            case MEDIUMRISK:
                $("#high_risk_card").hide();
                $("#low_risk_card").hide();
                $("#qrcode").hide();
                break;

            case LOWRISK:
                $("#medium_risk_card").hide();
                $("#high_risk_card").hide();
                $("#qrcode").hide();
                break;
        }

    }

    function generateQR() {
        var score = sessionStorage.getItem('score');
        var qrxml_str = sessionStorage.getItem('qrxml_str');
        //$("#score").append("Score: " + score);

        hidecontrols(risk_from_score(score));

        if(risk_from_score(score) != HIGHRISK) return;

        $.ajax({
            type: "POST",
            url: "database.php",
            data: {
                action: "createqr"
            },
            success: function (ret) {
                try {
                    var answers_str = sessionStorage.getItem('answers');

                    var new_qrcode = JSON.parse(ret);
                    var id = new_qrcode[0].id;
                    var password = new_qrcode[0].password;
                    var qrstr_patient = encodeQR(id, password, answers_str);
                    qrcode_patient.makeCode(qrstr_patient);
                    qrcode_patient_xml.makeCode(qrxml_str);
//                    window.print();
                } catch (e) {
                    showMessage("QR codes not created", "QR codes could not be created.");
                }

                return false;
            },

        });

    }

});
