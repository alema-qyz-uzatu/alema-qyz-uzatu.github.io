/* =====================================================================
   ⚙️  БАПТАУ — БАРЛЫҚ ДЕРЕКТЕРДІ ОСЫ ЖЕРДЕ ҒАНА ӨЗГЕРТ
   ===================================================================== */
const CONFIG = {
  // --- Intro (конверт-экран) ---
  introInitial: "A",
  introName:    "Alema",
  introHint:    "Шақыруды ашу үшін басыңыз",

  // --- Hero (басты экран) ---
  heroName:   "Alema",
  eventType:  "QYZ UZATU",
  heroDate:   "15.08.2026",

  // --- Той күні мен уақыты (кері санақ + күнтізбе осыдан есептеледі) ---
  // Формат: "ЖЫЛ-АЙ-КҮН СА:МИ:СЕ"  (24 сағаттық)
  eventDateTime: "2026-08-15 18:00:00",

  // --- Шақыру мәтіні ---
  inviteTitle: "Қыз ұзату тойына шақыру",
  greeting:    "Құрметті қонақтар",
  inviteText:  "Сіздерді аяулы қызымыз Алеманың ұзату тойына арналған ақ дастарханымыздың қадірлі қонағы болуға шақырамыз.",

  // --- Той салтанаты (күн/уақыт) ---
  whenLabel: "Той салтанаты",
  whenDate:  "15 тамыз 2026 жыл",
  whenTime:  "🕐 18:00",
  addCalText: "Күнтізбеге қосу",
  // Күнтізбедегі оқиға атауы мен ұзақтығы (сағатпен):
  calTitle:    "Alema — Қыз ұзату тойы",
  calLocation: "Otyrar мейрамханасы, Семей қ., Сорокина 42",
  calHours:    5,

  // --- Кері санақ ---
  countdownLabel: "Той салтанатына дейін",
  uDays: "күн", uHours: "сағат", uMin: "минут", uSec: "секунд",

  // --- Мекен жайымыз ---
  placeLabel:   "Мекен жайымыз",
  venueName:    "Otyrar мейрамханасы",
  venueAddress: "Семей қаласы, Сорокина көшесі, 42",
  mapText:      "2GIS-те ашу",
  // 2GIS сілтемесі (Otyrar мейрамханасы, Семей):
  mapUrl:       "https://2gis.kz/semey/geo/70000001053063065/80.240756,50.376876",

  // --- Той иелері ---
  hostsLabel: "Той иелері",
  hostsLine1: "Шарбан апа",
  hostsLine2: "Бағдат & Сауле",
  hostsNote:  "Қызымыздың өмір жолындағы маңызды сәтке арналған салтанатты кешіміздің қонағы болыңыз!",

  // --- Сауалнама (RSVP) ---
  rsvpLabel:  "Сауалнама",
  rsvpDesc:   "Төмендегі сауалнаманы толтырып, тойға қатысуыңызды растауыңызды сұраймыз:",
  coupleHint: "Жұбайыңызбен келсеңіз, есімдеріңізді бірге жаза кетіңіз",
  optYes:     "Иә, келемін",
  optCouple:  "Жұбайыммен келемін",
  optNo:      "Өкінішке орай, келе алмаймын",
  submitText: "Жауапты жіберу",
  // Жауаптар Google-кестеге жазылады.
  // Apps Script "Web app" сілтемесін осы жерге қой (.../exec):
  sheetUrl: "https://script.google.com/macros/s/AKfycbyETXXV444WiixGHJmVi1UU58Vvpu-N0KOPgFulugBbQXFxo1dp9w043H-SMQezSwTQkg/exec",

  // --- Алғыс терезесі (RSVP-дан кейін) ---
  thanksComeTitle: "Рақмет!",
  thanksComeText:  "Сізді тойда көруге қуаныштымыз! 🤍",
  thanksNoTitle:   "Рақмет!",
  thanksNoText:    "Жауабыңыз үшін рақмет. Сізді сағынамыз!",

  // --- Жастарға тілек (картаны басқанда кездейсоқ тілек шығады) ---
  tilekLabel:   "Жастарға тілек",
  tilekStart:   "Тілек ашу үшін басыңыз",
  tilekBtnText: "Тілек ашу",
  tilekList: [
    "Ұзақ ғұмыр, баянды бақыт тілейміз!",
    "Шаңырақтарың берекеге толсын!",
    "Аман-есен, ынтымақты отбасы болсын!",
    "Махаббаттарың мәңгілік болсын!",
    "Бір жастықта кәрі болыңдар!",
    "Үй іштерің ырыс-берекеге кенелсін!",
    "Балалы-шағалы, бақытты болыңдар!",
    "Қос жұлдыздай жарасып, төрт құбылаларың тең болсын!",
  ],
};

