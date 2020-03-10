function resetValidity(event) {
    event.target.setCustomValidity('');
}

function check(controlname, errorMessage) {
    $(controlname)[0].checkValidity();
    if ($(controlname)[0].validity.valueMissing || !$(controlname)[0].validity.valid) {
        $(controlname)[0].setCustomValidity(errorMessage);
        $("#button").effect('shake');
        return false;
    }
    return true;
}
function showMessage(title, errormsg) {
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_WARNING,
        title: title,
        message: errormsg
    });
    $("#button").effect('shake');

}

function showInfoMessage(title, infomsg) {
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_INFO,
        title: 'Info: ' + title,
        message: infomsg
    });
    //$("#button").effect('shake');

}
