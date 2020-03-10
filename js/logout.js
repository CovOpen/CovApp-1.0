$(function () {

    var append_str;
    $(document).ready(init);

    function init() {
        sessionStorage.setItem('loginUsername', "");
        sessionStorage.setItem('loginPassword', "");
        window.location.href = "./index.php";
    }



});