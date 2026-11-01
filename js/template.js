// ==========================================================================
// Baik Chicken - UI Shell Template Generator
// ==========================================================================

document.body.insertAdjacentHTML("afterbegin", `
  <!-- Preloader Screen -->
  <div id="s0">
    <div class="preloader-content">
      <img class="lg" alt="Baik Chicken Logo">
      <div class="spinner"></div>
    </div>
  </div>

  <!-- Top Sticky Header -->
  <header class="top glass">
    <div class="container tb">
      <a href="#" class="tb-brand">
        <img class="lg" alt="Baik Chicken Logo">
        <div class="tb-brand-text">
          <b>بيك جكن</b>
          <span>Baik Chicken</span>
        </div>
      </a>

      <div class="tb-actions">
        <!-- Theme Toggle Button -->
        <button id="theme-toggle" class="icon-btn" aria-label="تبديل المظهر" title="تبديل المظهر">
          <svg class="sun-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
          </svg>
        </button>

        <!-- Cart Header Button -->
        <button id="cb" class="cbtn">
          <span>سلتك</span>
          <span id="cn">0</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="container hw">
      <div class="ht">
        <div class="hero-badge">
          <span class="pulse-dot"></span>
          <span>أفضل دجاج مقرمش في بغداد 🍗</span>
        </div>

        <h1>
          طعم الأصالة والجودة العالية في <span class="highlight">بيك جكن</span>
        </h1>

        <p>
          دجاج مقرمش طازج يومياً، برغر، بيتزا، مشاوي ووجبات شرقية وغربية. اختار فرعك الأقرب واطلب بضغطة واحدة عبر الواتساب!
        </p>

        <!-- Quick Stats Row -->
        <div class="hero-stats">
          <div class="stat-item">
            <i>📍</i>
            <span>4 فروع في بغداد</span>
          </div>
          <div class="stat-item">
            <i>⚡</i>
            <span>توصيل سريع</span>
          </div>
          <div class="stat-item">
            <i>⭐</i>
            <span>4.9/5 تقييم الزبائن</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="hb">
          <a class="btn btn-primary" href="#menu">
            <span>تصفح المنيو</span>
            <i>⬇️</i>
          </a>
          <button class="btn btn-whatsapp" data-m="wa">
            <span>الطلب السريع (واتساب)</span>
            <i>💬</i>
          </button>
          <button class="btn btn-glass" data-m="tel">
            <span>اتصال بالفرع</span>
            <i>📞</i>
          </button>
        </div>
      </div>

      <div class="hi">
        <div class="hi-wrapper">
          <img class="hp" alt="وجبة بيك جكن الرئيسية" src="img/hero.jpg">
          <div class="hero-float-card">
            <span class="badge">الأكثر طلباً 🔥</span>
            <div class="info">
              <b>وجبة 8 قطع مقرمشة</b>
              <span>17,000 د.ع</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Sticky Category Navigation Bar -->
  <nav class="nv glass">
    <div class="container seg-wrapper">
      <div class="seg" id="nav"></div>
    </div>
  </nav>

  <!-- Search & Quick Filters -->
  <div class="container sr-section">
    <div class="sr">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input id="q" type="search" placeholder="ابحث في قائمة الطعام (برغر، بيتزا، كنتاكي، مشاوي...)" autocomplete="off">
      <button id="sr-clear" class="sr-clear" aria-label="مسح البحث">✕</button>
    </div>

    <div class="sr-tags">
      <span class="sr-tag" data-kw="وجبة">🔥 وجبات كنتاكي</span>
      <span class="sr-tag" data-kw="برغر">🍔 برغر</span>
      <span class="sr-tag" data-kw="ريزو">🍚 ريزو</span>
      <span class="sr-tag" data-kw="بيتزا">🍕 بيتزا</span>
      <span class="sr-tag" data-kw="كباب">🔥 مشاوي</span>
      <span class="sr-tag" data-kw="شاورما">🌯 شاورما</span>
    </div>
  </div>

  <!-- Main Menu Grid -->
  <main id="menu" class="container"></main>

  <!-- Floating Cart Dock (Bottom Bar) -->
  <div id="floating-cart" class="floating-cart-dock">
    <div class="dock-info">
      <div class="dock-badge">
        <span>🛒</span>
        <span id="dock-count">0</span>
      </div>
      <div class="dock-text">
        <b id="dock-total">0 IQD</b>
        <small id="dock-items-sub">السلة جاهزة للطلب</small>
      </div>
    </div>
    <button id="dock-open-btn" class="dock-action-btn">
      <span>عرض السلة</span>
      <i>⬅️</i>
    </button>
  </div>

  <!-- Branches Section -->
  <section class="br" id="branches">
    <div class="container">
      <h2>فروعنا في بغداد 📍</h2>
      <p>اختر الفرع الأقرب إليك للتوصيل أو الاستلام المباشر</p>
      <div class="bg" id="bg"></div>
    </div>
  </section>

  <!-- Branch Choice Quick Modal -->
  <div class="sh" id="pk">
    <div class="sp">
      <div class="sph">
        <h3 id="pt">اختر الفرع</h3>
        <button id="px" aria-label="إغلاق">✕</button>
      </div>
      <p class="note">اختر منطقتك وراح نحولك مباشرة للفرع المطلوب</p>
      <div class="pl" id="pl"></div>
    </div>
  </div>

  <!-- Cart Drawer Sheet Modal -->
  <div class="sh" id="sh">
    <div class="sp">
      <div class="sph">
        <h3>تفاصيل طلبك 🛒</h3>
        <button id="x" aria-label="إغلاق">✕</button>
      </div>

      <div id="ci" class="cart-items-list"></div>

      <div class="tot">
        <span>المجموع الكلي:</span>
        <b id="cs">0 IQD</b>
      </div>

      <h4>1. اختر الفرع الأقرب إليك</h4>
      <div class="bl" id="bl"></div>

      <h4>2. طريقة الاستلام</h4>
      <div class="ty">
        <label>
          <input type="radio" name="ty" value="توصيل للمنزل" checked>
          <span>🚴‍♂️ توصيل للمنزل</span>
        </label>
        <label>
          <input type="radio" name="ty" value="استلام من الفرع">
          <span>🏪 استلام من الفرع</span>
        </label>
      </div>

      <h4>3. معلومات الزبون</h4>
      <input id="nm" type="text" placeholder="الاسم الكامل">
      <input id="ad" type="text" placeholder="العنوان الدقيق ورقم الهاتف">

      <a id="wa" class="send off" target="_blank" rel="noopener">
        <span>أرسل الطلب عبر الواتساب</span>
        <i>💬</i>
      </a>

      <button id="cl" class="clr">تفريغ السلة بالكامل</button>
    </div>
  </div>

  <!-- Footer -->
  <footer>
    <div class="container">
      <p>© ${new Date().getFullYear()} مطعم بيك جكن (Baik Chicken) · جميع الأسعار بالدينار العراقي (IQD)</p>
      <p style="margin-top: 6px; font-size: 0.8rem; opacity: 0.7;">أشهى دجاج مقرمش، برغر، بيتزا، مشاوي ووجبات شرقية وغربية في بغداد</p>
    </div>
  </footer>
`);

// Set logo image sources
document.querySelectorAll(".lg").forEach(i => i.src = LOGO);
