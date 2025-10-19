// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initScrollEffects();
    initParticles();
    initProductSlider();
    initNavbar();
});

// 初始化页面动画
function initAnimations() {
    // 英雄区域动画序列
    const timeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    });

    timeline
        .add({
            targets: '#hero-image',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 800
        })
        .add({
            targets: '#hero-title',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000
        }, '-=500')
        .add({
            targets: '#hero-subtitle',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800
        }, '-=600')
        .add({
            targets: '#hero-description',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600
        }, '-=400')
        .add({
            targets: '#hero-buttons',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 500
        }, '-=300');
}

// 初始化滚动效果
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // 时间轴特殊处理
                if (entry.target.classList.contains('timeline-item')) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 800,
                        easing: 'easeOutQuart'
                    });
                }
            }
        });
    }, observerOptions);

    // 观察所有需要滚动动画的元素
    document.querySelectorAll('.scroll-reveal, .timeline-item').forEach(el => {
        observer.observe(el);
    });
}

// 初始化粒子效果
function initParticles() {
    const particleContainer = document.getElementById('particles');
    if (!particleContainer) return;

    // 创建粒子
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }

    // 定期创建新粒子
    setInterval(() => {
        if (Math.random() < 0.3) {
            createParticle(particleContainer);
        }
    }, 1000);
}

// 创建单个粒子
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // 随机位置
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    container.appendChild(particle);

    // 粒子动画
    anime({
        targets: particle,
        translateY: [-20, -100],
        translateX: [0, Math.random() * 40 - 20],
        opacity: [0.6, 0],
        scale: [1, 0.5],
        duration: 3000 + Math.random() * 2000,
        easing: 'easeOutQuart',
        complete: () => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }
    });
}

// 初始化产品轮播
function initProductSlider() {
    const slider = document.getElementById('product-slider');
    if (!slider) return;

    new Splide('#product-slider', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 4000,
        pauseOnHover: true,
        breakpoints: {
            1024: {
                perPage: 2,
            },
            640: {
                perPage: 1,
            }
        }
    }).mount();
}

// 初始化导航栏
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 导航栏背景透明度
        if (scrollTop > 50) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }

        // 隐藏/显示导航栏
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// 平滑滚动到指定元素
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 产品卡片悬停效果增强
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card-hover');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                rotateY: 5,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotateY: 0,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });
});

// 按钮点击效果
document.addEventListener('click', function(e) {
    if (e.target.matches('button') || e.target.closest('button')) {
        const button = e.target.matches('button') ? e.target : e.target.closest('button');
        
        // 创建波纹效果
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        anime({
            targets: ripple,
            scale: [0, 2],
            opacity: [0.3, 0],
            duration: 600,
            easing: 'easeOutQuart',
            complete: () => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }
        });
    }
});

// 移动端菜单切换
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// 表单验证（联系页面使用）
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });

    return isValid;
}

// 显示通知消息
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 页面性能优化：图片懒加载
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
    // 可以在这里添加错误上报逻辑
});

// 页面卸载时的清理工作
window.addEventListener('beforeunload', function() {
    // 清理定时器、事件监听器等
    // 这里可以添加清理代码
});

// 导出一些函数供其他脚本使用
window.FanGongJiu = {
    scrollToElement,
    showNotification,
    validateForm,
    toggleMobileMenu
};