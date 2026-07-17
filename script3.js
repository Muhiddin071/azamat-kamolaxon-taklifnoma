// ==================== LOCK SCREEN SLIDER LOGIC ====================
const lockScreen = document.getElementById('lockScreen');
const mainContent = document.getElementById('mainContent');
const sliderThumb = document.getElementById('sliderThumb');
const sliderTrack = document.getElementById('sliderTrack');

let isDragging = false;
let thumbCurrentLeft = 4;
let isUnlocked = false;

// Получить максимальную позицию slider
function getMaxLeft() {
  if (!sliderTrack || !sliderThumb) return 0;

  const trackRect = sliderTrack.getBoundingClientRect();
  const thumbRect = sliderThumb.getBoundingClientRect();

  return trackRect.width - thumbRect.width - 4;
}

// Обновление позиции slider
function updateThumbPosition(clientX) {
  if (!sliderTrack || !sliderThumb || isUnlocked) return;

  const trackRect = sliderTrack.getBoundingClientRect();
  const thumbRect = sliderThumb.getBoundingClientRect();
  const maxLeft = getMaxLeft();

  let newLeft = clientX - trackRect.left - (thumbRect.width / 2);
  newLeft = Math.max(4, Math.min(newLeft, maxLeft));

  sliderThumb.style.left = newLeft + 'px';
  thumbCurrentLeft = newLeft;
}

// Разблокировка
function unlockScreen() {
  if (isUnlocked) return;
  isUnlocked = true;

  // vibration только после user gesture
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }

  sliderThumb.classList.add('shake');
  setTimeout(() => sliderThumb.classList.remove('shake'), 300);

  lockScreen.style.opacity = '0';

  setTimeout(() => {
    lockScreen.style.visibility = 'hidden';
    mainContent.classList.add('visible');

    const music = document.getElementById('bgMusic');
    if (music && music.paused) {
      music.play().catch(() => { });
    }

    const btn = document.getElementById('musicToggle');
    if (btn) btn.textContent = '▷';
  }, 1000);
}

// Pointer move
function onPointerMove(e) {
  if (!isDragging || isUnlocked) return;

  e.preventDefault();
  const clientX = e.clientX ?? e.touches?.[0]?.clientX;

  if (clientX) {
    updateThumbPosition(clientX);
  }
}

// Pointer up
function onPointerUp() {
  if (!isDragging) return;

  isDragging = false;

  const maxLeft = getMaxLeft();

  // если дотянул до конца
  if (thumbCurrentLeft >= maxLeft - 3) {
    unlockScreen();
  } else {
    // вернуть назад
    sliderThumb.style.transition = 'left 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    sliderThumb.style.left = '4px';
    thumbCurrentLeft = 4;

    setTimeout(() => {
      sliderThumb.style.transition = '';
    }, 300);
  }

  document.removeEventListener('pointermove', onPointerMove);
  document.removeEventListener('pointerup', onPointerUp);
  document.removeEventListener('touchmove', onPointerMove);
  document.removeEventListener('touchend', onPointerUp);
}

// Pointer down
function onPointerDown(e) {
  if (isUnlocked) return;

  e.preventDefault();
  isDragging = true;

  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
  document.addEventListener('touchmove', onPointerMove, { passive: false });
  document.addEventListener('touchend', onPointerUp);
}

// Events
sliderThumb.addEventListener('pointerdown', onPointerDown);
sliderThumb.addEventListener('touchstart', onPointerDown, { passive: false });
sliderThumb.addEventListener('dragstart', (e) => e.preventDefault());
// ==================== LUXURY TIMER & CALENDAR ====================
const targetDate = new Date(WEDDING_CONFIG.date.year, WEDDING_CONFIG.date.month, WEDDING_CONFIG.date.day, WEDDING_CONFIG.date.hour, WEDDING_CONFIG.date.minute, 0);

