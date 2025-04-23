import { LanguageManager } from './i18n.js';
import { ThemeManager } from './theme.js';
import { NavigationManager } from './navigation.js';
import { WorksSlider } from './works.js';
import { SkillsCloud } from './skills.js';
import { BackgroundEffects } from './background.js';

// 等待 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new LanguageManager();
    new ThemeManager();
    new NavigationManager();
    new WorksSlider();
    new SkillsCloud();
    new BackgroundEffects();
}); 