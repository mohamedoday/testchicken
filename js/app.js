// ==========================================================================
// Baik Chicken - Application Controller
// ==========================================================================

const $ = id => document.getElementById(id);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const BR = [
  ["البلديات", "07733334269"],
  ["الأمين", "07704077790"],
  ["الدورة", "07737772772"],
  ["بسماية", "07755556323"]
];

const fm = n => n.toLocaleString('en') + ' د.ع';

// --------------------------------------------------
// Toast Notification Helper
// --------------------------------------------------
function showToast(message, icon = '✅') {
  const container = $('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i>${icon}</i><span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// --------------------------------------------------
// Theme Switcher (Dark / Light)
// --------------------------------------------------
const currentTheme = localStorage.getItem('bc-theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

const themeBtn = $('theme-toggle');
if (themeBtn) {
  themeBtn.onclick = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('bc-theme', nextTheme);
    showToast(nextTheme === 'dark' ? 'تم تفعيل الوضع الليلي 🌙' : 'تم تفعيل الوضع النهار ☀️', '🎨');
  };
}

// --------------------------------------------------
// Favorites Management
// --------------------------------------------------
let favs = new Set(JSON.parse(localStorage.getItem('bc-favs') || '[]'));
function toggleFav(itemName, btn) {
  if (favs.has(itemName)) {
    favs.delete(itemName);
    btn.classList.remove('active');
    showToast(`تمت إزالة ${itemName} من المفضلة`, '💔');
  } else {
    favs.add(itemName);
    btn.classList.add('active');
    showToast(`تمت إضافة ${itemName} إلى المفضلة ❤️`, '💖');
  }
  localStorage.setItem('bc-favs', JSON.stringify([...favs]));
}

// --------------------------------------------------
// Price & Size Chip Builder
// --------------------------------------------------
function chips(a, p1, p2) {
  const ps = p1.includes(' · ') ? p1.split(' · ') : [p1];
  const lb = ps.length === 3 ? ['صغير', 'وسط', 'كبير'] : ps.length === 2 ? ['وسط', 'كبير'] : [''];
  const L = ps.map((x, i) => [x, lb[i]]);
  if (p2) L.push([p2, '']);

  return L.map(([x, l]) => {
    const m = x.match(/[\d,]+/);
    const n = m ? +m[0].replace(/,/g, '') : 0;
    const t = x.replace(/[\d,]+/, '').trim();
    const lab = (l + ' ' + t).trim();

    if (n) {
      return `
        <button class="chip" data-a="${a}" data-l="${lab}" data-p="${n}">
          <span>${l ? l + ' ' : ''}${n.toLocaleString('en')} د.ع ${t ? '(' + t + ')' : ''}</span>
          <i class="add-icon">+</i>
        </button>
      `;
    }
    return `<span class="chip off">${x}</span>`;
  }).join('');
}

// --------------------------------------------------
// Render Sections & Category Tabs
// --------------------------------------------------
const nav = $('nav');
const main = $('menu');
const tabs = [];
const secs = [];
let cur = 0;

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('in');
    io.unobserve(e.target);
  }
}), { rootMargin: '0px 0px -5% 0px' });

D.forEach(([ic, t, n, items], i) => {
  // Navigation Tab Button
  const b = document.createElement('button');
  b.innerHTML = `<i>${ic}</i><span>${t}</span><span class="cnt">${items.length}</span>`;
  b.onclick = () => show(i);
  nav.appendChild(b);
  tabs.push(b);

  // Section
  const s = document.createElement('section');
  s.className = 'sec';
  s.innerHTML = `
    <div class="sec-header">
      <h2>${ic} ${t}</h2>
      ${n ? `<p class="note">${n}</p>` : ''}
    </div>
    <div class="grid">
      ${items.map(([a, p1, p2]) => {
        const isFav = favs.has(a);
        const imgSrc = IMGS[PH[a]];
        return `
          <div class="c rv" data-n="${a}">
            <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFav('${a}', this)" aria-label="أضف للمفضلة">
              ♥
            </button>
            <div class="im">
              ${imgSrc ? `<img loading="lazy" alt="${a}" src="${imgSrc}">` : `<span class="mono">${ic}</span>`}
            </div>
            <div class="c-body">
              <b>${a}</b>
              <div class="p">${chips(a, p1, p2)}</div>
              <div class="card-qty-wrapper" data-item="${a}"></div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
  main.appendChild(s);
  secs.push(s);
});

