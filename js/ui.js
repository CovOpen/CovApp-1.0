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
  $.getJSON(`/translations/${language}.json`, function(translations) {
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
