/*

    This file is part of CovAPP.

    CovAPP is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    CovAPP is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with CovAPP.  If not, see <http://www.gnu.org/licenses/>.

    */

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