function show(i) {
  cur = i;
  tabs.forEach((b, j) => b.classList.toggle('on', i === j));
  secs.forEach((s, j) => {
    s.classList.toggle('on', i === j);
    if (i === j) {
      s.querySelectorAll('.c').forEach((c, k) => {
        c.style.display = '';
        c.classList.remove('in');
        c.style.transitionDelay = (k < 12 ? k * 40 : 0) + 'ms';
        io.observe(c);
      });
    }
  });
  tabs[i].scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
}

show(0);

// --------------------------------------------------
// Carousel: "اختيارنا لك" (Featured Choice)
// --------------------------------------------------
const all = [];
D.forEach(d => d[3].forEach(x => all.push(x)));

const feaContainer = document.createElement('div');
feaContainer.className = 'fea-container';
feaContainer.id = 'fea';

const featuredNames = ["وجبة 8 قطع", "ريزو سبايسي", "برغر لحم دبل", "مشكل", "زنجر", "ستربس 6 قطع", "فاهيتا دجاج", "ريزو عائلي"];

feaContainer.innerHTML = `
  <div class="section-title-wrap">
    <h2 class="fh">اختيارنا لك 🔥</h2>
  </div>
  <div class="bsw">
    ${featuredNames.map(n => {
      const x = all.find(y => y[0] === n);
      if (!x) return '';
      const [a, p1, p2] = x;
      const imgSrc = IMGS[PH[a]];
      return `
        <div class="bs">
          <span class="featured-badge">الأكثر شعبية ⭐️</span>
          <div class="im">
            <img loading="lazy" alt="${a}" src="${imgSrc}">
          </div>
          <div class="c-body">
            <b>${a}</b>
            <div class="p">${chips(a, p1, p2)}</div>
          </div>
        </div>
      `;
    }).join('')}
  </div>
`;

main.insertBefore(feaContainer, main.firstChild);

// --------------------------------------------------
// Live Search & Filter Tags
// --------------------------------------------------
const qInput = $('q');
const qClear = $('sr-clear');

function filterSearch(v) {
  v = v.trim();
  if (feaContainer) feaContainer.style.display = v ? 'none' : '';
  if (qClear) qClear.classList.toggle('show', !!v);

  if (!v) {
    show(cur);
    return;
  }

  tabs.forEach(b => b.classList.remove('on'));
  secs.forEach(s => {
    let matchFound = 0;
    s.querySelectorAll('.c').forEach(c => {
      const match = c.dataset.n.toLowerCase().includes(v.toLowerCase());
      c.style.display = match ? '' : 'none';
      c.style.transitionDelay = '0ms';
      c.classList.add('in');
      if (match) matchFound = 1;
    });
    s.classList.toggle('on', !!matchFound);
  });
}

qInput.oninput = () => filterSearch(qInput.value);

if (qClear) {
  qClear.onclick = () => {
    qInput.value = '';
    filterSearch('');
    qInput.focus();
  };
}

document.querySelectorAll('.sr-tag').forEach(tag => {
  tag.onclick = () => {
    qInput.value = tag.dataset.kw;
    filterSearch(tag.dataset.kw);
  };
});

// --------------------------------------------------
// Render Branches Section
// --------------------------------------------------
$('bg').innerHTML = BR.map(([n, p]) => `
  <div class="bc">
    <div class="bc-header">
      <h3>فرع ${n}</h3>
      <span class="status-badge">مفتوح الآن</span>
    </div>
    <div class="n">${p}</div>
    <div class="bb">
      <a class="w" href="https://wa.me/964${p.slice(1)}" target="_blank" rel="noopener">
        <span>واتساب</span> 💬
      </a>
      <a class="t" href="tel:+964${p.slice(1)}">
        <span>اتصال</span> 📞
      </a>
    </div>
  </div>
`).join('');

$('bl').innerHTML = BR.map(([n, p], i) => `
  <label class="bo">
    <input type="radio" name="br" value="${i}">
    <b>فرع ${n}</b>
    <small>${p}</small>
  </label>
`).join('');

// --------------------------------------------------
// Shopping Cart Logic & State
// --------------------------------------------------
let cart = {};
let br = -1;

