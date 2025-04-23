class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
    }

    handleNavClick(event) {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => link.classList.remove('active'));
        event.currentTarget.classList.add('active');
    }
}

export { NavigationManager }; 