(function () {
    const carousel = document.querySelector(".carousel");
    if (!carousel) {
        return;
    }

    const slides = carousel.querySelectorAll(".carousel-slide");
    if (!slides.length) {
        return;
    }

    let currentSlide = 0;
    let autoPlayTimer;

    const pagination = document.createElement("div");
    pagination.className = "carousel-pagination";
    pagination.setAttribute("role", "tablist");
    pagination.setAttribute("aria-label", "輪播導覽");

    const dots = Array.from(slides, (_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `第 ${index + 1} 張圖片`);
        dot.setAttribute("aria-selected", index === 0 ? "true" : "false");
        if (index === 0) {
            dot.classList.add("is-active");
        }
        dot.addEventListener("click", () => {
            showSlide(index);
            resetAutoPlay();
        });
        pagination.appendChild(dot);
        return dot;
    });

    carousel.appendChild(pagination);

    function updateDots() {
        dots.forEach((dot, index) => {
            const isActive = index === currentSlide;
            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-selected", isActive ? "true" : "false");
        });
    }

    function showSlide(index) {
        slides[currentSlide].classList.remove("is-active");
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add("is-active");
        updateDots();
    }

    function startAutoPlay() {
        autoPlayTimer = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    startAutoPlay();
})();
