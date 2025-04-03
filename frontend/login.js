// login.js

// Function to handle form submission
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("⚠️ Please fill in both fields!");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Save token to localStorage
            localStorage.setItem('token', data.token);

            // Redirect to home page after successful login
            window.location.href = 'home.html';
        } else {
            alert(`❌ Login failed: ${data?.msg || 'Unknown error'}`);
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert('⚠️ An error occurred while logging in.');
    }
});
