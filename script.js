document.addEventListener("DOMContentLoaded", () => {
    
    // 1. نظام تبديل الوضع (الليلي والنهاري) وتخزينه
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = themeToggleBtn.querySelector("i");
    const currentTheme = localStorage.getItem("theme") || "dark";

    if (currentTheme === "light") {
        document.body.classList.replace("dark-mode", "light-mode");
        themeIcon.className = "fas fa-moon"; 
    }

    themeToggleBtn.addEventListener("click", () => {
        if (document.body.classList.contains("dark-mode")) {
            document.body.classList.replace("dark-mode", "light-mode");
            themeIcon.className = "fas fa-moon";
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.replace("light-mode", "dark-mode");
            themeIcon.className = "fas fa-sun";
            localStorage.setItem("theme", "dark");
        }
    });

    // 2. أنيميشن ظهور العناصر اللطيف عند نزول الصفحة (Scroll Reveal)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // إذا كان العنصر يحتوي على عداد أرقام، نقوم بتشغيله
                if (entry.target.classList.contains('stat-card')) {
                    const counterSpan = entry.target.querySelector('.counter');
                    const target = parseInt(entry.target.getAttribute('data-target'), 10);
                    startCounter(counterSpan, target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(element => revealOnScrollObserver.observe(element));

    // دالة تشغيل العدادات التصاعدية الرقمية
    function startCounter(counterElement, targetValue) {
        let startValue = 0;
        const duration = 2000;
        const stepTime = Math.max(Math.floor(duration / targetValue), 15);
        
        const timer = setInterval(() => {
            startValue += Math.ceil(targetValue / (duration / stepTime));
            if (startValue >= targetValue) {
                counterElement.innerText = targetValue;
                clearInterval(timer);
            } else {
                counterElement.innerText = startValue;
            }
        }, stepTime);
    }

    // 3. فلترة وتصفية الكورسات في نفس الصفحة
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            const cards = document.querySelectorAll('.course-card');

            cards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
