document.addEventListener('DOMContentLoaded', () => {
    // ... (all your existing code for sidebar, API, etc.)

    // --- Initialize Tabs on Specific Pages ---
    const mockInterviewPage = document.querySelector('#mock-interview');
    const companyInsightsPage = document.querySelector('#company-insights');
    const profilePage = document.querySelector('#profile'); // Add this line

    if (mockInterviewPage) {
        setupTabs(mockInterviewPage);
    }
    if (companyInsightsPage) {
        setupTabs(companyInsightsPage);
    }
    if (profilePage) { // Add this block
        setupTabs(profilePage);
    }
});