/* =====================================================================
   ⛔️ ТӨМЕНДЕГІ КОДТЫ ӨЗГЕРТУДІҢ ҚАЖЕТІ ЖОҚ
   ===================================================================== */

// 1) CONFIG мәтінін бетке орналастыру
document.querySelectorAll("[data-cfg]").forEach((el) => {
  const key = el.getAttribute("data-cfg");
  if (CONFIG[key] != null) el.textContent = CONFIG[key];
});

// 2) Карта сілтемесі
const mapLink = document.getElementById("mapLink");
if (mapLink) mapLink.href = CONFIG.mapUrl;

// 3) Той күні
const eventDate = new Date(CONFIG.eventDateTime.replace(" ", "T"));
const target = eventDate.getTime();

// 4) Кері санақ таймері
const elDays = document.getElementById("cd-days");
const elHours = document.getElementById("cd-hours");
const elMin = document.getElementById("cd-min");
const elSec = document.getElementById("cd-sec");
const pad = (n) => String(n).padStart(2, "0");

function tick() {
  const diff = target - Date.now();
  if (diff <= 0) {
    elDays.textContent = elHours.textContent = elMin.textContent = elSec.textContent = "00";
    return;
  }
  const s = Math.floor(diff / 1000);
  elDays.textContent = pad(Math.floor(s / 86400));
  elHours.textContent = pad(Math.floor((s % 86400) / 3600));
  elMin.textContent = pad(Math.floor((s % 3600) / 60));
  elSec.textContent = pad(s % 60);
}
tick();
setInterval(tick, 1000);

