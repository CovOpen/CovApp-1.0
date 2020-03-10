$(function () {

    $(document).ready(init);

    function init() {

        initQRScanner();

    }

    function qrCodeFound(qrstr) {

        if(qrstr.substring(0, 3) !== "COV") {
            showMessage("QRCode", qrstr);
            return;
        }
        sessionStorage.setItem("qrstr", qrstr);
        window.location.href = "./showPatient.php";
    }

    function initQRScanner() {
        let scanner = new Instascan.Scanner({video: document.getElementById('preview')});
        scanner.addListener('scan', qrCodeFound);

        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                if (cameras.length > 1) {
                    scanner.start(cameras[1]);
                }
                else {
                    scanner.start(cameras[0]);
                }
            } else {
                window.location.href = "./nowebcam.php";
            }
        }).catch(function (e) {
            window.location.href = "./nowebcam.php";
        });

    }

});