function updateFlipClock() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById('daysFlip').textContent = '0';
    document.getElementById('hoursFlip').textContent = '0';
    document.getElementById('minutesFlip').textContent = '0';
    document.getElementById('secondsFlip').textContent = '0';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60) % 24);
  const minutes = Math.floor(diff / (1000 * 60) % 60);
  const seconds = Math.floor(diff / 1000 % 60);

  const daysEl = document.getElementById('daysFlip');
  const hoursEl = document.getElementById('hoursFlip');
  const minutesEl = document.getElementById('minutesFlip');
  const secondsEl = document.getElementById('secondsFlip');

  if (daysEl.textContent != days) {
    daysEl.style.transform = 'scale(1.05)';
    setTimeout(() => daysEl.style.transform = '', 200);
    daysEl.textContent = days;
  }
  if (hoursEl.textContent != hours) {
    hoursEl.style.transform = 'scale(1.05)';
    setTimeout(() => hoursEl.style.transform = '', 200);
    hoursEl.textContent = hours;
  }
  if (minutesEl.textContent != minutes) {
    minutesEl.style.transform = 'scale(1.05)';
    setTimeout(() => minutesEl.style.transform = '', 200);
    minutesEl.textContent = minutes;
  }
  if (secondsEl.textContent != seconds) {
    secondsEl.style.transform = 'scale(1.05)';
    setTimeout(() => secondsEl.style.transform = '', 200);
    secondsEl.textContent = seconds;
  }
}

function generateCalendar() {
  const year = 2026;
  const month = 8;
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = [];
  let startOffset = startDay === 0 ? 6 : startDay - 1;

  for (let i = 0; i < startOffset; i++) {
    daysArray.push('');
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const calendarContainer = document.getElementById('calendarDays');
  calendarContainer.innerHTML = '';
  daysArray.forEach(day => {
    const span = document.createElement('span');
    if (day === WEDDING_CONFIG.date.day) {
      span.textContent = day;
      span.classList.add('active');
    } else if (day !== '') {
      span.textContent = day;
    } else {
      span.textContent = '';
    }
    calendarContainer.appendChild(span);
  });
}

setInterval(updateFlipClock, 1000);
updateFlipClock();
generateCalendar();

// ==================== ВАШ ОРИГИНАЛЬНЫЙ КОД ====================
const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicToggle");
let isPlaying = false;

function tryAutoPlay() {
  if (!isPlaying && mainContent.classList.contains('visible')) {
    music.play().catch(() => { });
    isPlaying = true;
    btn.textContent = "▷";
  }
}

btn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (music.paused) {
    music.play();
    btn.textContent = "▷";
  } else {
    music.pause();
    btn.textContent = "❚❚";
  }
});


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


