// File: script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Sidebar Active Link Logic ---
    // Get the current page's filename (e.g., "index.html", "progress-scores.html")
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Get all the links in the sidebar
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');

    // Loop through each link
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // If the link's href matches the current page, add the 'active' class
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});