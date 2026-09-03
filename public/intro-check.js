try {
  if (sessionStorage.getItem('hasSeenIntro')) {
    document.documentElement.dataset.hasSeenIntro = '1';
  }
} catch (e) {}
