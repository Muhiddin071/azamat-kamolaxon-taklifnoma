// ==========================================
// WEDDING INVITATION CONFIGURATION
// To'y taklifnomasi sozlamalari
// ==========================================

const WEDDING_CONFIG = {
  // Kelin va kuyov ismlari (Bride & Groom Names)
  names: {
    uz: "Azamat & Kamolaxon",
    uz_cy: "Азамат ва Камолахон",
    ru: "Азамат & Камолахон",
    en: "Azamat & Kamolaxon"
  },
  
  // To'y sanasi (Wedding Date)
  // Eslatma: Oylar 0 dan boshlanadi (Yanvar: 0, Fevral: 1, ..., Iyul: 6, Dekabr: 11)
  date: {
    year: 2026,
    month: 7, // Avgust (August)
    day: 2,
    hour: 18,
    minute: 0,
    
    // Matnli ko'rinishi (Text presentation)
    text: {
      uz: "02.08.2026",
      uz_cy: "02.08.2026",
      ru: "02.08.2026",
      en: "02.08.2026"
    },
    
    // Kalendar sarlavhasi (Calendar title)
    calendarTitle: {
      uz: "AVGUST 2026",
      uz_cy: "АВГУСТ 2026",
      ru: "АВГУСТ 2026",
      en: "AUGUST 2026"
    }
  },

  // O'tkazilish joyi (Venue Location)
  venue: {
    name: {
      uz: "“Asr” to‘yxonasi",
      uz_cy: "“Аср” тўйхонаси",
      ru: "Свадебный зал «Аср»",
      en: "Asr Wedding Hall"
    },
    address: {
      uz: "Toshkent shahri, Olmazor tumani (Mo‘ljal: Akfa Medline)",
      uz_cy: "Тошкент шаҳри, Олмазор тумани (Мўлжал: Акфа Медлайн)",
      ru: "город Ташкент, Алмазарский район (ориентир: Akfa Medline)",
      en: "Tashkent city, Olmazor district (landmark: Akfa Medline)"
    },
    // Google Maps Iframe src (Map Embed link)
    googleMapsEmbedSrc: "https://maps.google.com/maps?q=41.341667,69.209167&t=&z=15&ie=UTF8&iwloc=&output=embed",
    
    // Marshrut tugmalari havolalari (Route links)
    googleMapsRouteUrl: "https://www.google.com/maps/search/?api=1&query=41.341667,69.209167",
    yandexMapsRouteUrl: "https://yandex.uz/maps/-/CTRfI40S"
  },

  // RSVP sozlamalari (RSVP settings)
  rsvp: {
    adminPassword: "0505" // Mehmonlar ro'yxatini ko'rish paroli (Access code for the guests table)
  }
};

// Node.js support (for API files)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WEDDING_CONFIG;
}
