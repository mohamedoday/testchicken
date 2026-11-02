// واجهة الصفحة (HTML) تُبنى هنا
document.body.insertAdjacentHTML("afterbegin",`<div id="s0"><img alt=""></div><div id="pg"></div>
<header class="hero">
<canvas id="gl"></canvas>
<span class="fl" style="top:12%;right:8%">🍗</span><span class="fl" style="top:60%;left:7%;animation-delay:-2s">🍔</span><span class="fl" style="top:20%;left:14%;animation-delay:-4s">🍕</span><span class="fl" style="bottom:12%;right:14%;animation-delay:-1s">🍟</span>
<div class="in">
<img class="logo" alt="Baik Chicken" >
<h1>بيك جكن</h1>
<p>دجاج مقرمش · برغر · بيتزا · مشاوي</p>
<a class="go" href="#menu">شوف المنيو</a> <a class="go" href="https://wa.me/9647737772772" style="background:#25d366;color:#fff;margin-inline-start:8px">اطلب واتساب</a>
</div>
</header>
<div class="tick"><div><span>🍗 كنتاكي مقرمش  ✦  🍔 برغر  ✦  🍚 ريزو  ✦  🍕 بيتزا  ✦  🔥 مشاوي  ✦  🌯 شاورما  ✦  </span><span>🍗 كنتاكي مقرمش  ✦  🍔 برغر  ✦  🍚 ريزو  ✦  🍕 بيتزا  ✦  🔥 مشاوي  ✦  🌯 شاورما  ✦  </span></div></div>
<nav id="nav"></nav>
<main id="menu"></main>
<div class="sr"><input id="q" type="search" placeholder="🔍 دوّر على أكلة..."></div>
<button id="th" class="th" aria-label="الوضع">🌓</button>
<button id="cb" class="cb" hidden>🛒 <b id="cn">0</b> <span id="ct"></span></button>
<div id="sh" class="sh"><div class="sp"><h3>🧾 طلبك</h3><div id="ci"></div><div class="tot"><span>المجموع</span><b id="cs"></b></div><div class="ty"><label><input type="radio" name="ty" value="توصيل" checked> 🛵 توصيل</label><label><input type="radio" name="ty" value="استلام من المطعم"> 🏪 استلام</label></div><input id="nm" placeholder="الاسم"><input id="ad" placeholder="العنوان ورقم الهاتف"><a id="wa" class="wa" target="_blank" rel="noopener">أرسل الطلب عبر واتساب</a><button id="cl" class="clr">تفريغ السلة</button></div></div>
<section class="ctc"><h2>اطلب هسه</h2><p>ابعث طلبك واتساب أو اتصل بينا</p><div class="cbt"><a class="wa" href="https://wa.me/9647737772772" target="_blank" rel="noopener">💬 واتساب</a><a class="cl2" href="tel:+9647737772772">📞 اتصال</a></div><p dir="ltr" class="num">+964 773 777 2772</p></section>
<footer><b>Baik Chicken</b> — الأسعار بالدينار العراقي (IQD)</footer>`);
document.querySelector(".logo").src=LOGO;
