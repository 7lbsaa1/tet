document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 3. وظيفة تبديل الوضع (الليلي والنهاري) وحفظه
    // ==========================================
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = themeToggleBtn.querySelector("i");
    const currentTheme = localStorage.getItem("theme") || "dark";

    // تطبيق الوضع المحفوظ عند التحميل
    if (currentTheme === "light") {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
        themeIcon.className = "fas fa-moon"; 
    } else {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
        themeIcon.className = "fas fa-sun";
    }

    // الاستماع لحدث الضغط على الزر
    themeToggleBtn.addEventListener("click", () => {
        if (document.body.classList.contains("dark-mode")) {
            document.body.classList.remove("dark-mode");
            document.body.classList.add("light-mode");
            themeIcon.className = "fas fa-moon";
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.remove("light-mode");
            document.body.classList.add("dark-mode");
            themeIcon.className = "fas fa-sun";
            localStorage.setItem("theme", "dark");
        }
    });

    // ==========================================
    // 3. أنيميشن العدادات التفاعلية عند نزول الصفحة (Scroll)
    // ==========================================
    const statsCards = document.querySelectorAll('.stat-card');
    
    // دالة لتشغيل عداد الأرقام من 0 للرقم المطلوب
    const startCounter = (counterElement, targetValue) => {
        let startValue = 0;
        const duration = 2000; // مدة الأنميشن بالملي ثانية (ثانيتين)
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
    };

    // استخدام Intersection Observer لمراقبة وصول المستخدم لقسم الإحصائيات
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.classList.add('appear'); // تفعيل أنيميشن الظهور من الأسفل بـ CSS
                
                const counterSpan = card.querySelector('.counter');
                const target = parseInt(card.getAttribute('data-target'), 10);
                
                startCounter(counterSpan, target);
                observer.unobserve(card); // إيقاف المراقبة بعد العمل لمرة واحدة
            }
        });
    }, {
        threshold: 0.2 // يبدأ العمل عند ظهور 20% من الكارت بالشاشة
    });

    statsCards.forEach(card => statsObserver.observe(card));

    // ==========================================
    // تأثيرات تفاعلية إضافية للروابط المفعلة بالـ Navbar
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });
});
