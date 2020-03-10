$(function() {
  const HIGHRISK = 3;
  const MEDIUMRISK = 2;
  const LOWRISK = 1;

  var qrcode_patient_xml = new QRCode(
    document.getElementById('qrcode_patient_xml'),
    {
      width: 1000,
      height: 1000,
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
    getUI(refreshUI);
  }

  function risk_from_score(score) {
    if (score >= 100) return HIGHRISK;
    if (score == 0) return LOWRISK;
    return MEDIUMRISK;
  }

  function hidecontrols(risk) {
    switch (risk) {
      case HIGHRISK:
        $('#medium_risk_card').hide();
        $('#low_risk_card').hide();
        break;
      case MEDIUMRISK:
        $('#high_risk_card').hide();
        $('#low_risk_card').hide();
        break;

      case LOWRISK:
        $('#medium_risk_card').hide();
        $('#high_risk_card').hide();
        break;
    }
  }

  function generateQR() {
    var score = sessionStorage.getItem('score');
    var qrxml_str = sessionStorage.getItem('qrxml_str');

    hidecontrols(risk_from_score(score));

    qrcode_patient_xml.makeCode(qrxml_str);

    return false;
  }
});
