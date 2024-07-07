// Завантаження мовних файлів
Promise.all([
  fetch('./pages/en.json')
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    }),
  fetch('./pages/uk.json')
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
]).then(([enTranslations, ukTranslations]) => {
  // Отримання збереженої мови з localStorage або встановлення за замовчуванням
  const savedLanguage = localStorage.getItem('language') || 'en';

  // Ініціалізація i18next з мовними ресурсами
  i18next.init({
      lng: savedLanguage, // Мова за замовчуванням
      debug: true,
      resources: {
          en: {
              translation: enTranslations
          },
          uk: {
              translation: ukTranslations
          }
      }
  }, function(err, t) {
      // Ініціалізація завершена, оновлюємо текстові елементи
      updateContent();
  });
}).catch(error => {
  console.error('Error loading language files:', error);
});
