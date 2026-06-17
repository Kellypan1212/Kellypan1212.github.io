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
})();
