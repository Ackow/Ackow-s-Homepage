import { WorksCarousel } from './modules/carousel.js';

// 主题切换功能
document.addEventListener('DOMContentLoaded', () => {    
    const themeSwitch = document.querySelector('.theme-switch');
    const body = document.body;
    const header = document.querySelector('header');
    
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        const icon = themeSwitch.querySelector('.material-icons-round');
        if (icon) {
            icon.textContent = 'dark_mode';
        }
    }
    
    // 主题切换事件
    themeSwitch.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        const icon = themeSwitch.querySelector('.material-icons-round');
        if (icon) {
            icon.textContent = isDark ? 'dark_mode' : 'light_mode';
        }
    });
    
    // 语言切换功能
    const languageSwitch = document.querySelector('.language-switch');
    const currentLang = languageSwitch?.querySelector('.current-lang');
    
    // 检查本地存储中的语言设置
    const savedLang = localStorage.getItem('language') || 'zh';
    currentLang.textContent = savedLang === 'zh' ? '中' : 'En';
    
    // 初始化页面文本
    updatePageText(savedLang);
    
    // 语言切换事件
    languageSwitch.addEventListener('click', () => {
        console.log('Language switch clicked');
        const newLang = currentLang.textContent === '中' ? 'en' : 'zh';
        currentLang.textContent = newLang === 'zh' ? '中' : 'En';
        localStorage.setItem('language', newLang);
        
        // 更新页面文本
        updatePageText(newLang);
    });

    // 初始化作品轮播
    try {
        const worksSection = document.querySelector('.works-section');
        if (worksSection) {
            worksSection.classList.add('visible'); // 立即显示作品展示部分
        }
        
        const carousel = new WorksCarousel();
        console.log('Carousel initialized:', carousel);
    } catch (error) {
        console.error('Error initializing carousel:', error);
    }
    
    // 监听滚动事件，实现背景过渡
    const worksSection = document.querySelector('.works-section');
    if (worksSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    worksSection.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(worksSection);
    } else {
        console.error('Works section not found');
    }

    // 监听滚动事件，实现导航栏背景透明度渐变
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const maxScroll = 300; // 最大滚动距离
        const opacity = Math.min(scrollPosition / maxScroll, 1); // 计算透明度
        
        if (body.classList.contains('dark-theme')) {
            // 深色主题
            header.style.backgroundColor = `rgba(40, 40, 40, ${0.4 + opacity * 0.6})`;
        } else {
            // 浅色主题
            header.style.backgroundColor = `rgba(255, 255, 255, ${0.4 + opacity * 0.6})`;
        }
    });
});

// 更新页面文本
function updatePageText(lang) {
    console.log('Updating page text to:', lang);
    
    const translations = {
        zh: {
            'nav.home': '首页',
            'nav.works': '作品展示',
            'nav.blog': '博客',
            'nav.contact': '联系',
            'hero.title': 'Ackow',
            'hero.subtitle': '用代码构建未来'
        },
        en: {
            'nav.home': 'Home',
            'nav.works': 'Works',
            'nav.blog': 'Blog',
            'nav.contact': 'Contact',
            'hero.title': 'Ackow',
            'hero.subtitle': 'Building Future with Code'
        }
    };
    
    // 更新所有带有 data-i18n 属性的元素
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
} 