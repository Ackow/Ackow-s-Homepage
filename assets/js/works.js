class WorksSlider {
    constructor() {
        this.currentSlide = 0;
        this.init();
    }

    init() {
        this.container = document.querySelector('.works-container');
        this.prevButton = document.querySelector('.slider-controls .prev');
        this.nextButton = document.querySelector('.slider-controls .next');

        if (this.prevButton && this.nextButton) {
            this.prevButton.addEventListener('click', () => this.prevSlide());
            this.nextButton.addEventListener('click', () => this.nextSlide());
        }
    }

    updateSlider() {
        if (!this.container) return;
        const slideWidth = document.querySelector('.work-card')?.offsetWidth + 30 || 0;
        this.container.style.transform = `translateX(-${this.currentSlide * slideWidth}px)`;
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateSlider();
        }
    }

    nextSlide() {
        const maxSlides = document.querySelectorAll('.work-card').length - 1;
        if (this.currentSlide < maxSlides) {
            this.currentSlide++;
            this.updateSlider();
        }
    }
}

export { WorksSlider }; 