// 5) Күнтізбе (той айын автоматты түрде сызады, той күнін белгілейді)
(function renderCalendar() {
  const wrap = document.getElementById("calendar");
  if (!wrap) return;
  const months = ["қаңтар","ақпан","наурыз","сәуір","мамыр","маусым",
                  "шілде","тамыз","қыркүйек","қазан","қараша","желтоқсан"];
  const dows = ["Дс","Сс","Ср","Бс","Жм","Сб","Жс"]; // дүйсенбіден басталады
  const y = eventDate.getFullYear();
  const m = eventDate.getMonth();
  const eventDay = eventDate.getDate();

  const first = new Date(y, m, 1);
  let startCol = (first.getDay() + 6) % 7; // жексенбі=0 -> дүйсенбі басы
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  let html = `<p class="cal__title">${months[m]} ${y}</p><div class="cal__grid">`;
  dows.forEach((d) => (html += `<span class="cal__dow">${d}</span>`));
  for (let i = 0; i < startCol; i++) html += `<span></span>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const cls = d === eventDay ? "cal__day cal__day--mark" : "cal__day";
    html += `<span class="${cls}">${d}</span>`;
  }
  html += `</div>`;
  wrap.innerHTML = html;
})();

// 6) Сауалнама — конфетти + алғыс + WhatsApp
const confLayer = document.getElementById("confetti");
const confEmojis = ["🍬", "🪙", "🌸", "🤍"];
const confColors = ["#c79b8a", "#a9786c", "#e8a799", "#f4c9be", "#d9b48a", "#fff"];

function burstConfetti(count = 90) {
  for (let i = 0; i < count; i++) {
    const c = document.createElement("div");
    const t = (performance.now() + i) % 100;
    if (i % 6 === 0) {
      c.className = "conf";
      c.textContent = confEmojis[i % confEmojis.length];
    } else {
      c.className = "conf conf--piece";
      c.style.background = confColors[i % confColors.length];
    }
    c.style.left = t + "vw";
    const dur = 2.4 + (t % 25) / 10; // 2.4–4.9s
    c.style.animationDuration = dur + "s";
    c.style.animationDelay = (i % 8) / 20 + "s";
    confLayer.appendChild(c);
    setTimeout(() => c.remove(), (dur + 0.5) * 1000);
  }
}

const thanksEl = document.getElementById("thanks");
const thanksTitle = document.getElementById("thanksTitle");
const thanksText = document.getElementById("thanksText");
function showThanks(title, text) {
  thanksTitle.textContent = title;
  thanksText.textContent = text;
  thanksEl.classList.add("is-show");
}
thanksEl.addEventListener("click", () => thanksEl.classList.remove("is-show"));

document.getElementById("rsvpForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("guestName").value.trim();
  const attend = document.querySelector('input[name="attend"]:checked')?.value || "";
  const coming = !attend.includes("келе алмаймын");

  if (coming) {
    burstConfetti();
    const who = name ? name + ", " : "";
    showThanks(CONFIG.thanksComeTitle, who + CONFIG.thanksComeText);
  } else {
    showThanks(CONFIG.thanksNoTitle, CONFIG.thanksNoText);
  }

  // Жауапты Google-кестеге жіберу
  const body = new URLSearchParams({ name: name, attend: attend });
  fetch(CONFIG.sheetUrl, { method: "POST", mode: "no-cors", body: body }).catch(() => {});

  e.target.reset();
});

// 6.1) Жастарға тілек
const tilekText = document.getElementById("tilekText");
const tilekCard = document.getElementById("tilekCard");
let lastTilek = -1;
function openTilek() {
  let i;
  do { i = Math.floor((performance.now() * 7) % CONFIG.tilekList.length); }
  while (i === lastTilek && CONFIG.tilekList.length > 1);
  lastTilek = i;
  tilekText.textContent = CONFIG.tilekList[i];
  tilekCard.classList.remove("is-flip");
  void tilekCard.offsetWidth; // reflow → анимацияны қайта қосу
  tilekCard.classList.add("is-flip");
}
document.getElementById("tilekBtn").addEventListener("click", openTilek);
tilekCard.addEventListener("click", openTilek);

// 7) Музыка
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");
music.volume = 1.0;

function playMusic() { music.play().then(() => musicBtn.classList.add("is-playing")).catch(() => {}); }

musicBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (music.paused) { music.play(); musicBtn.classList.add("is-playing"); }
  else { music.pause(); musicBtn.classList.remove("is-playing"); }
});

// 8) Гүл жапырақтары (petals)
const petalLayer = document.getElementById("petals");
function spawnPetal() {
  const p = document.createElement("div");
  p.className = "petal";
  const size = 8 + Math.floor((performance.now() % 12)); // 8–20px
  p.style.left = (performance.now() % 100) + "vw";
  p.style.width = p.style.height = size + "px";
  const dur = 6 + (performance.now() % 6); // 6–12s
  p.style.animationDuration = dur + "s";
  p.style.opacity = 0.5 + (performance.now() % 40) / 100;
  petalLayer.appendChild(p);
  setTimeout(() => p.remove(), dur * 1000);
}
let petalTimer = null;
function startPetals() { if (!petalTimer) petalTimer = setInterval(spawnPetal, 650); }

// 9) Конверт-экранды ашу
const intro = document.getElementById("intro");
function openInvitation() {
  if (intro.classList.contains("is-open")) return;
  intro.classList.add("is-open");
  playMusic();      // тап = браузер рұқсаты → музыка толық дауыспен
  startPetals();
  // алғашқы лепестік "жарылыс"
  for (let i = 0; i < 14; i++) setTimeout(spawnPetal, i * 80);
  setTimeout(() => (intro.style.display = "none"), 950);
}
intro.addEventListener("click", openInvitation);

// 10) Күнтізбеге қосу (.ics жүктеу)
document.getElementById("addToCal").addEventListener("click", (e) => {
  e.stopPropagation();
  const start = eventDate;
  const end = new Date(start.getTime() + (CONFIG.calHours || 4) * 3600000);
  const fmt = (d) =>
    d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + "T" +
    pad(d.getHours()) + pad(d.getMinutes()) + "00";
  const ics =
    "BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\n" +
    "SUMMARY:" + CONFIG.calTitle + "\n" +
    "LOCATION:" + CONFIG.calLocation + "\n" +
    "DTSTART:" + fmt(start) + "\nDTEND:" + fmt(end) + "\n" +
    "END:VEVENT\nEND:VCALENDAR";
  const blob = new Blob([ics], { type: "text/calendar" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "toi.ics";
  a.click();
});

// 11) Scroll анимациясы (reveal)
const io = new IntersectionObserver(
  (entries) => entries.forEach((en) => { if (en.isIntersecting) en.target.classList.add("is-visible"); }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
