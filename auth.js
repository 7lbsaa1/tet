// دالة إظهار وإخفاء كلمة المرور
function togglePasswordVisibility(id, icon) {
    const input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. منطق صفحة تسجيل الدخول (Login)
    // ==========================================
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const user = document.getElementById("loginUser").value.trim();
            const pass = document.getElementById("loginPassword").value.trim();
            const rememberMe = document.getElementById("rememberMe").checked;
            
            let isValid = true;

            if (user.length < 3) {
                document.getElementById("loginUserError").style.display = "block";
                isValid = false;
            } else {
                document.getElementById("loginUserError").style.display = "none";
            }

            if (pass.length === 0) {
                document.getElementById("loginPasswordError").style.display = "block";
                isValid = false;
            } else {
                document.getElementById("loginPasswordError").style.display = "none";
            }

            if (isValid) {
                // محاكاة حفظ الجلسات بناءً على اختيار تذكرني
                if (rememberMe) {
                    localStorage.setItem("userSession", user);
                } else {
                    sessionStorage.setItem("userSession", user);
                }
                alert("تم تسجيل الدخول بنجاح! جاري تحويلك لصفحة الكورسات...");
                window.location.href = "courses.html";
            }
        });

        // تشغيل النافذة المنبثقة لنسيان كلمة المرور
        const modal = document.getElementById("forgotModal");
        const forgotLink = document.getElementById("forgotPasswordLink");
        const closeBtn = document.querySelector(".close-btn");
        const sendResetBtn = document.getElementById("sendResetBtn");

        forgotLink.onclick = () => modal.style.display = "flex";
        closeBtn.onclick = () => modal.style.display = "none";
        window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

        sendResetBtn.onclick = () => {
            const email = document.getElementById("resetEmail").value;
            if (!email.includes("@")) {
                document.getElementById("resetEmailError").style.display = "block";
            } else {
                document.getElementById("resetEmailError").style.display = "none";
                alert("تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح.");
                modal.style.display = "none";
            }
        };
    }

    // ==========================================
    // 2. منطق صفحة إنشاء الحساب (Register)
    // ==========================================
    const registerForm = document.getElementById("registerForm");
    const regPassword = document.getElementById("regPassword");
    
    if (regPassword) {
        // فحص قوة كلمة المرور أثناء الكتابة
        regPassword.addEventListener("input", () => {
            const val = regPassword.value;
            const bar = document.getElementById("strengthBar");
            const strengthWrapper = document.getElementById("passwordStrengthID");
            
            strengthWrapper.style.display = "block";
            let strength = 0;
            if (val.length >= 6) strength += 30;
            if (/[A-Z]/.test(val) || /[0-9]/.test(val)) strength += 40;
            if (/[A-Za-z0-9]/.test(val) && val.length >= 10) strength += 30;

            bar.style.width = strength + "%";
            if (strength <= 30) bar.style.backgroundColor = "#ff4d4d"; // ضعيفة
            else if (strength <= 70) bar.style.backgroundColor = "#ffaa00"; // متوسطة
            else bar.style.backgroundColor = "#00cc66"; // قوية
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const name = document.getElementById("regName").value.trim();
            const email = document.getElementById("regEmail").value.trim();
            const pass = regPassword.value;
            const confirmPass = document.getElementById("regConfirmPassword").value;
            const terms = document.getElementById("regTerms").checked;

            let isValid = true;

            if (name.split(" ").length < 3) {
                document.getElementById("regNameError").style.display = "block";
                isValid = false;
            } else { document.getElementById("regNameError").style.display = "none"; }

            if (!email.includes("@") || email.length < 5) {
                document.getElementById("regEmailError").style.display = "block";
                isValid = false;
            } else { document.getElementById("regEmailError").style.display = "none"; }

            if (pass.length < 8) {
                document.getElementById("regPasswordError").style.display = "block";
                isValid = false;
            } else { document.getElementById("regPasswordError").style.display = "none"; }

            if (pass !== confirmPass) {
                document.getElementById("regConfirmPasswordError").style.display = "block";
                isValid = false;
            } else { document.getElementById("regConfirmPasswordError").style.display = "none"; }

            if (!terms) {
                document.getElementById("regTermsError").style.display = "block";
                isValid = false;
            } else { document.getElementById("regTermsError").style.display = "none"; }

            if (isValid) {
                alert("تم إنشاء الحساب بنجاح! مرحباً بك في عائلة كيمياء القمة.");
                window.location.href = "login.html";
            }
        });
    }
});auth.js