const translations = {
  ru: {
      lockinvited1: "ВЫ ПОЛУЧИЛИ ПРИГЛАШЕНИЕ",
      names: "Фахриддин & Дилрабо", 
      quote: "«И Он соединил их сердца»", 
      source: "Аль-Анфаль, 63",
      slider1: "РАЗБЛОКИРОВАТЬ",
      invitetop1: "ДОРОГИЕ НАШИ!",
      invitetop2: "Мы",
      invitetop3: "счастливы пригласить",
      invitetop4: "вас на нашу свадьбу",
      dateheader1: "ДАТА",
      dateheader2: "ДО СВАДЬБЫ ОСТАЛОСЬ",
      dateheader3: "дни",
      dateheader4: "часы",
      dateheader5: "минуты",
      dateheader6: "секунды",
      dateheader7: "ИЮЛЬ 2026",
      dateheader8: "ПН",
      dateheader9: "ВТ",
      dateheader10: "СР",
      dateheader11: "ЧТ",
      dateheader12: "ПТ",
      dateheader13: "СБ",
      dateheader14: "ВС",
      dateheader15: "НАЧАЛО В 18:00",
      timeline1: "ТАЙМИНГ",
      timeline2: "СБОР ГОСТЕЙ",
      timeline3: "ЦЕРЕМОНИЯ",
      timeline4: "БАНКЕТ",
      timeline5: "ЗАВЕРШЕНИЕ",
      venueheader1: "МЕСТО ПРОВЕДЕНИЯ",
      venueheader2: "Зал торжеств «Сардорбек»",
      venueheader3: "Сарыасийский район, город Шаргунь",
      venueheader4: "Открыть на карте",
      venueheader5: "Будем рады видеть вас!",
      route1: "Маршрут Google",
      route2: "Маршрут Yandex",
      route3: "♡ Добро пожаловать ♡",
      rsvp1: "Подтвердите свое присутствие",
      rsvp2: "Будьте с нами",
      rsvp3: "Имя гостя",
      rsvp4: "Количество гостей",
      rsvp5: "от 1 до 5 гостей",
      rsvp6: "Вы придете на свадьбу?",
      rsvp7: "✓ Да, с удовольствием",
      rsvp8: "✗ К сожалению, не смогу прийти",
      rsvp9: "Комментарий (необязательно)",
      rsvp10: "Отправить",
      rsvp11: "*Обязательные поля",
      invitetop5: "С УВАЖЕНИЕМ,",
      invitetop6: "Семья Мирахмедовых",
      invitetop7: "Ждем вас!"
  },
  en: {
      lockinvited1: "YOU HAVE RECEIVED AN INVITATION",
      names: "Faxriddin & Dilrabo", 
      quote: "“And He united their hearts”", 
      source: "Al-Anfal, 63",
      slider1: "UNLOCK",
      invitetop1: "Dear our loved ones!",
      invitetop2: "We",
      invitetop3: "are delighted to invite",
      invitetop4: "you to our wedding",
      dateheader1: "DATE",
      dateheader2: "TIME REMAINING UNTIL THE WEDDING",
      dateheader3: "days",
      dateheader4: "hours",
      dateheader5: "minutes",
      dateheader6: "seconds",
      dateheader7: "JULY 2026",
      dateheader8: "Mon",
      dateheader9: "Tue",
      dateheader10: "Wed",
      dateheader11: "Thu",
      dateheader12: "Fri",
      dateheader13: "Sat",
      dateheader14: "Sun",
      dateheader15: "START AT 18:00",
      timeline1: "SCHEDULE",
      timeline2: "GUEST ARRIVAL",
      timeline3: "CEREMONY",
      timeline4: "BANQUET",
      timeline5: "END OF THE EVENING",
      venueheader1: "VENUE",
      venueheader2: "Wedding Hall «Sardorbek»",
      venueheader3: "Sariosiyo District, Shargun City",
      venueheader4: "Open on the map",
      venueheader5: "We will be happy to see you!",
      route1: "Google Route",
      route2: "Yandex Route",
      route3: "♡ Welcome ♡",
      rsvp1: "Please confirm your attendance",
      rsvp2: "Be with us",
      rsvp3: "Guest name",
      rsvp4: "Number of guests",
      rsvp5: "from 1 to 5 guests",
      rsvp6: "Will you attend the wedding?",
      rsvp7: "Yes, with pleasure",
      rsvp8: "Unfortunately, I will not be able to attend",
      rsvp9: "Comment (optional)",
      rsvp10: "Send",
      rsvp11: "*Required fields",
      invitetop5: "WITH RESPECT,",
      invitetop6: "The Mirakhmedov Family",
      invitetop7: "We are waiting for you!"
  },
  uz: {
      lockinvited1: "SIZGA TAKLIFNOMA KELDI",
      names: "Faxriddin & Dilrabo", 
      quote: "“Va U ularning qalblarini birlashtirdi”", 
      source: "Al-Anfol, 63",
      slider1: "OCHISH",
      invitetop1: "Qadrli azizlarimiz!",
      invitetop2: "Biz",
      invitetop3: "sizlarni to‘yimizga taklif",
      invitetop4: "etishdan juda xursandmiz",
      dateheader1: "SANA",
      dateheader2: "TO‘YGACHA QOLGAN VAQT",
      dateheader3: "kun",
      dateheader4: "soat",
      dateheader5: "daqiqa",
      dateheader6: "soniya",
      dateheader7: "IYUL 2026",
      dateheader8: "Du",
      dateheader9: "Se",
      dateheader10: "Ch",
      dateheader11: "Pa",
      dateheader12: "Ju",
      dateheader13: "Sh",
      dateheader14: "Ya",
      dateheader15: "BOSHLANISHI 18:00 DA",
      timeline1: "DASTUR",
      timeline2: "MEHMONLAR YIG‘ILISHI",
      timeline3: "MAROSIM",
      timeline4: "BAYRAM DASTURXONI",
      timeline5: "YAKUNI",
      venueheader1: "O‘TKAZILISH JOYI",
      venueheader2: "“Sardorbek” to'yxonasi",
      venueheader3: "Sariosiyo tumani, Sharg'un shahri",
      venueheader4: "Xaritada ochish",
      venueheader5: "Sizni ko‘rishdan xursand bo‘lamiz!",
      route1: "Google xaritasi",
      route2: "Yandex xaritasi",
      route3: "♡ Xush kelibsiz ♡",
      rsvp1: "Ishtirokingizni tasdiqlang",
      rsvp2: "Biz bilan birga bo‘ling",
      rsvp3: "Mehmon ismi",
      rsvp4: "Mehmonlar soni",
      rsvp5: "1 dan 5 tagacha mehmon",
      rsvp6: "To‘yga kelasizmi?",
      rsvp7: "✓ Ha, mamnuniyat bilan",
      rsvp8: "✗ Afsuski, kela olmayman",
      rsvp9: "Izoh (ixtiyoriy)",
      rsvp10: "Yuborish",
      rsvp11: "*Majburiy maydonlar",
      invitetop5: "HURMAT BILAN,",
      invitetop6: "Miraxmedovlar oilasi",
      invitetop7: "Sizni kutib qolamiz!"
  },
  uz_cy: { 
      lockinvited1: "СИЗГА ТАКЛИФНОМА КЕЛДИ",
      names: "Фахриддин ва Дилрабо", 
      quote: "“Ва У уларнинг қалбларини бирлаштирди”", 
      source: "Ал-Анфал, 63",
      slider1: "ОЧИШ",
      invitetop1: "Қадрли азизларимиз!",
      invitetop2: "Биз",
      invitetop3: "сизларни тўйимизга таклиф",
      invitetop4: "этишдан жуда хурсандмиз",
      dateheader1: "САНА",
      dateheader2: "ТЎЙГАЧА ҚОЛГАН ВАҚТ",
      dateheader3: "кун",
      dateheader4: "соат",
      dateheader5: "дақиқа",
      dateheader6: "сония",
      dateheader7: "ИЮЛЬ 2026",
      dateheader8: "Ду",
      dateheader9: "Се",
      dateheader10: "Чо",
      dateheader11: "Па",
      dateheader12: "Жу",
      dateheader13: "Ша",
      dateheader14: "Як",
      dateheader15: "БОШЛАНИШИ 18:00 ДА",
      timeline1: "ДАСТУР",
      timeline2: "МЕҲМОНЛАР ЙИҒИЛИШИ",
      timeline3: "МАРОСИМ",
      timeline4: "БАЙРАМ ДАСТУРХОНИ",
      timeline5: "ЯКУНИ",
      venueheader1: "ЎТКАЗИЛИШ ЖОЙИ",
      venueheader2: "“Сардорбек” тўйхонаси",
      venueheader3: "Сариосиё тумани, Шарғун шаҳри",
      venueheader4: "Харитада очиш",
      venueheader5: "Сизни кўришдан хурсанд бўламиз!",
      route1: "Google харитаси",
      route2: "Yandex харитаси",
      route3: "♡ Хуш келибсиз ♡",
      rsvp1: "Иштирокингизни тасдиқланг",
      rsvp2: "Биз билан бирга бўлинг",
      rsvp3: "Меҳмон исми",
      rsvp4: "Меҳмонлар сони",
      rsvp5: "1 дан 5 тагача меҳмон",
      rsvp6: "Тўйга келасизми?",
      rsvp7: "✓ Ҳа, мамнуният билан",
      rsvp8: "✗ Афсуски, кела олмайман",
      rsvp9: "Изоҳ (ихтиёрий)",
      rsvp10: "Юбориш",
      rsvp11: "*Мажбурий майдонлар",
      invitetop5: "ҲУРМАТ БИЛАН,",
      invitetop6: "Мирахмедовлар оиласи",
      invitetop7: "Сизни кутиб қоламиз!"
  }
};

