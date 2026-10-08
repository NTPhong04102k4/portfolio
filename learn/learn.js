/* ========================================================
   LEARN — JS thuần + jQuery cơ bản (chú thích tiếng Việt)
   Phần 1: JS thuần.  Phần 2: jQuery.  Phần 3: fetch.  Phần 4: check info.
   ======================================================== */

/* ---------- 1. JS THUẦN ---------- */
(function () {
  'use strict';

  // Reveal khi cuộn: IntersectionObserver
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Đánh dấu link mục lục đang xem
  const links = document.querySelectorAll('#topbar a');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));

  // <dialog>
  const dlg = document.getElementById('demo-dialog');
  document.getElementById('open-dialog').addEventListener('click', () => dlg.showModal());
  document.getElementById('close-dialog').addEventListener('click', () => dlg.close());

  // Easing: bấm chạy tất cả bóng
  document.getElementById('run-easing').addEventListener('click', () => {
    document.querySelectorAll('.track').forEach((t) => t.classList.toggle('go'));
  });

  // Chạy lại animation: gỡ class → ép reflow → thêm lại
  function replay(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth;            // ép trình duyệt tính lại layout để animation chạy lại
    el.classList.add(cls);
  }
  document.getElementById('replay-slide').addEventListener('click', () => replay(document.getElementById('slide-box'), 'a-slide'));
  document.getElementById('run-shake').addEventListener('click', () => replay(document.getElementById('shake-box'), 'a-shake'));

  // Thẻ lật trên cảm ứng: chạm để lật
  const flip = document.getElementById('flip-card');
  flip.addEventListener('click', () => flip.classList.toggle('is-flipped'));

  // Nghiêng 3D theo chuột
  const area = document.getElementById('tilt-area');
  const card = document.getElementById('tilt-card');
  area.addEventListener('pointermove', (e) => {
    const r = area.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;    // -0.5 .. 0.5
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateY(${x * 40}deg) rotateX(${-y * 40}deg)`;
  });
  area.addEventListener('pointerleave', () => { card.style.transform = ''; });

  // classList.toggle
  document.getElementById('js-toggle').addEventListener('click', () => {
    document.getElementById('js-target').classList.toggle('a-pulse');
  });

  // Event delegation: 1 listener cho cả danh sách
  const list = document.getElementById('delegate-list');
  list.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    document.getElementById('delegate-out').textContent = 'Đã chọn id = ' + li.dataset.id;
  });

  // Debounce
  function debounce(fn, ms = 400) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  }
  const searchOut = document.getElementById('search-out');
  document.getElementById('search-input').addEventListener('input', debounce((e) => {
    searchOut.textContent = 'Tìm: "' + e.target.value + '"';
  }));

  // localStorage (bọc try/catch vì có thể bị chặn)
  const countBtn = document.getElementById('count-btn');
  let n = 0;
  try { n = Number(localStorage.getItem('learn-count') ?? 0); } catch (e) { /* bỏ qua */ }
  countBtn.textContent = 'Đếm: ' + n;
  countBtn.addEventListener('click', () => {
    n += 1;
    countBtn.textContent = 'Đếm: ' + n;
    try { localStorage.setItem('learn-count', String(n)); } catch (e) { /* bỏ qua */ }
  });
})();

/* ---------- 2. jQUERY (dùng #id và .class) ---------- */
$(function () {                                  // = $(document).ready(...)
  $('#jq-toggle').on('click', function () {
    $('.jq-box').toggleClass('a-spin');
  });

  $('#jq-fade').on('click', function () { $('#jq-panel').fadeToggle(400); });
  $('#jq-slide').on('click', function () { $('#jq-panel').slideToggle(); });

  $('#jq-add').on('click', function () {
    const v = $('#jq-input').val().trim();
    if (!v) return;
    $('#jq-list').append($('<li>').text(v));     // .text() an toàn hơn .html() (chống XSS)
    $('#jq-input').val('').focus();
  });
  $('#jq-input').on('keydown', function (e) {
    if (e.key === 'Enter') $('#jq-add').trigger('click');
  });
});

/* ---------- 3. FETCH (thay Axios) ---------- */
async function http(url, { method = 'GET', data, headers = {}, timeout = 8000 } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', ...headers },
      body: data ? JSON.stringify(data) : undefined,
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

$('#fetch-btn').on('click', async function () {
  const $out = $('#fetch-out').text('Đang tải...');
  try {
    const todo = await http('https://jsonplaceholder.typicode.com/todos/1');
    $out.text('OK: ' + todo.title);
  } catch (err) {
    $out.text('Lỗi: ' + (err.name === 'AbortError' ? 'quá thời gian' : err.message));
  }
});

/* ---------- 4. CHECK INFO (validate form, JS thuần) ---------- */
(function () {
  const form = document.getElementById('demo-form');
  const rules = {
    name:  (v) => (v.length < 2 ? 'Họ tên tối thiểu 2 ký tự.' : ''),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Email không hợp lệ.'),
    phone: (v) => (/^(0|\+84)\d{9}$/.test(v.replace(/\s/g, '')) ? '' : 'Số điện thoại VN gồm 10 số, bắt đầu bằng 0.'),
  };

  function check(wrap) {
    const input = wrap.querySelector('input');
    const msg = wrap.querySelector('.msg');
    const error = rules[wrap.dataset.field](input.value.trim());
    wrap.classList.toggle('has-error', Boolean(error));
    wrap.classList.toggle('is-ok', !error);
    input.setAttribute('aria-invalid', error ? 'true' : 'false');
    msg.textContent = error;
    return error;
  }

  form.querySelectorAll('.field').forEach((wrap) => {
    wrap.querySelector('input').addEventListener('blur', () => check(wrap));
    wrap.querySelector('input').addEventListener('input', () => {
      if (wrap.classList.contains('has-error')) check(wrap);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bad = [...form.querySelectorAll('.field')].filter((w) => check(w));
    const result = document.getElementById('form-result');
    if (bad.length) {
      bad[0].querySelector('input').focus();
      result.textContent = 'Còn ' + bad.length + ' ô chưa hợp lệ.';
      return;
    }
    result.textContent = 'Thông tin hợp lệ.';
  });
})();

/* ---------- 5. KÍCH THƯỚC + XOAY MÀN (giống useWindowDimensions) ---------- */
(function () {
  function getWindowDimensions() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
      width,
      height,
      orientation: width > height ? 'landscape' : 'portrait',
      device: width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop',
    };
  }
  const out = document.getElementById('dim-out');
  function update() {
    const d = getWindowDimensions();
    document.documentElement.dataset.device = d.device;
    document.documentElement.dataset.orientation = d.orientation;
    out.textContent = `${d.width} x ${d.height} px | ${d.device} | ${d.orientation}`;
  }
  window.addEventListener('resize', update, { passive: true });
  window.addEventListener('orientationchange', update, { passive: true });
  update();
})();
