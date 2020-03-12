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

function setLanguage(lang) {
  sessionStorage.setItem('language', lang);
  window.location.href = `./intro/${lang}.html`;
}

$(document).ready(function() {
  if (localStorage.getItem('qrxml_str')) {
    $('#qrCodeFound').show();
  }
});