try {
  cart = JSON.parse(localStorage.getItem('bc') || '{}');
  br = +(localStorage.getItem('bb') || -1);
} catch (e) {}

function renderCart() {
  let totalItems = 0;
  let totalPrice = 0;
  let itemsList = [];

  const ci = $('ci');
  ci.innerHTML = Object.keys(cart).map(k => {
    const item = cart[k];
    totalItems += item.q;
    const subtotal = item.q * item.p;
    totalPrice += subtotal;

    itemsList.push(`• ${item.q} × ${item.n}${item.l ? ' (' + item.l + ')' : ''} = ${fm(subtotal)}`);

    return `
      <div class="ln">
        <div class="ln-title">
          <b>${item.n}</b>
          ${item.l ? `<small>(${item.l})</small>` : ''}
        </div>
        <div class="qt">
          <button data-k="${k}" data-d="-1">−</button>
          <b>${item.q}</b>
          <button data-k="${k}" data-d="1">+</button>
        </div>
        <em>${fm(subtotal)}</em>
      </div>
    `;
  }).join('') || '<p class="note" style="text-align:center; padding:20px;">السلة فارغة حالياً 🛒</p>';

  // Update Header Cart
  $('cn').textContent = totalItems;
  $('cs').textContent = fm(totalPrice);

  // Update Floating Bottom Cart Dock
  const dock = $('floating-cart');
  const dockCount = $('dock-count');
  const dockTotal = $('dock-total');
  const dockSub = $('dock-items-sub');

  if (totalItems > 0) {
    dock.classList.add('show');
    if (dockCount) dockCount.textContent = totalItems;
    if (dockTotal) dockTotal.textContent = fm(totalPrice);
    if (dockSub) dockSub.textContent = `${totalItems} مواد في السلة`;
  } else {
    dock.classList.remove('show');
  }

  // Sync Branch Radios
  document.querySelectorAll('input[name=br]').forEach(r => r.checked = +r.value === br);

  // Sync In-Card Quantity Controls
  syncInCardControls();

  // WhatsApp Checkout Link Builder
  const waBtn = $('wa');
  const isReady = totalItems > 0 && br >= 0;

  if (isReady) {
    const deliveryType = (document.querySelector('input[name=ty]:checked') || {}).value || 'توصيل';
    const customerName = $('nm').value.trim();
    const customerAddress = $('ad').value.trim();

    const orderMsg = `طلب جديد — مطعم بيك جكن 🍗
📍 الفرع: ${BR[br][0]}
------------------------
${itemsList.join('\n')}
------------------------
💰 المجموع الكلي: ${fm(totalPrice)}
🚗 طريقة الاستلام: ${deliveryType}
👤 الاسم: ${customerName || 'غير محدد'}
📞 العنوان/الهاتف: ${customerAddress || 'غير محدد'}`;

    waBtn.href = 'https://wa.me/964' + BR[br][1].slice(1) + '?text=' + encodeURIComponent(orderMsg);
    waBtn.classList.remove('off');
    waBtn.innerHTML = `<span>أرسل الطلب إلى فرع ${BR[br][0]}</span> 💬`;
  } else {
    waBtn.removeAttribute('href');
    waBtn.classList.add('off');
    waBtn.innerHTML = totalItems > 0 ? '<span>اختر الفرع لإرسال الطلب</span>' : '<span>السلة فارغة</span>';
  }

  // Persist State
  try {
    localStorage.setItem('bc', JSON.stringify(cart));
    localStorage.setItem('bb', br);
  } catch (e) {}
}

// --------------------------------------------------
// Direct In-Card Quantity Controls Sync
// --------------------------------------------------
function syncInCardControls() {
  // Count items per product name
  const itemCounts = {};
  Object.keys(cart).forEach(k => {
    const item = cart[k];
    itemCounts[item.n] = (itemCounts[item.n] || 0) + item.q;
  });

  document.querySelectorAll('.card-qty-wrapper').forEach(wrapper => {
    const itemName = wrapper.dataset.item;
    const count = itemCounts[itemName] || 0;

    if (count > 0) {
      wrapper.innerHTML = `
        <div class="card-qty-control">
          <span>في السلة: ${count} قطعة</span>
        </div>
      `;
    } else {
      wrapper.innerHTML = '';
    }
  });
}

