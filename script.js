// ====== SOZLAMALAR ======
const CONFIG = {
  // To'y vaqti (mahalliy vaqt, UTC+5)
  date: new Date('2026-11-06T18:00:00+05:00')
};

const $ = s => document.querySelector(s);
const pad = n => String(n).padStart(2, '0');

// ====== Ochilish ======
const petals = $('.petals');
for (let i = 0; i < 24; i++) {
  const p = document.createElement('i');
  p.className = 'petal';
  p.style.cssText = `left:${Math.random() * 100}%;--dx:${Math.random() * 120 - 60}px;animation-duration:${6 + Math.random() * 8}s;animation-delay:${-Math.random() * 10}s;opacity:${.4 + Math.random() * .5}`;
  petals.appendChild(p);
}
$('#openBtn').addEventListener('click', () => {
  $('#cover').classList.add('hide');
  document.body.classList.remove('locked');
  window.scrollTo(0, 0);
});

// ====== Paydo bo'lish animatsiyasi ======
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ====== Hisoblagich ======
function tick() {
  let d = Math.max(0, CONFIG.date - Date.now()) / 1000;
  $('#cd-d').textContent = Math.floor(d / 86400);
  $('#cd-h').textContent = pad(Math.floor(d % 86400 / 3600));
  $('#cd-m').textContent = pad(Math.floor(d % 3600 / 60));
  $('#cd-s').textContent = pad(Math.floor(d % 60));
}
tick(); setInterval(tick, 1000);

// ====== Kalendar (noyabr 2026) ======
(() => {
  const y = 2026, m = 10, day = 6;
  const first = (new Date(y, m, 1).getDay() + 6) % 7; // dushanbadan boshlanadi
  const days = new Date(y, m + 1, 0).getDate();
  let h = '<h4>Noyabr 2026</h4><div class="cal-grid">' +
    ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'].map(x => `<span class="h">${x}</span>`).join('');
  for (let i = 0; i < first; i++) h += '<span></span>';
  for (let i = 1; i <= days; i++) h += `<span class="${i === day ? 'on' : ''}">${i}</span>`;
  $('#calendar').innerHTML = h + '</div>';
})();

// Kalendarga qo'shish (.ics)
$('#calBtn').addEventListener('click', e => {
  e.preventDefault();
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
    'DTSTART:20261106T130000Z', 'DTEND:20261106T200000Z',
    'SUMMARY:Muxriddinjon & Farishtamoh to\'y marosimi',
    'LOCATION:"Sardorbek" to\'yxonasi\\, Shargun shaharchasi\\, Sariosiyo tumani',
    'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = 'toy.ics';
  a.click();
});
