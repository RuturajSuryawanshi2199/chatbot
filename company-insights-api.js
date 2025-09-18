// File: company-insights-api.js
document.addEventListener('DOMContentLoaded', () => {
    // --- References to HTML Elements ---
    const searchView = document.getElementById('search-view');
    const insightsView = document.getElementById('insights-view');
    const insightsContent = document.getElementById('company-insights-content');
    const backToSearchBtn = document.getElementById('back-to-search-btn');
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    // --- Event Listeners ---
    searchBtn?.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            getCompanyInsights(query);
        }
    });
    
    searchInput?.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchBtn.click();
        }
    });

    backToSearchBtn?.addEventListener('click', () => {
        insightsView.classList.add('hidden');
        searchView.classList.remove('hidden');
        searchInput.value = '';
    });
    
    async function getCompanyInsights(companyName) {
        // Switch to the insights view and show a loading message
        searchView.classList.add('hidden');
        insightsView.classList.remove('hidden');
        insightsContent.innerHTML = '<p>🤖 Asking our AI for the latest insights... this may take a moment.</p>';
        
        try {
            // Call our OWN backend server (running on localhost:3000)
            const response = await fetch(`http://localhost:3000/api/company-insights/${encodeURIComponent(companyName)}`);            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            const insights = await response.json();
            renderCompanyInsights(companyName, insights);
        } catch (error) {
            insightsContent.innerHTML = '<p>Sorry, we could not fetch AI-powered insights. Please check if the server is running and try again.</p>';
            console.error(error);
        }
    }

    function renderCompanyInsights(companyName, insights) {
        const trendsHTML = insights.companyTrends.map(item => `
            <div class="trend-card">
                <h4>${item.trend}</h4>
                <p>${item.description}</p>
            </div>
        `).join('');

        const faqHTML = insights.faq.map(item => `
            <div class="faq-item">
                <p class="faq-question"><strong>Q:</strong> ${item.question}</p>
                <p class="faq-answer"><strong>A:</strong> ${item.answer}</p>
            </div>
        `).join('');

        const detailHTML = `
            <div class="insights-header">
                <h2>${companyName}</h2>
                <p>AI-Generated Placement Insights</p>
            </div>
            <div class="insights-body">
                <div class="insights-section">
                    <h3><i class="fas fa-chart-line"></i> Company Trends</h3>
                    <div class="trends-grid">${trendsHTML}</div>
                </div>

                <div class="insights-section">
                    <h3><i class="fas fa-briefcase"></i> Vacancy Analysis</h3>
                    <p>${insights.vacancyData}</p>
                </div>

                <div class="insights-section">
                    <h3><i class="fas fa-tasks"></i> Aptitude Test Overview</h3>
                    <p>${insights.aptitudeOverview}</p>
                </div>

                <div class="insights-section">
                    <h3><i class="fas fa-question-circle"></i> Frequently Asked Questions</h3>
                    <div class="faq-container">${faqHTML}</div>
                </div>
            </div>
        `;
        insightsContent.innerHTML = detailHTML;
    }
});