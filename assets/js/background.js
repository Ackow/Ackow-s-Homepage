class BackgroundEffects {
    constructor() {
        this.init();
    }

    init() {
        const containers = document.querySelectorAll('.floating-elements');
        containers.forEach(container => this.createFloatingElements(container));
    }

    createFloatingElements(container) {
        // 清空现有的浮动元素
        container.innerHTML = '';

        // 创建新的浮动元素
        for (let i = 0; i < 15; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            
            // 随机大小 (2-6px)
            const size = Math.random() * 4 + 2;
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            
            // 随机位置
            element.style.left = `${Math.random() * 100}%`;
            element.style.top = `${Math.random() * 100}%`;
            
            // 随机动画延迟
            element.style.animationDelay = `${Math.random() * 5}s`;
            
            // 随机透明度 (0.1-0.3)
            element.style.opacity = (Math.random() * 0.2 + 0.1).toString();
            
            container.appendChild(element);
        }
    }
}

export { BackgroundEffects }; 