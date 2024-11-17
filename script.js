// Function to validate the form
function validateForm() {
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const description = document.getElementById('description').value;
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
    const github = document.getElementById('github').value;
    const instagram = document.getElementById('instagram').value;
    const linkedin = document.getElementById('linkedin').value;
    const twitter = document.getElementById('twitter').value;

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
    reader.onload = function (e) {
        const preview = document.getElementById('imagePreview');
        preview.src = e.target.result;
        preview.style.display = 'block';
    };
    if (file) {
        reader.readAsDataURL(file);
    }
}

// Function to generate portfolio preview in a new tab
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
    reader.onload = function (e) {
        const imageDataURL = e.target.result;

        // Open a new tab for the portfolio preview
        const newTab = window.open("", "_blank");

        newTab.document.write(`
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Portfolio Preview</title>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
                <style>
                    body {
                        margin: 0;
                        font-family: 'Poppins', sans-serif;
                        background-color: #f9f9f9;
                        transition: background-color 0.3s, color 0.3s;
                    }
                    .FirstElement {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                        align-items: center;
                        padding-top: 5rem;
                    }
                    .profile-photo {
                        width: 300px;
                        height: 300px;
                        border-radius: 50%;
                        overflow: hidden;
                        border: 15px solid #444444;
                        box-shadow: 5px 7px 25px rgba(0, 0, 0, 0.5);
                        margin-right: 30px;
                        margin-top: 20px;
                    }
                    .profile-photo img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        transition: 0.5s;
                    }
                    .profile-text {
                        max-width: 600px;
                        text-align: left;
                        margin-top: 20px;
                    }
                    .profile-text h5 {
                        color: #000000;
                        font-size: 14px;
                    }
                    .profile-text h5 span {
                        color: #3498db;
                    }
                    .profile-text h1 {
                        color: #fed700;
                        font-size: 2rem;
                    }
                    .profile-text p {
                        color: #000000;
                        text-align: justify;
                    }
                    .social {
                        margin-top: 20px;
                    }
                    .social a {
                        color: #000000;
                        font-size: 18px;
                        margin-right: 15px;
                        transition: 0.5s;
                    }
                    .social a:hover {
                        color: #fed700;
                        transform: scale(1.2);
                    }
                    .btn-group {
                        margin-top: 30px;
                    }
                    .btn-group a {
                        text-decoration: none;
                    }
                    .btn {
                        padding: 10px 20px;
                        background-color: #2980b9;
                        color: white;
                        border: none;
                        border-radius: 50px;
                        cursor: pointer;
                        text-transform: uppercase;
                        transition: all 0.3s;
                    }
                    .btn:hover {
                        background-color: #3498db;
                        transform: scale(1.1);
                    }
                      /* Footer Styles */
                    footer {
                        color: black;
                        text-align: center;
                        padding: 20px;
                        position: fixed;
                        width: 100%;
                        bottom: 0;
                    }
                    /* Dark Mode Styles */
                    body.dark-mode {
                        background-color: #121212;
                        color: white;
                    }
                    .theme-toggle {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        z-index: 1000;
                    }
                    .theme-toggle input[type="checkbox"] {
                        display: none;
                    }
                    .theme-toggle label {
                        width: 50px;
                        height: 25px;
                        background-color: #ccc;
                        border-radius: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        cursor: pointer;
                        padding: 5px;
                        transition: background-color 0.3s;
                    }
                    .theme-toggle label::before {
                        content: "";
                        width: 18px;
                        height: 18px;
                        background-color: white;
                        border-radius: 50%;
                        transition: transform 0.3s;
                    }
                    .theme-toggle input[type="checkbox"]:checked + label {
                        background-color: #3498db;
                    }
                    .theme-toggle input[type="checkbox"]:checked + label::before {
                        transform: translateX(25px);
                    }
                    /* Text Colors for Dark Mode */
                    .dark-mode .profile-text h5,  
                    .dark-mode .profile-text p {
                        color: white;
                    }
                    .dark-mode .social a {
                        color: white;
                    }
                    .dark-mode .social a:hover {
                        color: #fed700;
                        transform: scale(1.2);
                    }
                    .dark-mode .btn {
                        background-color: #3498db;
                    }
                    .dark-mode .btn:hover {
                        background-color: #2980b9;
                    }
                    .dark-mode footer {
                        color: white;       
                    }
                </style>
            </head>
            <body>
                <div class="theme-toggle">
                    <input type="checkbox" id="toggle-dark-mode" />
                    <label for="toggle-dark-mode">
                        <span id="sun-icon">☀️</span>
                        <span id="moon-icon" style="opacity: 0;">🌙</span>
                    </label>
                </div>
                <div class="FirstElement">
                    <div class="profile-photo">
                        <img src="${imageDataURL}" alt="Profile Picture">
                    </div>
                    <div class="profile-text">
                        <h5>Hi I'm <span>${name}</span></h5>
                        <h1>${role}</h1>
                        <p>${description}</p>
                        <div class="btn-group">
                            <a href="" class="btn">Download</a>
                            <a href="#" class="btn">Contact</a>
                        </div>
                        <div class="social">
                            ${github ? `<a href="${github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                            ${instagram ? `<a href="${instagram}" target="_blank"><i class="fab fa-instagram"></i></a>` : ''}
                            ${linkedin ? `<a href="${linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ''}
                            ${twitter ? `<a href="${twitter}" target="_blank"><i class="fab fa-twitter"></i></a>` : ''}
                        </div>
                    </div>
                </div>
                 <!-- Footer Section -->
                <footer>
                    <p>&copy; 2024 ${name}. All rights reserved. <br>Thanks for visiting ❤️</p>
                </footer>
                <script>
                    const toggle = document.getElementById('toggle-dark-mode');
                    const sunIcon = document.getElementById('sun-icon');
                    const moonIcon = document.getElementById('moon-icon');
                    
                    toggle.addEventListener('change', () => {
                        document.body.classList.toggle('dark-mode');
                        sunIcon.style.opacity = document.body.classList.contains('dark-mode') ? 0 : 1;
                        moonIcon.style.opacity = document.body.classList.contains('dark-mode') ? 1 : 0;
                    });
                </script>
            </body>
            </html>
        `);
    };

    if (image) {
        reader.readAsDataURL(image);
    }
}


// Event listener for the form submission
document.getElementById('portfolioForm').addEventListener('submit', generatePortfolio);

// Event listener for the image preview
document.getElementById('image').addEventListener('change', previewImage);
