// Toggle between login and signup forms
document.getElementById('loginBtn').addEventListener('click', function () {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('signupForm').classList.remove('active');
    this.classList.add('active');
    document.getElementById('signupBtn').classList.remove('active');
    this.setAttribute('aria-selected', 'true');
    document.getElementById('signupBtn').setAttribute('aria-selected', 'false');
});

document.getElementById('signupBtn').addEventListener('click', function () {
    document.getElementById('signupForm').classList.add('active');
    document.getElementById('loginForm').classList.remove('active');
    this.classList.add('active');
    document.getElementById('loginBtn').classList.remove('active');
    this.setAttribute('aria-selected', 'true');
    document.getElementById('loginBtn').setAttribute('aria-selected', 'false');
});

// Toggle password visibility
function togglePasswordVisibility(element) {
    const input = element.previousElementSibling;
    if (input.type === 'password') {
        input.type = 'text';
        element.textContent = '🙈';
    } else {
        input.type = 'password';
        element.textContent = '👁️';
    }
}

// Check password strength
function checkPasswordStrength(input) {
    const strengthText = document.getElementById('passwordStrength');
    const password = input.value;
    let strength = 'Weak';

    if (password.length >= 8) {
        strength = 'Medium';
        if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
            strength = 'Strong';
        }
    }

    strengthText.textContent = `Strength: ${strength}`;
    strengthText.style.color = strength === 'Strong' ? 'green' : strength === 'Medium' ? 'orange' : 'red';
}

// Switch to login form from footer link
document.getElementById('switchToLogin').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('loginBtn').click();
});

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Client-side login validation
document.querySelector(".login").addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const errorMessage = document.getElementById("errorMessage");

    if (username.value === "cvruhelpdesk2025@gmail.com" && password.value === "admin1") {
        window.location.href = "https://helpdeskah.github.io/CVRU_HELPDESK/";
    } else if (username.value === "amitsingharya12345@gmail.com" && password.value === "admin1") {
        window.location.href = "https://helpdeskah.github.io/CVRU_HELPDESK/";
    } else if (username.value === "rajharsh943140@gmail.com" && password.value === "admin1") {
        window.location.href = "https://helpdeskah.github.io/CVRU_HELPDESK/";
    } else {
        username.style.border = "2px solid red";
        password.style.border = "2px solid red";
        errorMessage.textContent = "Invalid username or password. Please try again.";
        errorMessage.style.display = "block";
    }
});

// Handle form submission with fetch API
document.querySelectorAll('.form').forEach(form => {
    form.addEventListener('submit', async function (e) {
        if (form.id === 'loginForm') return;
        e.preventDefault();

        const spinner = this.querySelector('.loading-spinner');
        spinner.style.display = 'block';

        const formData = new FormData(this);
        const csrfToken = document.querySelector('input[name="csrf_token"]').value;
        const url = this.action;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-Token': csrfToken
                }
            });

            const data = await response.json();
            spinner.style.display = 'none';

            if (data.success) {
                alert(data.message || 'Success! Redirecting...');
                window.location.href = data.redirect || '/dashboard';
            } else {
                alert(data.error || 'Something went wrong.');
            }
        } catch (error) {
            spinner.style.display = 'none';
            alert('Error: ' + error.message);
        }
    });
});

// Handle social login
function socialLogin(provider) {
    if (provider === 'facebook') {
        const appId = 'YOUR_FACEBOOK_APP_ID';
        const redirectUri = encodeURIComponent('https://yoursite.com/auth/facebook/callback');
        const facebookAuthUrl = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=email,public_profile`;
        window.location.href = facebookAuthUrl;
    } else if (provider === 'google') {
        const googleAuthUrl = '/auth/google';
        window.location.href = googleAuthUrl;
    }
}

// Forgot password link
document.getElementById('forgotPassword').addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = '/forgot-password';
});