// Generate Portfolio Files and Zip them
function generatePortfolio() {
    // Collecting form data
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const description = document.getElementById('description').value;
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;

    // Generating HTML content
    const portfolioHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${name}'s Portfolio</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div class="portfolio-display">
            <h1>${name}</h1>
            <h2>${role}</h2>
            <p>${description}</p>
            <a href="${linkedin}" target="_blank">LinkedIn</a> | 
            <a href="${github}" target="_blank">GitHub</a>
        </div>
    </body>
    </html>`;

    // Generating CSS content
    const portfolioCSS = `
    /* Basic Reset */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Arial', sans-serif;
    }

    /* Portfolio Page */
    .portfolio-display {
        max-width: 800px;
        margin: 40px auto;
        padding: 20px;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }

    h1, h2 {
        color: #333;
    }

    a {
        color: #007bff;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }`;

    // Creating a ZIP file
    const zip = new JSZip();
    zip.file("index.html", portfolioHTML);
    zip.file("style.css", portfolioCSS);

    // Generating the ZIP and allowing the user to download it
    zip.generateAsync({type: "blob"}).then(function(content) {
        saveAs(content, "portfolio.zip");
    });
}
