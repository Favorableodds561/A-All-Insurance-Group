/* ================================================
   A-ALL INSURANCE — MAIN JS
   ================================================ */

// ===== STICKY HEADER =====
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

// ===== MOBILE MENU =====
document.getElementById('burgerBtn').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    }
  });
});

// ===== PHONE FORMAT =====
const fPhone = document.getElementById('fPhone');
if (fPhone) {
  fPhone.addEventListener('input', function() {
    let v = this.value.replace(/\D/g,'').substring(0,10);
    if (v.length >= 6) v = `(${v.substring(0,3)}) ${v.substring(3,6)}-${v.substring(6)}`;
    else if (v.length >= 3) v = `(${v.substring(0,3)}) ${v.substring(3)}`;
    this.value = v;
  });
}

// ===== ZIP NUMBERS ONLY =====
const fZip = document.getElementById('fZip');
if (fZip) fZip.addEventListener('input', function() { this.value = this.value.replace(/\D/g,'').substring(0,5); });

// ===== FORM SUBMISSION =====
const quoteForm = document.getElementById('quoteForm');
const formThanks = document.getElementById('formThanks');
const submitBtn  = document.getElementById('submitBtn');

function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function isPhone(v) { return v.replace(/\D/g,'').length === 10; }
function isZip(v)   { return /^\d{5}$/.test(v); }

if (quoteForm) {
  quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const n1 = document.getElementById('fName');
    const n2 = document.getElementById('lName');
    const ph = document.getElementById('fPhone');
    const em = document.getElementById('fEmail');
    const zp = document.getElementById('fZip');

    let ok = true;
    [[n1, v => v.trim()], [n2, v => v.trim()], [ph, isPhone], [em, isEmail], [zp, isZip]]
      .forEach(([el, fn]) => {
        const valid = fn(el.value);
        el.classList.toggle('err', !valid);
        if (!valid) ok = false;
      });

    if (!ok) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    // === Google Ads Conversion — uncomment & fill in your IDs ===
    // if (typeof gtag === 'function') {
    //   gtag('event', 'conversion', { 'send_to': 'AW-XXXXXXXXX/YYYYYYYYYYY', 'value': 25.0, 'currency': 'USD' });
    // }

    // === Form endpoint — replace with Formspree / your CRM ===
    // const res = await fetch('https://formspree.io/f/YOUR_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    //   body: JSON.stringify({ firstName: n1.value, lastName: n2.value, phone: ph.value, email: em.value, zip: zp.value })
    // });

    // Simulate for demo
    await new Promise(r => setTimeout(r, 700));

    quoteForm.style.display = 'none';
    formThanks.style.display = 'block';
    document.getElementById('quote').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  quoteForm.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('err'));
  });
}

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.cov-card, .step, .rev-card, .srv-tile, .why-ul li, .hstat').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.07}s`;
  observer.observe(el);
});

// ===== UTM CAPTURE =====
(function() {
  new URLSearchParams(window.location.search).forEach((v, k) => {
    if (['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid'].includes(k))
      sessionStorage.setItem(k, v);
  });
})();
