window.onload = function() {
    // Get data from localStorage
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    const description = localStorage.getItem('description');
    const github = localStorage.getItem('github');
    const instagram = localStorage.getItem('instagram');
    const linkedin = localStorage.getItem('linkedin');
    const twitter = localStorage.getItem('twitter');
    const image = localStorage.getItem('image');

    // Set data into preview page
    document.getElementById('previewName').innerText = name;
    document.getElementById('previewRole').innerText = role;
    document.getElementById('previewDescription').innerText = description;

    if (image) {
        const imgElement = document.getElementById('previewImage');
        imgElement.src = image;
        imgElement.style.display = 'block';
    }

    document.getElementById('previewGithub').href = github;
    document.getElementById('previewInstagram').href = instagram;
    document.getElementById('previewLinkedin').href = linkedin;
    document.getElementById('previewTwitter').href = twitter;
}

function generatePortfolio() {
    // Get form values
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const description = document.getElementById('description').value;
    const github = document.getElementById('github').value;
    const instagram = document.getElementById('instagram').value;
    const linkedin = document.getElementById('linkedin').value;
    const twitter = document.getElementById('twitter').value;
    const image = document.getElementById('image').files[0];

    // Save data to localStorage
    localStorage.setItem('name', name);
    localStorage.setItem('role', role);
    localStorage.setItem('description', description);
    localStorage.setItem('github', github);
    localStorage.setItem('instagram', instagram);
    localStorage.setItem('linkedin', linkedin);
    localStorage.setItem('twitter', twitter);

    // Handle image preview
    if (image) {
        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem('image', e.target.result);
        }
        reader.readAsDataURL(image);
    }

    // Redirect to preview page
    window.location.href = 'preview.html';
}

// Function to validate the form
function validateForm() {
    // Get form values
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const description = document.getElementById('description').value;
    const github = document.getElementById('github').value;
    const instagram = document.getElementById('instagram').value;
    const linkedin = document.getElementById('linkedin').value;
    const twitter = document.getElementById('twitter').value;
    const image = document.getElementById('image').files[0];

    // Validate name, role, and description
    if (!name || !role || !description) {
        alert("Please fill out all required fields.");
        return false; // Prevent form submission
    }

    // Validate image
    if (!image) {
        alert("Please upload a profile image.");
        return false; // Prevent form submission
    }

    // Check if the uploaded file is an image
    const fileType = image.type.split("/")[0];
    if (fileType !== "image") {
        alert("Please upload a valid image file.");
        return false; // Prevent form submission
    }

    // Validate URLs (check if the URLs are in a correct format)
    const urlPattern = /^https?:\/\/[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+/;
    if (github && !urlPattern.test(github)) {
        alert("Please enter a valid GitHub URL.");
        return false;
    }
    if (instagram && !urlPattern.test(instagram)) {
        alert("Please enter a valid Instagram URL.");
        return false;
    }
    if (linkedin && !urlPattern.test(linkedin)) {
        alert("Please enter a valid LinkedIn URL.");
        return false;
    }
    if (twitter && !urlPattern.test(twitter)) {
        alert("Please enter a valid Twitter URL.");
        return false;
    }

    // If everything is valid, allow the form to be submitted
    return true;
}

// Function to preview image
function previewImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const preview = document.getElementById('imagePreview');
        preview.src = e.target.result;
        preview.style.display = 'block';
    };
    
    if (file) {
        reader.readAsDataURL(file);
    }
}
