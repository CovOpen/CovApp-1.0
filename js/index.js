function setLanguage(lang) {
  sessionStorage.setItem("language", lang);
  window.location.href = `./intro/${lang}.html`;
}

$(document).ready(() => {
  if (localStorage.getItem("qrxml_str")) {
    $("#qrCodeFound").show();
  }
});
