function setLanguage(lang) {
  sessionStorage.setItem('language', lang);
  window.location.href = './questions.html';
}
