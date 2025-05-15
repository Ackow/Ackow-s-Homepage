const API_URL = 'https://ackow-s-server.onrender.com/messages';
const AVATAR_COUNT = 5;

// 根据头像编号生成头像路径
function getAvatarPath(index) {
    return `/assets/images/avatars/${index}.png`;
}

// 创建留言项元素
function createMessageItem(msg) {
    const li = document.createElement('li');
    li.classList.add('message-item');

    const avatarImg = document.createElement('img');
    avatarImg.src = getAvatarPath(msg.avatarIndex);
    avatarImg.alt = 'avatar';
    avatarImg.classList.add('message-avatar');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');

    const textSpan = document.createElement('span');
    textSpan.textContent = msg.message;
    textSpan.classList.add('message-text');

    const metaDiv = document.createElement('div');
    metaDiv.classList.add('message-meta');
    
    const timeSpan = document.createElement('span');
    timeSpan.classList.add('message-time');
    const date = new Date(msg.createdAt);
    timeSpan.textContent = date.toLocaleString();
    
    metaDiv.appendChild(timeSpan);
    
    if(!msg.location) {
        msg.location = '未知';
    }

    if (msg.location) {
        const locationSpan = document.createElement('span');
        locationSpan.classList.add('message-location');
        locationSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" 
        width="12" height="12" fill="#888" viewBox="0 0 16 16" style="margin-right: 4px; vertical-align: middle;">
        <path d="M8 0a5.53 5.53 0 0 0-5.5 5.5c0 3.5 5.5 10.5 5.5 10.5s5.5-7 5.5-10.5A5.53 5.53 0 0 0 8 0zm0 8a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
    </svg>${msg.location}`;
        metaDiv.appendChild(locationSpan);
    }
    
    contentDiv.appendChild(textSpan);   // 留言内容
    contentDiv.appendChild(metaDiv);   // 时间 + 定位信息
    

    li.appendChild(avatarImg);
    li.appendChild(contentDiv);

    return li;
}

async function setupContact() {
    console.log('Contact module initialization started');

    const messageInput = document.querySelector('.message-input-area');
    const sendButton = document.querySelector('.send-button');
    const messageList = document.querySelector('.message-list-ul');
    const emojiButton = document.querySelector('.emoji-button');
    const emojiPicker = document.querySelector('.emoji-picker');

    if (!messageInput || !sendButton || !messageList || !emojiButton || !emojiPicker) {
        console.error('One or more elements not found');
        return;
    }

    // emoji 选择功能
    emojiButton.addEventListener('click', event => {
        event.stopPropagation();
        emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
    });

    emojiPicker.addEventListener('click', event => {
        const target = event.target;
        if (target && target.tagName === 'SPAN') {
            messageInput.value += target.textContent;
            emojiPicker.style.display = 'none';
        }
    });

    document.addEventListener('click', event => {
        if (!emojiButton.contains(event.target) && !emojiPicker.contains(event.target)) {
            emojiPicker.style.display = 'none';
        }
    });

    // 获取留言列表
    try {
        const response = await fetch(API_URL);
        const messages = await response.json();
        messages.forEach(msg => {
            const newLi = createMessageItem(msg);
            messageList.appendChild(newLi);
        });
    } catch (error) {
        console.error('获取留言列表失败:', error);
    }

    // 提交留言
    sendButton.addEventListener('click', async () => {
        const message = messageInput.value.trim();
        if (message) {
            const avatarIndex = Math.floor(Math.random() * AVATAR_COUNT) + 1;
            messageInput.value = '';

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message, avatarIndex })
                });

                const newMessage = await response.json();
                const newLi = createMessageItem(newMessage);
                messageList.appendChild(newLi);
            } catch (error) {
                console.error('发送留言失败:', error);
            }
        }
    });

    messageInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendButton.click();
        }
    });
}

export function initContact() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupContact);
    } else {
        setupContact();
    }
}
