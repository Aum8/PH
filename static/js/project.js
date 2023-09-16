const jsonFileUrl = '/static/js/data.json';

// Function to fetch the JSON data
function fetchProjectData() {

  console.log("displayprojectdata called");
  fetch(jsonFileUrl)
    .then((response) => response.json())
    .then((data) => {
      // Check if the data is an object and not an array
      if (typeof data === 'object') {
        // Call a function to display the project data on the page
        displayProjectData(data);
      } else {
        console.error('Invalid data format. Expected an object.');
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}


function displayProjectData(data) {
  const projectList = document.getElementById('project-list');

  for (const projectKey in data) {
    if (data.hasOwnProperty(projectKey)) {
      const projectData = data[projectKey];
      const projectTemplate = document.getElementById('project-template').cloneNode(true);
      projectTemplate.classList.add('project-item');

      // Clear the imgContainer before adding new images
      const imgContainer = projectTemplate.querySelector('.image-container');
      imgContainer.innerHTML = '';

      // Populate the project template with data
      projectTemplate.style.display = 'block';
      projectTemplate.querySelector('h3').textContent = projectData.projectName;
      projectTemplate.querySelector('p:nth-child(2)').textContent = "Description: " + projectData.projectDescription;
      projectTemplate.querySelector('p:nth-child(3)').textContent = "Tech Stack: " + projectData.projectTechStack;
      projectTemplate.querySelector('p:nth-child(4)').textContent = "Created by: " + projectData.userName;
      projectTemplate.querySelector('p:nth-child(5)').textContent = "Email: " + projectData.userEmail;
      projectTemplate.querySelector('p:nth-child(6)').textContent = "College: " + projectData.collegeName;
      projectTemplate.querySelector('p:nth-child(7)').textContent = "State: " + projectData.state;
      projectTemplate.querySelector('p:nth-child(8)').textContent = "City: " + projectData.city;

      // Check if imgurLinks exists and is an array
      if (Array.isArray(projectData.imgurLinks)) {
        // Create image elements for the Imgur links
        projectData.imgurLinks.forEach((link) => {
          const img = document.createElement('img');
          img.setAttribute('src', link);

          // Set maximum width and height for the images
          img.style.maxWidth = '300px'; // You can adjust the value as needed
          img.style.maxHeight = '200px'; // You can adjust the value as needed

          imgContainer.appendChild(img);
        });
      }

      // Add the populated project template to the project list
      projectList.appendChild(projectTemplate);
    }
  }
}

fetchProjectData()
