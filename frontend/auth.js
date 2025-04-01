document.addEventListener("DOMContentLoaded", function() {
// Login
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Login Response", data)

        if(data.token){
            localStorage.setItem("authtoken", data.token)
            console.log("Token Stored", data.token)
            alert("Login successful!")
            window.location.href="profile.html";
        } else {
            alert("Login failed! Check credentials.")
        }
    })
});

// Register
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (res.ok) {
        alert('Registration successful, please check your email for verification.');
        window.location.href = 'login.html';
    } else {
        alert(data.msg);
    }
})})
