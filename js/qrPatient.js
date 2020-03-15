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

    Copyright 2018-2020 Dr. med. M. Sc. Alexander H. Thieme
    */

$(function() {

  const HIGHRISK = 4;
  const MEDIUMRISK1 = 3;
  const MEDIUMRISK2 = 2;
  const LOWRISK = 1;

  width = window.innerWidth - 60;
  maxSize = 1024
  size = Math.min(width, maxSize)
  var qrcode_patient_xml = new QRCode(
    document.getElementById('qrcode_patient_xml'),
    {
      width: size,
      height: size,
      correctLevel: QRCode.CorrectLevel.H
    }
  );

  $(document).ready(init);

  function refreshUI() {

//    $('#qrcode_instructions').append(UI(UI_QRCODEINSTRUCTIONS));
    $('#low_risk').append(UI(UI_LOWRISK));
    $('#medium_risk1').append(UI(UI_MEDIUMRISK1));
    $('#medium_risk2').append(UI(UI_MEDIUMRISK2));
    $('#high_risk').append(UI(UI_HIGHRISK));
    $('#low_risk_title').append(UI(UI_LOWRISKTITLE));
    $('#medium_risk_title1').append(UI(UI_MEDIUMRISKTITLE1));
    $('#medium_risk_title2').append(UI(UI_MEDIUMRISKTITLE2));
    $('#high_risk_title').append(UI(UI_HIGHRISKTITLE));
  }

  function init() {
    generateQR();
    printAnswersTable();
    getUI(refreshUI);
    $('#print').click(function(){window.print()});
  }

  function scoreDigitSet(i,j) {
    var str = i.toString();
    while(str.length<6) str = "0" + str;
    if(str.substr(j-1,1) == '0') return false;
    return true;
  }

  function risk_from_score(score) {
    if (!score) return null;
    var severe_symptoms = scoreDigitSet(score,3);
    var light_symptoms = scoreDigitSet(score,4);
    var contact = scoreDigitSet(score,5);
    var riskregion = scoreDigitSet(score,6);
    var contactwithin14d = scoreDigitSet(score,1);
    var returnwithin14d = scoreDigitSet(score,2);
    if(!contactwithin14d) contact = false;
    if(!returnwithin14d) riskregion = false;

    if(severe_symptoms) return HIGHRISK;
    if(light_symptoms && (contact || riskregion)) return HIGHRISK;
    if(light_symptoms && !(contact || riskregion)) return MEDIUMRISK2;
    if(contact|| riskregion) return MEDIUMRISK1;
    return LOWRISK;
  }

  function hidecontrols(risk) {

    switch (risk) {
      case HIGHRISK:
        $('#high_risk_card').show();
        break;
      case MEDIUMRISK1:
        $('#medium_risk_card1').show();
        break;
      case MEDIUMRISK2:
          $('#medium_risk_card2').show();
          break;
      case LOWRISK:
        $('#low_risk_card').show();
        break;
    }
  }

  function printAnswersTable() {
    var printable_answers = localStorage.getItem('printable_answers');
    var tableHTML = generateAnswerTableHTML(JSON.parse(printable_answers))
    $('#answers_table').html(tableHTML);
  }

  function generateAnswerTableHTML(printable_answers) {
    html = "<table>"
    for (i = 0; i < printable_answers.length; i++) {
      html += "<tr><td>" + printable_answers[i].question + "</td><td>" + printable_answers[i].answer + "</td></tr>"
    }
    html += "</table>"
    return html
  }

  function generateQR() {
    var score = sessionStorage.getItem('score');
    var qrxml_str = localStorage.getItem('qrxml_str');
    //sessionStorage.removeItem('score');

    hidecontrols(risk_from_score(score));

    qrcode_patient_xml.makeCode(qrxml_str);

    return false;
  }
});
