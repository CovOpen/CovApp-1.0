$(function() {
  var lastMessageDisplayed = false;
  var questions;
  var questions_text;
  var current_question;
  var answers = [];
  var current_numoptions = null;
  var score;

  const NUMOPTIONS = 10;

  const TYPE_MULTIPLECHOICE = 1;
  const TYPE_FREETEXT = 2;
  const TYPE_DISCLAIMER = 0;

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
    var printable_answers = generatePrintableAnswers()
    var answers_table = generateAnswerTableHTML(printable_answers)
    localStorage.setItem('answers_table', answers_table)
    localStorage.setItem('qrxml_str', qrxml_str);
    sessionStorage.setItem('score', score);
    window.location.href = './qrPatient.html';
  }

  function generatePrintableAnswers() {

    question_anwers = []
    for (i = 0; i < answers.length; i ++) {
      answer = answers[i];
      if (answer > 0) {
        question_answer = {
          question: questions_text[i].text,
          answer: questions_text[i]["option"+answer]
        }
        question_anwers.push(question_answer)
      }
    }

    return question_anwers
  }

  function generateAnswerTableHTML(printable_answers) {

    html = ""
    for (i = 0; i < printable_answers.length; i++) {
      html += "<strong>" + printable_answers[i].question + "</strong> " + printable_answers[i].answer + "<br></br>"
    }

    return html
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
      case TYPE_DISCLAIMER:
        return 0;
    }
    return -1;
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

  function displayAnswerOptions(question, question_text) {
    $('.form-horizontal').show();
    switch (question['type']) {
      case TYPE_MULTIPLECHOICE:
        hideInputText();
        showRadiobuttons();
        current_numoptions = 0;
        for (i = 1; i <= NUMOPTIONS; i++) {
          setRadioButton('#option' + i, question_text['option' + i]);
        }
        break;
      case TYPE_FREETEXT:
        hideRadiobuttons();
        showInputText();
        $('#labelText').text(question_text['option1']);
        break;
      case TYPE_DISCLAIMER:
        hideRadiobuttons();
        $('.form-horizontal').hide();
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
    var question_text = questions_text[current_question];
    $('#labelQuestionText').html(question_text['text']);
    displayAnswerOptions(question, question_text);
  }

  function getQuestions() {
    var language = sessionStorage.getItem('language');
    $.getJSON(`./questions/logic.json`, function(logicResponse) {
      questions = logicResponse;

      $.getJSON(`./questions/${language}.json`, function(textResponse) {
        questions_text = textResponse;
        current_question = 0;
        for (i = 0; i < questions.length; i++) {
          answers[i] = 0;
        }
        score = 0;
        displayQuestion();
      }).fail(function(e) {
        console.log(e);
      });
    }).fail(function(e) {
      console.log(e);
    });
  }
});