function detectLang() {
  const saved = localStorage.getItem("lang");
  if (saved) return saved;
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.includes("ru")) return "ru";
  if (browserLang.includes("uz")) return "uz";
  if (browserLang.includes("en")) return "en";
  return "uz";
}

function setLang(lang) {
  localStorage.setItem("lang", lang);
  document.querySelectorAll("[data-lang]").forEach(el => {
    const key = el.getAttribute("data-lang");
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });
  document.querySelectorAll("#langSwitcher button").forEach(btn => btn.style.opacity = "0.5");
  const activeBtn = document.querySelector(`#langSwitcher button[onclick="setLang('${lang}')"]`);
  if (activeBtn) activeBtn.style.opacity = "1";
}

window.addEventListener("DOMContentLoaded", () => {
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
      el.textContent = `${String(WEDDING_CONFIG.date.day).padStart(2, '0')} • ${String(WEDDING_CONFIG.date.month + 1).padStart(2, '0')} • ${WEDDING_CONFIG.date.year}`;
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

  const lang = detectLang();
  setLang(lang);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
      entry.target.querySelector('.invite-bg').style.transform = "scale(1)";
    }
  });
}, { threshold: 0.4 });

setTimeout(() => {
  const section = document.getElementById('inviteSection');
  if (section) observer.observe(section);
  const section2 = document.getElementById('inviteSection2');
  if (section2) observer.observe(section2);
}, 500);

const mainContentObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'class' && mainContent.classList.contains('visible')) {
      const section = document.getElementById('inviteSection');
      if (section) observer.observe(section);
    }
  });
});
mainContentObserver.observe(mainContent, { attributes: true });

// Параллакс эффект для фона (движение при движении мыши)
(function initParallax() {
  const section = document.querySelector('.venue-section');
  if (!section) return;

  section.classList.add('parallax-active');

  const handleMouseMove = (e) => {
    const rect = section.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const moveX = x * 15;
    const moveY = y * 15;

    const pseudo = window.getComputedStyle(section, '::before');
    section.style.setProperty('--parallax-x', `${moveX}px`);
    section.style.setProperty('--parallax-y', `${moveY}px`);
  };

  section.addEventListener('mousemove', handleMouseMove);
  section.addEventListener('touchmove', (e) => {
    if (e.touches.length) {
      const rect = section.getBoundingClientRect();
      const x = (e.touches[0].clientX - rect.left) / rect.width - 0.5;
      const y = (e.touches[0].clientY - rect.top) / rect.height - 0.5;
      const moveX = x * 10;
      const moveY = y * 10;
      section.style.setProperty('--parallax-x', `${moveX}px`);
      section.style.setProperty('--parallax-y', `${moveY}px`);
    }
  });
})();

// Добавляем стиль для параллакса динамически
const style = document.createElement('style');
style.textContent = `
  .venue-section::before {
    transform: translate(var(--parallax-x, 0px), var(--parallax-y, 0px));
  }
`;
document.head.appendChild(style);

// Добавляем небольшую интерсекцию для плавного появления элементов при скролле (плюс динамика)
// ==================== ANIMATION OBSERVER ====================

const animatedElements = document.querySelectorAll('.animate-up');

const observer1 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.2 });

// изначально ставим паузу и подключаем observer
animatedElements.forEach(el => {
  el.style.animationPlayState = 'paused';
  observer1.observe(el);
});


// ==================== PARALLAX EFFECT ====================

const section = document.querySelector('.location-winner-section');

if (section) {
  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const moveX = (x - 0.5) * 8;
    const moveY = (y - 0.5) * 8;

    section.style.setProperty('--mouse-x', moveX + 'px');
    section.style.setProperty('--mouse-y', moveY + 'px');
  });
}


