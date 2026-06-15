(function () {
    const carousel = document.querySelector(".carousel");
    if (!carousel) {
        return;
    }

    const slides = carousel.querySelectorAll(".carousel-slide");
    const previousButton = carousel.querySelector(".carousel-button-prev");
    const nextButton = carousel.querySelector(".carousel-button-next");

    if (!slides.length || !previousButton || !nextButton) {
        return;
    }

    let currentSlide = 0;
    let autoPlayTimer;

    function showSlide(index) {
        slides[currentSlide].classList.remove("is-active");
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add("is-active");
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

    previousButton.addEventListener("click", () => {
        showSlide(currentSlide - 1);
        resetAutoPlay();
    });

    nextButton.addEventListener("click", () => {
        showSlide(currentSlide + 1);
        resetAutoPlay();
    });

    startAutoPlay();
})();
