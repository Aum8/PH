document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const forgotPasswordForm = document.getElementById("forgot-password-form");

    const showForm = (form) => {
        loginForm.classList.add("hidden");
        forgotPasswordForm.classList.add("hidden");
        form.classList.remove("hidden");
    };

    // Simulated form submissions (no actual backend logic)
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        // Simulated login logic
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        // Assuming data.json contains an array of user objects with username and password fields
        fetch("/static/js/user.json") // Adjust the path as needed
            .then((response) => response.json())
            .then((data) => {
                const user = data.find((user) => user.username === username && user.password === password);
                if (user) {
                    alert("Login successful");
                    window.location.href = "/home";
                } else {
                    alert("Invalid username or password");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    });

    forgotPasswordForm.addEventListener("submit", function (e) {
        e.preventDefault();
        // Simulated forgot password logic
        alert("Email sent for reset password");
    });
});
