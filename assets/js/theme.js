class ThemeManager {
    constructor() {
        this.isDarkMode = false;
        this.init();
    }

    init() {
        const themeButton = document.querySelector('.theme-switch');
        if (themeButton) {
            this.themeIcon = themeButton.querySelector('.material-icons-round');
            themeButton.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('dark-theme');
        if (this.themeIcon) {
            this.themeIcon.textContent = this.isDarkMode ? 'dark_mode' : 'light_mode';
        }
    }
}

export { ThemeManager }; 