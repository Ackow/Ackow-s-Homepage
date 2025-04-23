// 语言配置
const translations = {
    zh: {
        title: "Ackow",
        nav: {
            home: "首页",
            works: "作品展示",
            blog: "博客",
            contact: "联系"
        },
        hero: {
            title: "Ackow",
            subtitle: "用代码构建未来"
        },
        works: {
            title: "作品全览",
            project1: {
                title: "项目一"
            }
        },
        skills: {
            title: "技术栈"
        }
    },
    en: {
        title: "Ackow",
        nav: {
            home: "Home",
            works: "Works",
            blog: "Blog",
            contact: "Contact"
        },
        hero: {
            title: "Ackow",
            subtitle: "Building the Future with Code"
        },
        works: {
            title: "Works",
            project1: {
                title: "Project 1"
            }
        },
        skills: {
            title: "Skills"
        }
    }
};

// 语言切换功能
class LanguageManager {
    constructor() {
        this.currentLang = 'zh';
        this.init();
    }

    init() {
        const languageButton = document.querySelector('.language-switch');
        if (languageButton) {
            languageButton.addEventListener('click', () => this.toggleLanguage());
        }
    }

    setLanguage(lang) {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const keys = element.getAttribute('data-i18n').split('.');
            let value = translations[lang];
            keys.forEach(key => {
                value = value[key];
            });
            element.textContent = value;
        });
        
        // 更新语言显示
        document.querySelector('.current-lang').textContent = lang === 'zh' ? '中' : 'En';
        
        // 更新页面标题
        document.title = lang === 'zh' ? 'Ackow的个人主页' : "Ackow's Homepage";
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
        this.setLanguage(this.currentLang);
    }
}

export { LanguageManager }; 