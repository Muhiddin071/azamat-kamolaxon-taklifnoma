# 💍 To‘y Taklifnomasi (Online Wedding Invitation)

Bu chiroyli va yuqori darajadagi animatsiyalarga ega bo‘lgan taklifnoma loyihasi bo‘lib, u original [Momento](https://momento.uz/wedding/24/ulugbek-malika) taklifnomasi asosida yaratildi va to‘liq dinamik holatga keltirildi.

Loyihada **lock screen** (slider orqali ochish), **countdown timer** (to‘yga qadar qolgan vaqt), **interaktiv taqvim**, **timeline**, **xaritalar integratsiyasi (Google & Yandex)** hamda **RSVP tizimi** mavjud.

---

## 🛠 Sozlash (Konfiguratsiya)

Taklifnomadagi ismlar, sana, manzil va boshqa ma’lumotlarni o‘zgartirish juda oson. Buning uchun loyihaning asosiy papkasidagi `config.js` faylini oching va quyidagi qiymatlarni tahrirlang:

```javascript
const WEDDING_CONFIG = {
  // Kelin va kuyov ismlari
  names: {
    uz: "Faxriddin & Dilrabo",
    uz_cy: "Фахриддин ва Дилрабо",
    ru: "Фахриддин & Дилрабо",
    en: "Faxriddin & Dilrabo"
  },
  
  // To'y sanasi (Eslatma: Oylar 0 dan boshlanadi. Sentyabr: 8, Avgust: 7, va h.k.)
  date: {
    year: 2026,
    month: 6, // Iyul (July)
    day: 27,
    hour: 18,
    minute: 0,
    
    text: {
      uz: "27.07.2026",
      uz_cy: "27.07.2026",
      ru: "27.07.2026",
      en: "27.07.2026"
    },
    
    calendarTitle: {
      uz: "IYUL 2026",
      uz_cy: "ИЮЛЬ 2026",
      ru: "ИЮЛЬ 2026",
      en: "JULY 2026"
    }
  },

  // O'tkazilish joyi va Xaritalar
  venue: {
    name: {
      uz: "“Sardorbek” to'yxonasi",
      uz_cy: "“Сардорбек” тўйхонаси",
      ru: "Зал торжеств «Сардорбек»",
      en: "Wedding Hall «Sardorbek»"
    },
    address: {
      uz: "Sariosiyo tumani, Sharg'un shahri",
      uz_cy: "Сариосиё тумани, Шарғун шаҳри",
      ru: "Сарыасийский район, город Шаргунь",
      en: "Sariosiyo District, Shargun City"
    },
    // Google Maps Iframe src (Xarita kodi)
    googleMapsEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.3804162751935!2d69.443461!3d41.365818999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef7004c189d5b%3A0xb1c7af2a3798d620!2sBAXTIYOR%20RESTAURANT!5e0!3m2!1sru!2s!4v1777811806118!5m2!1sru!2s",
    
    // Marshrut tugmalari havolalari
    googleMapsRouteUrl: "https://maps.app.goo.gl/nWMR3VBKPwMiiHYDA",
    yandexMapsRouteUrl: "https://yandex.uz/maps/-/CPWU7NkW"
  },

  // RSVP sozlamalari
  rsvp: {
    adminPassword: "0505" // Mehmonlar ro'yxatini ko'rish paroli
  }
};
```

---

## 💻 Mahalliy kompyuterda ishga tushirish (Local Testing)

Loyihani kompyuteringizda ishga tushirish uchun quyidagi buyruqni terminalda bajaring:
```bash
node server.js
```
Sayt quyidagi manzilda ochiladi: http://localhost:3000
Mahalliy muhitda mehmonlarning RSVP javoblari avtomatik ravishda `guests.json` fayliga saqlanadi.

---

## 🚀 Vercel-ga yuklash (Deployment)

Loyihani Vercel-ga yuklash va shaxsiy domenga ulash juda oson.

### 1-qadam: Vercel CLI-ni o‘rnatish va deploy qilish
1. Kompyuteringizda terminalni ochib, Vercel-ni o‘rnating:
   ```bash
   npm install -g vercel
   ```
2. Loyihaning asosiy papkasida (`wedding-invitation`) quyidagi buyruqni ishga tushiring va savollarga javob bering:
   ```bash
   vercel
   ```
   *(Har bir savolga default `Enter` bosish orqali tezda deploy qilishingiz mumkin).*
3. Deploy tugagach, sizga vaqtinchalik havola (masalan, `https://wedding-invitation-xyz.vercel.app`) beriladi.
4. Uni production muhitiga yuklash uchun:
   ```bash
   vercel --prod
   ```

### 2-qadam: RSVP ma’lumotlar omborini ulash (Vercel KV)
Vercel serverless platforma bo‘lgani uchun, u yerdagi fayllar vaqtinchalik bo‘ladi. Mehmonlar ro‘yxati o‘chib ketmasligi uchun loyihaga bepul **Vercel KV** (Redis database) ulanadi:
1. [Vercel Dashboard](https://vercel.com/dashboard)-ga kiring va loyihangizni tanlang.
2. **Storage** bo‘limiga o‘ting.
3. **Connect Database** tugmasini bosing va **KV (Redis)**-ni tanlang.
4. **Create New**-ni bosing, ma'lumotlar omboriga nom bering va **Create** tugmasini bosing.
5. Tayyor! Vercel avtomatik ravishda barcha kerakli kalitlarni (`KV_REST_API_URL`, `KV_REST_API_TOKEN`) loyiha sozlamalariga (Environment Variables) qo‘shadi va API tizimi hech qanday o‘zgarishlarsiz ushbu ma'lumotlar omboriga ulanadi.

---

## 👥 Mehmonlar ro‘yxatini ko‘rish (Admin Panel)

1. Saytingizga kiring.
2. Sahifaning eng pastki qismidagi **"SIZNING ISHTIROKINGIZ / ВАШЕ ПРИСУТСТВИЕ"** yozuvi ustiga **3 marta tez-tez bosing**.
3. Parol so‘raladi, `config.js` ichida ko‘rsatilgan parolni kiriting (default: `0505`).
4. Tasdiqlaganingizdan so‘ng mehmonlar ro‘yxati (jadvali) va umumiy statistika ochiladi!
