class SkillsCloud {
    constructor() {
        this.skills = [
            { name: 'JavaScript', level: 40, color: '#F7DF1E' },
            { name: 'Python', level: 70, color: '#3776AB' },
            { name: 'CSS3', level: 50, color: '#1572B6' },
            { name: 'HTML5', level: 50, color: '#E34F26' },
            { name: 'Git', level: 30, color: '#F05032' },
            { name: 'C++', level: 30, color: '#00599C' },
            { name: 'C#', level: 90, color: '#239120' },
            { name: 'Unity', level: 90, color: '#239120' },
        ];
        this.init();
    }

    init() {
        this.createSkillsCloud();
        window.addEventListener('resize', () => this.createSkillsCloud());
    }

    createSkillsCloud() {
        const container = document.getElementById('skillsCloud');
        if (!container) return;

        // 清空现有内容
        container.innerHTML = '';

        // 获取容器尺寸
        const containerRect = container.getBoundingClientRect();
        const usedPositions = [];

        this.skills.forEach(skill => {
            const tag = document.createElement('div');
            tag.className = 'skill-tag';
            tag.textContent = skill.name;
            
            // 根据技能水平设置大小
            const scale = 0.8 + (skill.level / 100) * 0.7;
            tag.style.transform = `scale(${scale})`;
            
            // 设置自定义背景色
            tag.style.backgroundColor = skill.color;
            
            // 添加到容器以获取尺寸
            container.appendChild(tag);
            const tagRect = tag.getBoundingClientRect();

            // 找到合适的位置
            const position = this.findSuitablePosition(
                containerRect,
                tagRect,
                usedPositions
            );

            // 应用位置
            tag.style.left = `${position.x}px`;
            tag.style.top = `${position.y}px`;

            // 记录已使用的位置
            usedPositions.push({
                x: position.x,
                y: position.y,
                width: tagRect.width,
                height: tagRect.height
            });

            // 添加悬停效果
            tag.addEventListener('mouseover', () => {
                tag.style.zIndex = '10';
            });

            tag.addEventListener('mouseout', () => {
                tag.style.zIndex = '1';
            });
        });
    }

    findSuitablePosition(containerRect, tagRect, usedPositions) {
        const padding = 20; // 标签之间的最小间距
        const maxAttempts = 100;
        
        for (let i = 0; i < maxAttempts; i++) {
            const x = Math.random() * (containerRect.width - tagRect.width);
            const y = Math.random() * (containerRect.height - tagRect.height);
            
            // 检查是否与其他标签重叠
            if (!this.checkCollision(x, y, tagRect, usedPositions, padding)) {
                return { x, y };
            }
        }
        
        // 如果找不到合适的随机位置，使用网格布局
        return this.getFallbackPosition(containerRect, tagRect, usedPositions.length);
    }

    checkCollision(x, y, tagRect, usedPositions, padding) {
        return usedPositions.some(pos => {
            return !(x + tagRect.width + padding < pos.x ||
                    x > pos.x + pos.width + padding ||
                    y + tagRect.height + padding < pos.y ||
                    y > pos.y + pos.height + padding);
        });
    }

    getFallbackPosition(containerRect, tagRect, index) {
        const columns = 4;
        const rows = Math.ceil(this.skills.length / columns);
        const columnWidth = containerRect.width / columns;
        const rowHeight = containerRect.height / rows;
        
        const column = index % columns;
        const row = Math.floor(index / columns);
        
        return {
            x: column * columnWidth + (columnWidth - tagRect.width) / 2,
            y: row * rowHeight + (rowHeight - tagRect.height) / 2
        };
    }
}

export { SkillsCloud }; 