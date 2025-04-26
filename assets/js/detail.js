// 作品内容模板
const workContentTemplate = (content) => `
    <h2>${content.title}</h2>
    ${content.images ? content.images.map(img => `
        <img src="${img.src}" alt="${img.alt || ''}">
    `).join('') : ''}
    ${content.paragraphs ? content.paragraphs.map(p => `
        <p>${p}</p>
    `).join('') : ''}
`;

// 从 URL 参数获取作品 ID
const getWorkId = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
};

// 加载作品数据
const loadWorkData = async (id) => {
    try {
        // 这里应该从您的数据源加载作品数据
        // 示例数据
        const workData = {
            title: '示例作品',
            subtitle: '这是一个示例作品',
            cover: '../assets/images/works/example.jpg',
            content: {
                title: '作品详细介绍',
                images: [
                    {
                        src: '../assets/images/works/example1.jpg',
                        alt: '示例图片1'
                    },
                    {
                        src: '../assets/images/works/example2.jpg',
                        alt: '示例图片2'
                    }
                ],
                paragraphs: [
                    '这是第一段文字内容。',
                    '这是第二段文字内容。',
                    '这是第三段文字内容。'
                ]
            }
        };

        // 更新页面内容
        document.getElementById('work-title').textContent = workData.title;
        document.getElementById('work-subtitle').textContent = workData.subtitle;
        document.getElementById('work-cover-image').src = workData.cover;
        document.querySelector('.work-body').innerHTML = workContentTemplate(workData.content);
    } catch (error) {
        console.error('加载作品数据失败:', error);
        document.querySelector('.work-body').innerHTML = '<p>加载作品内容失败，请稍后重试。</p>';
    }
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    const workId = getWorkId();
    if (workId) {
        loadWorkData(workId);
    } else {
        document.querySelector('.work-body').innerHTML = '<p>未找到作品信息。</p>';
    }
}); 