// --------------------------------------------------
// Cart Click Listeners
// --------------------------------------------------
main.addEventListener('click', e => {
  const b = e.target.closest('.chip');
  if (!b || !b.dataset.p) return;

  const itemName = b.dataset.a;
  const itemLabel = b.dataset.l;
  const itemPrice = +b.dataset.p;

  const key = itemName + '|' + itemLabel;
  cart[key] = cart[key] || { n: itemName, l: itemLabel, p: itemPrice, q: 0 };
  cart[key].q++;

  renderCart();

  // Bump Cart Button Animation
  const c = $('cb');
  c.classList.remove('bump');
  void c.offsetWidth;
  c.classList.add('bump');

  b.classList.add('ok');
  setTimeout(() => b.classList.remove('ok'), 600);

  showToast(`تمت إضافة "${itemName}" للسلة`, '🍗');
});

$('ci').addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;

  const itemKey = b.dataset.k;
  const delta = +b.dataset.d;

  if (cart[itemKey]) {
    cart[itemKey].q += delta;
    if (cart[itemKey].q < 1) delete cart[itemKey];
    renderCart();
  }
});

$('bl').addEventListener('change', e => {
  br = +e.target.value;
  renderCart();
});

$('sh').addEventListener('change', renderCart);
$('nm').oninput = $('ad').oninput = renderCart;

// Validate WhatsApp click
$('wa').onclick = e => {
  if ($('wa').classList.contains('off')) {
    e.preventDefault();
    if (Object.keys(cart).length) {
      const branchBox = $('bl');
      branchBox.classList.remove('need');
      void branchBox.offsetWidth;
      branchBox.classList.add('need');
      branchBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast('يرجى اختيار الفرع أولاً لإرسال الطلب', '⚠️');
    }
  }
};

// --------------------------------------------------
// Cart Modal Open / Close Logic
// --------------------------------------------------
const toggleCartModal = open => $('sh').classList.toggle('open', open);

$('cb').onclick = () => toggleCartModal(true);
$('dock-open-btn').onclick = () => toggleCartModal(true);
$('x').onclick = () => toggleCartModal(false);

$('sh').onclick = e => {
  if (e.target.id === 'sh') toggleCartModal(false);
};

addEventListener('keydown', e => {
  if (e.key === 'Escape') toggleCartModal(false);
});

$('cl').onclick = () => {
  cart = {};
  renderCart();
  toggleCartModal(false);
  showToast('تم إفراغ السلة', '🗑');
};

renderCart();

// --------------------------------------------------
// Quick Branch Direct Modal
// --------------------------------------------------
function pickBranch(mode) {
  $('pt').textContent = mode === 'wa' ? 'اطلب عبر الواتساب' : 'اتصل بالفرع المباشر';
  $('pl').innerHTML = BR.map(([n, p]) => `
    <a class="pr2" href="${mode === 'wa' ? 'https://wa.me/964' + p.slice(1) + '?text=' + encodeURIComponent('مرحبا، أود الطلب من فرع ' + n) : 'tel:+964' + p.slice(1)}" ${mode === 'wa' ? 'target="_blank" rel="noopener"' : ''}>
      <span>فرع ${n}</span>
      <small>${p}</small>
    </a>
  `).join('');
  $('pk').classList.add('open');
}

document.querySelectorAll('[data-m]').forEach(b => {
  b.onclick = () => pickBranch(b.dataset.m);
});

$('px').onclick = () => $('pk').classList.remove('open');
$('pk').onclick = e => {
  if (e.target.id === 'pk') $('pk').classList.remove('open');
};

$('pl').addEventListener('click', () => setTimeout(() => $('pk').classList.remove('open'), 400));

// --------------------------------------------------
// Splash Preloader Removal
// --------------------------------------------------
const preloader = $('s0');
if (preloader) {
  setTimeout(() => preloader.classList.add('out'), reduce ? 0 : 800);
  setTimeout(() => preloader.remove(), reduce ? 100 : 1400);
}

// Hero Image Micro Parallax
if (!reduce) {
  const hp = document.querySelector('.hp');
  if (hp) {
    let ticking = false;
    addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = Math.min(scrollY, 500);
        hp.style.transform = `scale(${1 + y / 4000})`;
      });
    }, { passive: true });
  }
}
