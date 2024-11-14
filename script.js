document.addEventListener('DOMContentLoaded', () => {
    const previewName = document.getElementById('previewName');
    const previewRole = document.getElementById('previewRole');

    // Example dynamic typing effect
    const roles = ['Web Developer', 'Next.js Developer', 'UI/UX Designer', 'Freelancer'];
    let roleIndex = 0;
    let charIndex = 0;

    function typeRole() {
        if (charIndex < roles[roleIndex].length) {
            previewRole.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeRole, 100);
        } else {
            setTimeout(eraseRole, 2000);
        }
    }

    function eraseRole() {
        if (charIndex > 0) {
            previewRole.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseRole, 100);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 500);
        }
    }

    typeRole();
});
