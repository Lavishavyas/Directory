document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    form.addEventListener("submit", (event) => {
        event.preventDefault();  // Always prevent default to control submission

        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        clearErrorMessages();

        let valid = true;

        if (!validateEmail(emailValue)) {
            showError(emailInput, "Please enter a valid email address.");
            valid = false;
        }

        if (passwordValue.length < 6) {
            showError(passwordInput, "Password must be at least 6 characters long.");
            valid = false;
        }

        if (!valid) {
            return; // Don't proceed if validation fails
        }

        // Prepare data to send
        const data = {
            email: emailValue,
            password: passwordValue
        };

        // Adjust URL depending on signup or login page
        const url = form.id === 'signupForm' ? '/signup/' : '/login/';

        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(res => {
            if (res.error) {
                alert(res.error);
            } else {
                alert(res.message || 'Success!');
                // Optionally redirect on success:
                if (url === '/signup/') {
                    window.location.href = '/index3/'; // Redirect to login page after signup
                } else if (url === '/login/') {
                    window.location.href = '/'; // Redirect to homepage after login
                }
            }
        })
        .catch(err => {
            console.error('Request failed', err);
            alert('An error occurred. Please try again.');
        });
    });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function showError(input, message) {
        const error = document.createElement("p");
        error.className = "error-message";
        error.textContent = message;
        input.parentNode.appendChild(error);
        input.style.borderColor = "red";
    }

    function clearErrorMessages() {
        document.querySelectorAll(".error-message").forEach((error) => error.remove());
        emailInput.style.borderColor = "";
        passwordInput.style.borderColor = "";
    }
});