// ==================== DYNAMIC STYLE FOR PARALLAX ====================

const styleDynamic = document.createElement('style');

styleDynamic.textContent = `
  .location-winner-section::after {
    transform: translate(var(--mouse-x, 0px), var(--mouse-y, 0px));
    transition: transform 0.1s ease-out;
  }
`;

document.head.appendChild(styleDynamic);


// ==================== FLOWER PETALS GENERATOR ====================

function initPetals() {
  const container = document.getElementById('petalsContainer');
  if (!container) return;

  const maxPetals = 45; // Maximum active petals on screen
  let activePetals = 0;

  // Scroll tracking variables
  let lastScrollY = window.scrollY;
  let scrollSpeed = 0;
  let targetScrollSpeed = 0;

  // Listen to scroll events to apply wind effect and depth parallax
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    // Set scroll wind target speed (cap it to prevent extreme values)
    targetScrollSpeed = Math.max(-30, Math.min(30, delta * 0.15));

    // Update vertical scroll offset variable for 3D parallax
    container.style.setProperty('--scroll-y-offset', `${currentScrollY * -0.15}px`);
  });

  // Animation frame loop to smoothly interpolate and decay scroll wind/tilt
  function updateScrollEffects() {
    scrollSpeed += (targetScrollSpeed - scrollSpeed) * 0.1;
    targetScrollSpeed *= 0.9; // decay target speed

    container.style.setProperty('--scroll-wind', `${scrollSpeed * 0.8}px`);
    container.style.setProperty('--scroll-tilt', `${scrollSpeed * 0.15}deg`);

    requestAnimationFrame(updateScrollEffects);
  }
  requestAnimationFrame(updateScrollEffects);

  function createPetal() {
    if (activePetals >= maxPetals) return;

    // Create wrapper (which will follow the falling trajectory path)
    const wrapper = document.createElement('div');
    wrapper.className = 'petal-wrapper';

    // Create inner petal (which will react to scroll movements)
    const petal = document.createElement('div');
    petal.className = 'petal';

    // Randomize petal type (pink, lavender, gold, white-pink)
    const type = Math.floor(Math.random() * 4) + 1;
    petal.classList.add(`type-${type}`);

    // Randomize size
    const size = Math.floor(Math.random() * 16) + 12; // 12px to 28px
    wrapper.style.width = `${size}px`;
    wrapper.style.height = `${size * 1.25}px`;

    // Randomize depth factor for parallax depth (0.4 to 1.6)
    const depthFactor = (Math.random() * 1.2 + 0.4).toFixed(2);
    petal.style.setProperty('--depth-factor', depthFactor);

    // Decide starting side (Left or Right)
    const startFromLeft = Math.random() > 0.5;

    // Randomize starting positions along the screen edges
    const duration = Math.random() * 5 + 8; // 8s to 13s
    const delay = Math.random() * 3;

    if (startFromLeft) {
      wrapper.style.left = `${Math.random() * 20 - 5}%`;
      wrapper.style.top = `${Math.random() * 45 - 10}%`;
      wrapper.style.animation = `drift-left-to-right ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s infinite`;
    } else {
      wrapper.style.left = `${Math.random() * 20 + 85}%`;
      wrapper.style.top = `${Math.random() * 45 - 10}%`;
      wrapper.style.animation = `drift-right-to-left ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s infinite`;
    }

    wrapper.appendChild(petal);
    container.appendChild(wrapper);
    activePetals++;

    const totalTimeMs = (duration + delay) * 1000;
    
    setTimeout(() => {
      wrapper.remove();
      activePetals--;
    }, totalTimeMs);
  }

  // Initial batch of petals with random staggered delays
  for (let i = 0; i < 18; i++) {
    setTimeout(createPetal, Math.random() * 6000);
  }

  // Periodically spawn new petals
  setInterval(createPetal, 350);
}

// Start generating petals after DOM content is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPetals);
} else {
  initPetals();
}
