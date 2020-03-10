$(function() {
  var lastMessageDisplayed = false;
  var questions;
  var current_question;
  var answers = [];
  var current_numoptions = null;
  var score;

  const NUMOPTIONS = 10;

  const TYPE_MULTIPLECHOICE = '1';
  const TYPE_FREETEXT = '2';
  const TYPE_DISCLAIMER = '0';

  $(document).ready(init);

  function refreshUI() {
    $('#next').text(UI(UI_NEXT));
  }

  function init() {
    getQuestions();
    getUI(refreshUI);
    $('#next').click(nextQuestion);
  }

  function finished() {
    lastMessageDisplayed = true;
    hideRadiobuttons();
    hideInputText();

    var qrxml_str = encodeXMLQR(answers, questions);
    sessionStorage.setItem('qrxml_str', qrxml_str);
    sessionStorage.setItem('score', score);
    window.location.href = './qrPatient.html';
  }

  function saveAnswer(question) {
    var value = getAnswerValue(question);
    answers[current_question] = value;
    var score_answer = question['score' + value];
    if (score_answer != null) score += parseInt(score_answer);
  }

  function getAnswerValue(question) {
    switch (question['type']) {
      case TYPE_MULTIPLECHOICE:
        for (i = 1; i <= NUMOPTIONS; i++) {
          if ($('#radiooption' + i).is(':checked')) return i;
        }
        break;
      case TYPE_FREETEXT:
        if (
          $('#inputText')
            .val()
            .trim().length === 0
        )
          return -1;
        var ret = Number($('#inputText').val());
        return ret;
        break;
    }
    return -1;
  }

  function unsetboldRadiobuttons() {
    for (i = 1; i <= NUMOPTIONS; i++) {
      $('#option' + i).css('font-weight', 'normal');
    }
  }

  function uncheckRadiobuttons() {
    for (i = 1; i <= NUMOPTIONS; i++) {
      $('#radiooption' + i).prop('checked', false);
    }
  }

  function leap_action(
    contaminated,
    too_low,
    hand_detected,
    height,
    selected,
    selected_final,
    palmposition
  ) {
    //if(question['type'] !== TYPE_MULTIPLECHOICE) return;
    /*if(contaminated) {
            $('body').css('background-image','url(/image/red.png)');
        }*/
    var selected_radiooption = height + 1;
    if (selected_radiooption > current_numoptions)
      selected_radiooption = current_numoptions;
    if (hand_detected) {
      //$("#labelQuestionText").text("hand detected, position: " + palmposition + " height: " + height);
      $('#radiooption' + selected_radiooption).prop('checked', true);
      if (selected) {
        $('#option' + selected_radiooption).css('font-weight', 'Bold');
      } else {
        unsetboldRadiobuttons();
      }
      if (selected_final) {
        nextQuestion(1);
      }
    } else {
      //$("#labelQuestionText").text("hand not detected");
      unsetboldRadiobuttons();
      uncheckRadiobuttons();
    }
    return;
  }

  function questionAnswered(question) {
    if (getAnswerValue(question) < 0) {
      return false;
    }
    return true;
  }

  function nextQuestion(event) {
    var question = questions[current_question];
    if (!questionAnswered(question)) {
      showMessage(UI(UI_QUESTION_ERROR), UI(UI_QUESTION_ERRORMESSAGE));
      return false;
    }
    saveAnswer(question);
    if (current_question + 1 === questions.length) {
      finished();
      return false;
    }
    nextquestion = question['nextquestion' + getAnswerValue(question)];
    if (nextquestion == null) {
      current_question++;
    } else {
      for (i = 0; i < questions.length; i++) {
        if (questions[i]['idquestion'] === nextquestion) {
          current_question = i;
          break;
        }
      }
    }
    displayQuestion();
    return false;
  }

  function setRadioButton(controlname, text) {
    if (text == null) {
      $(controlname).hide();
      text = '';
    } else {
      current_numoptions++;
      $(controlname).show();
    }
    $(controlname).html(
      '<input type="radio" id="radio' +
        controlname.substr(1) +
        '" name="1">' +
        text
    );
  }

  function hideRadiobuttons() {
    for (i = 1; i <= NUMOPTIONS; i++) {
      setRadioButton('#option' + i, null);
    }
  }
  function showRadiobuttons() {
    // nothing to do, will be done by setRadiobutton
  }

  function hideInputText() {
    $('#labelText').hide();
    $('#inputText').hide();
  }

  function showInputText() {
    $('#inputText').show();
    $('#inputText').val('');
    $('#labelText').show();
  }

  function displayAnswerOptions(question) {
    switch (question['type']) {
      case TYPE_MULTIPLECHOICE:
        hideInputText();
        showRadiobuttons();
        current_numoptions = 0;
        for (i = 1; i <= NUMOPTIONS; i++) {
          setRadioButton('#option' + i, question['option' + i]);
        }
        break;
      case TYPE_FREETEXT:
        hideRadiobuttons();
        showInputText();
        $('#labelText').text(question['option1']);
        break;
    }
  }

  function displayQuestion() {
    if (questions == null || current_question >= questions.length) {
      showMessage(
        'Cannot display question.',
        'Question ' + i + ' cannot be displayed'
      );
      return;
    }
    var question = questions[current_question];
    //$("#labelNumQuestion").text("Frage " + (current_question + 1) + " von " + questions.length);
    $('#labelQuestionText').text(question['text']);
    displayAnswerOptions(question);
  }

  function getQuestions() {
    var language = sessionStorage.getItem('language');
    $.getJSON(`./questions/${language}.json`, function(response) {
      questions = response;
      current_question = 0;
      for (i = 0; i < questions.length; i++) {
        answers[i] = 0;
      }
      score = 0;
      displayQuestion();
    }).fail(function(e) {
      console.log(e);
    });
  }
});
