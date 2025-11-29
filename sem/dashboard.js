// Render Functions
function getTagClass(text) {
    const lower = text.toLowerCase();
    if (lower.includes('high') || lower.includes('90%') || lower.includes('88%') || lower.includes('85%')) return 'tag-high';
    if (lower.includes('medium') || lower.includes('82%') || lower.includes('78%') || lower.includes('75%')) return 'tag-medium';
    if (lower.includes('low')) return 'tag-low';
    if (lower.includes('long')) return 'tag-long';
    if (lower.includes('short')) return 'tag-short';
    return 'tag-default';
}

function createCard(item, type) {
    const div = document.createElement('div');
    div.className = 'card';

    let tagText = '';
    if (type === 'recurring') tagText = item.frequency;
    else if (type === 'likely') tagText = item.probability;
    else if (type === 'common') tagText = item.type;

    const tagClass = getTagClass(tagText);

    div.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <span class="tag ${tagClass}">${tagText}</span>
    `;
    return div;
}

function renderColumn(data, elementId, type) {
    const container = document.getElementById(elementId);
    container.innerHTML = ''; // Clear existing content
    data.forEach(item => {
        container.appendChild(createCard(item, type));
    });
}

async function loadDashboardData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Update Header Info
        const subjectInfo = document.querySelector('.subject-info');
        if (subjectInfo) {
            subjectInfo.textContent = `${data.subjectName} (${data.subjectCode})`;
        }

        // Render Columns
        renderColumn(data.recurringTopics, 'recurring-topics', 'recurring');
        renderColumn(data.likelyQuestions, 'likely-questions', 'likely');
        renderColumn(data.commonTypes, 'common-types', 'common');

    } catch (error) {
        console.error("Could not load dashboard data:", error);
        // Fallback or error message could go here
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check login status
    const username = localStorage.getItem('ime_username');
    if (!username) {
        window.location.href = 'index.html';
        return;
    }

    // Update username display
    const userDisplay = document.getElementById('userDisplay');
    if (userDisplay) {
        userDisplay.textContent = username;
    }

    // Load dashboard data
    loadDashboardData();
});
