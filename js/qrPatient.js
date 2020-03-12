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
  const HIGHRISK = 3;
  const MEDIUMRISK = 2;
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
    $('#qrcode_instructions').append(UI(UI_QRCODEINSTRUCTIONS));
    $('#low_risk').append(UI(UI_LOWRISK));
    $('#medium_risk').append(UI(UI_MEDIUMRISK));
    $('#high_risk').append(UI(UI_HIGHRISK));
  }

  function init() {
    generateQR();
    printAnswersTable();
    getUI(refreshUI);
    $('#print').click(function(){window.print()});
  }

  function risk_from_score(score) {
    if (!score) return null;
    if (score >= 100) return HIGHRISK;
    if (score == 0) return LOWRISK;
    return MEDIUMRISK;
  }

  function hidecontrols(risk) {
    switch (risk) {
      case HIGHRISK:
        $('#high_risk_card').show();
        break;
      case MEDIUMRISK:
        $('#medium_risk_card').show();

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
    sessionStorage.removeItem('score');

    hidecontrols(risk_from_score(score));

    qrcode_patient_xml.makeCode(qrxml_str);

    return false;
  }
});
