// Toggle between login and signup forms
document.getElementById('loginBtn').addEventListener('click', function() { // Login button click
    document.getElementById('loginForm').classList.add('active'); // Show login form
    document.getElementById('signupForm').classList.remove('active'); // Hide signup form
    this.classList.add('active'); // Mark login button active
    document.getElementById('signupBtn').classList.remove('active'); // Unmark signup button
    this.setAttribute('aria-selected', 'true'); // Update ARIA
    document.getElementById('signupBtn').setAttribute('aria-selected', 'false'); // Update ARIA
});

document.getElementById('signupBtn').addEventListener('click', function() { // Signup button click
    document.getElementById('signupForm').classList.add('active'); // Show signup form
    document.getElementById('loginForm').classList.remove('active'); // Hide login form
    this.classList.add('active'); // Mark signup button active
    document.getElementById('loginBtn').classList.remove('active'); // Unmark login button
    this.setAttribute('aria-selected', 'true'); // Update ARIA
    document.getElementById('loginBtn').setAttribute('aria-selected', 'false'); // Update ARIA
});

// Toggle password visibility
function togglePasswordVisibility(element) { // Toggle password visibility
    const input = element.previousElementSibling; // Get password input
    if (input.type === 'password') { // If password is hidden
        input.type = 'text'; // Show password
        element.textContent = '🙈'; // Change icon
    } else { // If password is visible
        input.type = 'password'; // Hide password
        element.textContent = '👁️'; // Change icon
    }
}

// Check password strength
function checkPasswordStrength(input) { // Check password strength
    const strengthText = document.getElementById('passwordStrength'); // Get strength display
    const password = input.value; // Get password value
    let strength = 'Weak'; // Default strength
    if (password.length >= 8) { // Check length
        strength = 'Medium'; // Upgrade to medium
        if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) { // Check complexity
            strength = 'Strong'; // Upgrade to strong
        }
    }
    strengthText.textContent = `Strength: ${strength}`; // Update text
    strengthText.style.color = strength === 'Strong' ? 'green' : strength === 'Medium' ? 'orange' : 'red'; // Update color
}

// Switch to login form from footer link
document.getElementById('switchToLogin').addEventListener('click', function(e) { // Switch to login
    e.preventDefault(); // Prevent default
    document.getElementById('loginBtn').click(); // Trigger login button
});

// Toggle dark mode
function toggleDarkMode() { // Toggle dark mode
    document.body.classList.toggle('dark-mode'); // Toggle class
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode')); // Save preference
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') { // Check saved preference
    document.body.classList.add('dark-mode'); // Apply dark mode
}

// Integrated snippet: Client-side login validation with Facebook redirect
document.querySelector(".login").onclick = (e) => { // Add click event to login button
    e.preventDefault(); // Prevent default form submission
    const username = document.getElementById("username"); // Get username (email) input
    const password = document.getElementById("password"); // Get password input
    if (username.value === "rajharsh943140@gmail.com" && password.value === "admin1") { // Check credentials
        window.location.href = "https://helpdeskah.github.io/CVRU_HELPDESK/"; // Redirect to Facebook (replace with your specific Facebook page URL)
    } else { // If invalid
        username.style.border = "2px solid red"; // Highlight username field
        password.style.border = "2px solid red"; // Highlight password field
    }
};

// Handle form submission with fetch API (for signup or if backend is used)
document.querySelectorAll('.form').forEach(form => { // Loop through forms
    form.addEventListener('submit', async function(e) { // Add submit listener
        // Skip fetch for login form since we're using client-side validation
        if (form.id === 'loginForm') return; // Skip login form submission to backend
        e.preventDefault(); // Prevent default submission
        const spinner = this.querySelector('.loading-spinner'); // Get spinner
        spinner.style.display = 'block'; // Show spinner

        const formData = new FormData(this); // Collect form data
        const url = this.action; // Get form action URL

        try { // Try submitting form
            const response = await fetch(url, { // Send POST request
                method: 'POST', // HTTP method
                body: formData, // Form data
                headers: { 'X-Requested-With': 'XMLHttpRequest' } // AJAX header
            });

            const data = await response.json(); // Parse JSON response
            spinner.style.display = 'none'; // Hide spinner

            if (data.success) { // If successful
                alert(data.message || 'Success! Redirecting...'); // Show success message
                window.location.href = data.redirect || '/dashboard'; // Redirect to dashboard or custom URL
            } else { // If failed
                alert(data.error || 'Something went wrong.'); // Show error
            }
        } catch (error) { // Catch errors
            spinner.style.display = 'none'; // Hide spinner
            alert('Error: ' + error.message); // Show error message
        }
    });
});

// Handle social login with Facebook OAuth
function socialLogin(provider) { // Social login function
    if (provider === 'facebook') { // Check if provider is Facebook
        const appId = 'YOUR_FACEBOOK_APP_ID'; // Replace with your Facebook App ID
        const redirectUri = encodeURIComponent('https://yoursite.com/auth/facebook/callback'); // Replace with your redirect URI
        const facebookAuthUrl = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=email,public_profile`;
        window.location.href = facebookAuthUrl; // Redirect to Facebook OAuth dialog
    } else if (provider === 'google') { // Placeholder for Google login
        alert('Logging in with Google...'); // Placeholder alert
        // Replace with your Google OAuth redirect, e.g.:
        // window.location.href = `/auth/google`;
    }
}

// Forgot password link
document.getElementById('forgotPassword').addEventListener('click', function(e) { // Forgot password click
    e.preventDefault(); // Prevent default
    window.location.href = '/forgot-password'; // Redirect to your site’s forgot password page
});