document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");

    const showForm = (form) => {
        loginForm.classList.add("hidden");
        signupForm.classList.add("hidden");
        forgotPasswordForm.classList.add("hidden");
        form.classList.remove("hidden");
    };

    // document.getElementById("show-signup").addEventListener("click", function (e) {
    //     e.preventDefault();
    //     showForm(signupForm);
    // });

    // document.getElementById("show-login").addEventListener("click", function (e) {
    //     e.preventDefault();
    //     showForm(loginForm);
    // });

    // document.getElementById("show-forgot-password").addEventListener("click", function (e) {
    //     e.preventDefault();
    //     showForm(forgotPasswordForm);
    // });


    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        // Simulated signup logic

        // Get form data
        const username = document.getElementById("signup-username").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("Password").value;

        // Create an object to represent the form data
        const formData = {
            username: username,
            email: email,
            password: password
        };

        // Send the form data to the server for saving
        saveFormData(formData);
    });

    // forgotPasswordForm.addEventListener("submit", function (e) {
    //     e.preventDefault();
    //     // Simulated forgot password logic
    //     alert("Simulated forgot password submitted");
    // });

    // Function to send form data to the server for saving
    function saveFormData(formData) {
        const csrfToken = document.querySelector('#signup-form [name=csrfmiddlewaretoken]').value;
        // Make an AJAX (Fetch API) POST request to your server
        fetch("/save_account_data/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server, if needed
                console.log(data);
                alert("Form data saved on the server.");
            })
            .catch(error => {
            });
    }
});
