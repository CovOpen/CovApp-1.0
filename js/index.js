function setLanguage(lang) {
  sessionStorage.setItem('language', lang);
  window.location.href = './questions.html';
}

$(function() {
  $(document).ready(init);

  function init() {
    // leap_init(leap_action, 9)
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
    var max_buttons = 7;
    var selected_button = height + 1;
    if (selected_button > max_buttons) selected_button = max_buttons;
    if (hand_detected) {
      $('.btn')
        .removeClass('btn-primary')
        .addClass('btn-secondary');
      $('#button' + selected_button)
        .removeClass('btn-secondary')
        .addClass('btn-primary');
      if (selected) {
        $('.btn')
          .removeClass('font-weight-bold')
          .addClass('font-weight-normal');
        $('#button' + selected_button)
          .removeClass('font-weight-normal')
          .addClass('font-weight-bold');
        if (selected_final) {
          switch (selected_button) {
            case 1:
              setLanguage(1);
              break;
            case 2:
              setLanguage(0);
              break;
            case 3:
              setLanguage(2);
              break;
            case 4:
              setLanguage(6);
              break;
            case 5:
              setLanguage(5);
              break;
            case 6:
              setLanguage(3);
              break;
            case 7:
              setLanguage(9);
              break;
          }
        }
      }
    }
  }
});
