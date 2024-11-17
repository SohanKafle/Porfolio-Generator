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
                    }
                    .FirstElement {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                        align-items: center;
                        padding-top: 5rem;
                        overflow: hidden;
                    }
                    .profile-photo {
                        width: 300px;
                        height: 300px;
                        border-radius: 50%;
                        overflow: hidden;
                        border: 15px solid #444444;
                        box-shadow: 5px 7px 25px rgba(0, 0, 0, 0.5);
                        margin-bottom: 20px;
                    }
                    .profile-photo img {
                        width: 100%;
                        height: 100%;
                        transition: 0.5s;
                    }
                    .profile-photo img:hover {
                        transform: scale(1.2);
                    }
                    .profile-text {
                        max-width: 750px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                        padding-bottom: 40px;
                    }
                    .profile-text h5 {
                        color: #e5e5e5;
                        font-size: 14px;
                    }
                   .profile-text h1 {
                        color: #fed700;
                        font-size: 2rem; /* Make the text smaller */
                        margin: 10px 0; /* Adjust the margin to reduce space */
                        padding: 0; /* Remove any padding to reduce space */
                    }
                    .profile-text p {
                        color: #e5e5e5;
                        text-align: justify;
                    }
                    .profile-text .social {
                        margin-top: 20px;
                    }
                    .profile-text .social a {
                        color: #e5e5e5;
                        font-size: 18px;
                        margin-right: 10px;
                        transition: 0.5s;
                    }
                    .profile-text .social a:hover {
                        color: #fed700;
                        transform: rotate(360deg);
                    }
                    .btn-group {
                        margin-top: 30px;
                    }
                    .btn {
                        padding: 12px 30px;
                        background-color: #2980b9;
                        color: white;
                        font-size: 18px;
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
                </style>
            </head>
            <body>
                <div class="FirstElement" id="home">
                    <div class="profile-photo">
                        <img src="${imageDataURL}" alt="Profile Picture">
                    </div>
                    <div class="profile-text">
                        <h5>Hi I'm ${name} </h5><br>
                        <h1>${role}</h1><br>
                        <p>${description}</p>

                        <div class="btn-group">
                            <a href="cv/SOHAN KAFLE.pdf" class="btn active">Download CV</a>
                            <a href="mailto:kaflesohan1@gmail.com" class="btn">Contact</a>
                        </div>

                        <div class="social">
                            ${github ? `<a href="${github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                            ${instagram ? `<a href="${instagram}" target="_blank"><i class="fab fa-instagram"></i></a>` : ''}
                            ${twitter ? `<a href="${twitter}" target="_blank"><i class="fab fa-twitter"></i></a>` : ''}
                            ${linkedin ? `<a href="${linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ''}
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `);
    };
    if (image) {
        reader.readAsDataURL(image);
    }
}

// Attach event listener to the form
document.getElementById('portfolioForm').addEventListener('submit', generatePortfolio);
document.getElementById('image').addEventListener('change', previewImage);
