document.addEventListener('DOMContentLoaded', () => {
    // --- Sidebar Active Link Logic ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // --- Tab Switching Logic (for pages that have tabs) ---
    function setupTabs(tabContainer) {
        const tabNavLinks = tabContainer.querySelectorAll('.tabs-nav a');
        const tabPanes = tabContainer.querySelectorAll('.tab-pane');

        if (!tabNavLinks.length) return;

        tabNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                tabNavLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
                tabPanes.forEach(pane => {
                    pane.classList.toggle('active', pane.id === targetId);
                });
            });
        });
    }

    const tabContainer = document.querySelector('.tab-container');
    if (tabContainer) {
        setupTabs(tabContainer);
    }
});