const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'script3.js');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace targetDate
content = content.replace(
  'const targetDate = new Date(2026, 8, 9, 18, 0, 0);',
  'const targetDate = new Date(WEDDING_CONFIG.date.year, WEDDING_CONFIG.date.month, WEDDING_CONFIG.date.day, WEDDING_CONFIG.date.hour, WEDDING_CONFIG.date.minute, 0);'
);

// 2. Replace generateCalendar year and month and day highlight
content = content.replace(
  'const year = 2026;\n  const month = 8;',
  'const year = WEDDING_CONFIG.date.year;\n  const month = WEDDING_CONFIG.date.month;'
);
content = content.replace(
  'if (day === 9) {',
  'if (day === WEDDING_CONFIG.date.day) {'
);

// 3. Replace RSVP password
content = content.replace(
  'const PASSWORD = "0505"; // ← задай свой пароль',
  'const PASSWORD = WEDDING_CONFIG.rsvp.adminPassword; // ← задай свой пароль'
);

// 4. Inject dynamic translations & page load customization
const injectionCode = `
// ==================== DYNAMIC CONFIG INJECTION ====================
function applyDynamicConfig() {
  if (typeof WEDDING_CONFIG === 'undefined') return;
  
  // Apply names
  translations.uz.names = WEDDING_CONFIG.names.uz;
  translations.uz_cy.names = WEDDING_CONFIG.names.uz_cy;
  translations.ru.names = WEDDING_CONFIG.names.ru;
  translations.en.names = WEDDING_CONFIG.names.en;

  // Apply venue names
  translations.uz.venueheader2 = WEDDING_CONFIG.venue.name.uz;
  translations.uz_cy.venueheader2 = WEDDING_CONFIG.venue.name.uz_cy;
  translations.ru.venueheader2 = WEDDING_CONFIG.venue.name.ru;
  translations.en.venueheader2 = WEDDING_CONFIG.venue.name.en;

  // Apply venue addresses
  translations.uz.venueheader3 = WEDDING_CONFIG.venue.address.uz;
  translations.uz_cy.venueheader3 = WEDDING_CONFIG.venue.address.uz_cy;
  translations.ru.venueheader3 = WEDDING_CONFIG.venue.address.ru;
  translations.en.venueheader3 = WEDDING_CONFIG.venue.address.en;

  // Apply calendar titles
  translations.uz.dateheader7 = WEDDING_CONFIG.date.calendarTitle.uz;
  translations.uz_cy.dateheader7 = WEDDING_CONFIG.date.calendarTitle.uz_cy;
  translations.ru.dateheader7 = WEDDING_CONFIG.date.calendarTitle.ru;
  translations.en.dateheader7 = WEDDING_CONFIG.date.calendarTitle.en;
}
`;

// Insert the helper function right before setLang function or translations definition
content = content.replace(
  'const translations = {',
  injectionCode + '\nconst translations = {'
);

// Call applyDynamicConfig on DOMContentLoaded
const domContentInject = `
  // Apply dynamic configuration
  applyDynamicConfig();
  
  // Set maps and route links
  if (typeof WEDDING_CONFIG !== 'undefined') {
    const mapIframe = document.querySelector('.map-frame-wrapper iframe');
    if (mapIframe) mapIframe.src = WEDDING_CONFIG.venue.googleMapsEmbedSrc;
    
    const googleRouteBtn = document.querySelector('.google-btn');
    if (googleRouteBtn) googleRouteBtn.href = WEDDING_CONFIG.venue.googleMapsRouteUrl;
    
    const yandexRouteBtn = document.querySelector('.yandex-btn');
    if (yandexRouteBtn) yandexRouteBtn.href = WEDDING_CONFIG.venue.yandexMapsRouteUrl;
    
    // Dynamic static dates
    document.querySelectorAll('.lock-date').forEach(el => {
      el.textContent = \`\${String(WEDDING_CONFIG.date.day).padStart(2, '0')} • \${String(WEDDING_CONFIG.date.month + 1).padStart(2, '0')} • \${WEDDING_CONFIG.date.year}\`;
    });
    
    document.querySelectorAll('.invitation .date').forEach(el => {
      el.textContent = WEDDING_CONFIG.date.text[detectLang()] || WEDDING_CONFIG.date.text.uz;
    });
    
    const bigDateSpans = document.querySelectorAll('.big-date span');
    if (bigDateSpans.length === 3) {
      bigDateSpans[0].textContent = String(WEDDING_CONFIG.date.day).padStart(2, '0');
      bigDateSpans[1].textContent = String(WEDDING_CONFIG.date.month + 1).padStart(2, '0');
      bigDateSpans[2].textContent = WEDDING_CONFIG.date.year;
    }
  }
`;

content = content.replace(
  'window.addEventListener("DOMContentLoaded", () => {\n  const lang = detectLang();',
  'window.addEventListener("DOMContentLoaded", () => {\n' + domContentInject + '\n  const lang = detectLang();'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched script3.js!');
