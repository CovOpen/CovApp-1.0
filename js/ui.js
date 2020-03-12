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



const UI_NEXT = "0";
const UI_QUESTION_ERROR = "1";
const UI_QUESTION_ERRORMESSAGE = "2";
const UI_QRCODEINSTRUCTIONS = "3";
const UI_LOWRISK = "4";
const UI_MEDIUMRISK = "5";
const UI_HIGHRISK = "6";

var ui_strings;
function getUI(UIcallback) {
  var language = sessionStorage.getItem("language");
  $.getJSON(`./translations/${language}.json`, function(translations) {
    ui_strings = translations;
    UIcallback();
  }).fail(function(e) {
    console.log(e);
  });
}

function UI(token) {
  for (i = 0; i < ui_strings.length; i++) {
    if (ui_strings[i]["idui"] === token) return ui_strings[i]["text"];
  }
  return "translation missing";
}
