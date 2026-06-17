(function () {
    const currentPage = location.pathname.split("/").pop() || "index.html";

    const nav = document.createElement("nav");
    nav.className = "navbar";
    nav.setAttribute("aria-label", "主要導覽");
    nav.innerHTML = `
        <a class="nav-logo" href="index.html">稀蝸</a>
        <div class="nav-links">
            <a href="index.html" data-page="index.html">主頁</a>
            <div class="nav-dropdown">
                <button class="nav-dropdown-trigger" type="button">作品預覽</button>
                <div class="nav-dropdown-menu">
                    <a href="works.html" data-page="works.html">原創</a>
                    <a href="fanart.html" data-page="fanart.html">二創</a>
                </div>
            </div>
            <div class="nav-dropdown">
                <button class="nav-dropdown-trigger" type="button">關於委託</button>
                <div class="nav-dropdown-menu">
                    <a href="price.html" data-page="price.html">價目表</a>
                    <a href="notice.html" data-page="notice.html">委託需知</a>
                </div>
            </div>
            <a href="contact.html" data-page="contact.html">聯絡我</a>
        </div>
    `;

    const placeholder = document.getElementById("site-nav");
    if (placeholder) {
        placeholder.replaceWith(nav);
    } else {
        document.body.insertBefore(nav, document.body.firstChild);
    }

    nav.querySelectorAll("[data-page]").forEach((link) => {
        if (link.dataset.page === currentPage) {
            link.setAttribute("aria-current", "page");

            const dropdown = link.closest(".nav-dropdown");
            if (dropdown) {
                dropdown.classList.add("is-active");
            }
        }
    });

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbarVisibility() {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;
        const hideOffset = nav.offsetHeight || 64;

        if (currentScrollY <= 8) {
            nav.classList.remove("is-hidden");
        } else if (scrollDelta > 0 && currentScrollY > hideOffset) {
            nav.classList.add("is-hidden");
        } else if (scrollDelta < 0) {
            nav.classList.remove("is-hidden");
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener(
        "scroll",
        () => {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbarVisibility);
                ticking = true;
            }
        },
        { passive: true }
    );

    /* Footer styles and markup injected dynamically so all pages share a single source */
    const footerCSS = `
/* Make footer background full-bleed and fixed height, remove horizontal gaps */
.site-footer{
  background: #F5C542;
  width: 100vw;               /* full viewport width */
  margin-left: calc(50% - 50vw); /* neutralize any constrained container */
  margin-right: calc(50% - 50vw);
  height: 240px;             /* fixed height */
  padding: 0;                /* no horizontal padding so background touches edges */
  box-sizing: border-box;
  display:flex;
  align-items:center;
  justify-content:center;    /* center inner content */
}
/* inner content box that holds the left/right elements */
.footer-inner{
  max-width: 980px;          /* content width limit */
  width: 100%;
  height: 100%;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 18px;
  padding: 24px 28px;        /* internal padding for content spacing */
  box-sizing:border-box;
  font-family: inherit;
  font-size: clamp(0.95rem, 2.1vw, 1rem);
}
.footer-inner .footer-left{
  font-weight:700;
  color: #000; /* ensure name is black */
  font-size: clamp(1.4rem, 3.5vw, 2.4rem); /* larger, responsive */
  line-height: 1;
}
.footer-inner .footer-right{ display:flex; gap: clamp(12px, 3vw, 28px); align-items:center; }
.footer-inner .footer-right a{ color: #000; text-decoration:none; opacity:0.95; }
.footer-inner .footer-right a:hover{ text-decoration: underline; opacity:1; }
/* Responsive fallback: on narrow viewports allow height to auto and stack content */
@media (max-width:1100px){
  .site-footer{ height: auto; padding: 12px 0; }
  .footer-inner{ max-width: calc(100% - 32px); flex-direction:column; gap:12px; padding:16px; height:auto; }
  .footer-inner .footer-right{ justify-content:center; flex-wrap:wrap; }
}
`;

    const style = document.createElement('style');
    style.textContent = footerCSS;
    document.head.appendChild(style);

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.setAttribute('role', 'contentinfo');
    footer.innerHTML = `
        <div class="footer-inner">
            <div class="footer-left">稀蝸</div>
            <nav class="footer-right" aria-label="頁尾導覽">
                <a href="works.html">作品預覽</a>
                <a href="price.html">價目表</a>
                <a href="notice.html">委託需知</a>
                <a href="contact.html">聯絡我</a>
            </nav>
        </div>
    `;

    document.body.appendChild(footer);

})();
