// Function to validate the form
function validateForm() {
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const description = document.getElementById('description').value;
    const github = document.getElementById('github').value;
    const instagram = document.getElementById('instagram').value;
    const linkedin = document.getElementById('linkedin').value;
    const twitter = document.getElementById('twitter').value;
    const image = document.getElementById('image').files[0];

    if (!name || !role || !description) {
        alert("Please fill out all required fields.");
        return false;
    }

    if (!image) {
        alert("Please upload a profile image.");
        return false;
    }

    const fileType = image.type.split("/")[0];
    if (fileType !== "image") {
        alert("Please upload a valid image file.");
        return false;
    }

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

    return true;
}

// Function to preview image in the form
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

// Function to generate portfolio in a new window
function generatePortfolio(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    if (!validateForm()) return;

    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const description = document.getElementById('description').value;
    const github = document.getElementById('github').value;
    const instagram = document.getElementById('instagram').value;
    const linkedin = document.getElementById('linkedin').value;
    const twitter = document.getElementById('twitter').value;
    const image = document.getElementById('image').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const imageDataURL = e.target.result;
        
        const newWindow = window.open("", "_blank", "width=800,height=600");
        newWindow.document.write(`
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Portfolio Preview</title>
                <style>
                    body {
                        font-family: 'Poppins', sans-serif;
                        margin: 0;
                        padding: 0;
                        background: #f4f7fc;
                        color: #333;
                        text-align: center;
                    }
                    .container {
                        width: 80%;
                        margin: auto;
                        max-width: 1200px;
                    }
                    header {
                        margin-top: 30px;
                    }
                    .profile-image {
                        width: 150px;
                        height: 150px;
                        border-radius: 50%;
                        margin-bottom: 20px;
                    }
                    h2 {
                        font-size: 36px;
                        color: #2c3e50;
                    }
                    .role {
                        font-size: 20px;
                        color: #7f8c8d;
                    }
                    .description {
                        font-size: 18px;
                        color: #34495e;
                        margin-top: 20px;
                        line-height: 1.6;
                    }
                    .social-links {
                        margin-top: 30px;
                    }
                    .social-links a {
                        font-size: 20px;
                        color: #2980b9;
                        margin: 0 15px;
                        text-decoration: none;
                    }
                    .social-links a:hover {
                        color: #3498db;
                    }
                    footer {
                        margin-top: 40px;
                        font-size: 14px;
                        color: #95a5a6;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <header>
                        <img src="${imageDataURL}" alt="Profile Image" class="profile-image">
                        <h2>${name}</h2>
                        <p class="role">${role}</p>
                        <p class="description">${description}</p>
                    </header>
                    <div class="social-links">
                        ${github ? `<a href="${github}" target="_blank"><i class="fab fa-github"></i> GitHub</a>` : ''}
                        ${instagram ? `<a href="${instagram}" target="_blank"><i class="fab fa-instagram"></i> Instagram</a>` : ''}
                        ${linkedin ? `<a href="${linkedin}" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>` : ''}
                        ${twitter ? `<a href="${twitter}" target="_blank"><i class="fab fa-twitter"></i> Twitter</a>` : ''}
                    </div>
                    <footer>
                        <p>&copy; ${new Date().getFullYear()} ${name}. All rights reserved.</p>
                    </footer>
                </div>
            </body>
            </html>
        `);
    };
    if (image) {
        reader.readAsDataURL(image);
    }
}

// Add event listener to form submit
document.getElementById('portfolioForm').addEventListener('submit', generatePortfolio);
