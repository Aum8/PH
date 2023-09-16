document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const uploadedImages = document.getElementById("uploadedImages");
    const imgurLinks = []; // Array to store Imgur links
    var formDataString = "";

    fileInput.addEventListener("change", (ev) => {
        const files = ev.target.files;

        Array.from(files).forEach((file) => {
            const formdata = new FormData();
            formdata.append("image", file);

            fetch("https://api.imgur.com/3/image", {
                method: "POST",
                headers: {
                    Authorization: "Client-ID 2e98c44c57dcaf7",
                },
                body: formdata,
            })
                .then((response) => response.json())
                .then((data) => {
                    const imgurLink = data.data.link;
                    imgurLinks.push(imgurLink); // Push the link to the array

                    const imgElement = document.createElement("img");
                    imgElement.src = imgurLink;
                    imgElement.alt = data.data.id;
                    imgElement.style.maxHeight = "200px";

                    uploadedImages.appendChild(imgElement);
                })
                .catch((error) => {
                    console.error("Error uploading image:", error);
                });
        });
    });

    // Function to save form data to a string with newline characters
    function saveFormData() {
        const projectName = document.getElementById("projectName").value;
        const projectDescription = document.getElementById("projectDescription").value;
        const projectTechStack = document.getElementById("projectTechStack").value;
        const userName = document.getElementById("userName").value;
        const userEmail = document.getElementById("userEmail").value;
        const collegeName = document.getElementById("collegeName").value;
        const state = document.getElementById("state").value;
        const city = document.getElementById("city").value;

        // Combine form values into a single string with newline characters
        formDataString =
            `${projectName}\n` +
            `${projectDescription}\n` +
            `${projectTechStack}\n` +
            `${userName}\n` +
            `${userEmail}\n` +
            `${collegeName}\n` +
            `${state}\n` +
            `${city}\n`;

        console.log("imgurLinks:", imgurLinks);
        // Append image links
        imgurLinks.forEach((link) => {
            formDataString += `${link}\n`;



        });
        const imgurLinksInput = document.getElementById("imgurLinks");
        imgurLinksInput.value = imgurLinks.join("\n"); // Set the imgurLinks array as the value

        // Debugging: Log the value of imgurLinksInput
        console.log("imgurLinksInput:", imgurLinksInput.value);
        // Display the form data string
        console.log(formDataString);
        // Extract the CSRF token value from the form
        const csrfToken = document.querySelector('#projectForm [name=csrfmiddlewaretoken]').value;


        // Example of more explicit error handling
        fetch("/save_form_data/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify({
                projectName: projectName,
                projectDescription: projectDescription,
                projectTechStack: projectTechStack,
                userName: userName,
                userEmail: userEmail,
                collegeName: collegeName,
                state: state,
                city: city,
                imgurLinks: imgurLinks
            }),
        })
        .then((response) => response.json()) // Parse the JSON response
        .then((data) => {
            console.log("Server response:", data);

            // Check if plagiarism was detected based on the server response
            if ('plagiarized_indices' in data && data['plagiarized_indices'].length > 0) {
                // Display an alert message for plagiarism detection
                alert('Potential plagiarism detected in projects: ' + data['plagiarized_indices'].join(', '));
            } else {
                // Display a success message when no plagiarism is detected
                alert('Form data saved successfully.');
            }
        })
        .catch((error) => {
            console.error("Error while sending form data:", error);
            alert('Form data saved successfully.');
        });
    }
    // Add a click event listener to the "Submit Project" button
    const submitButton = document.querySelector("button[type='submit']");
    submitButton.addEventListener("click", saveFormData);
});
