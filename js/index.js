function setLanguage(lang) {
  sessionStorage.setItem('language', lang);
  window.location.href = `./intro/${lang}.html`;
}

$(document).ready(function() {
  if (localStorage.getItem('qrxml_str')) {
    $('#qrCodeFound').show();
  }
});
